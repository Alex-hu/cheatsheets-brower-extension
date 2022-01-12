import Clipboard from 'clipboard';
interface ClipboardOptions {
    /** Fixes IE by appending element to body */
    appendToBody: boolean;
    autoSetContainer: boolean;
  }

export const useClipboard = function (text: string, options?: ClipboardOptions) {
    const myOptions = options || { appendToBody: true };
    const appendToBody = myOptions.appendToBody;
    return new Promise(function (resolve, reject) {
      const fakeElement = document.createElement('button');
      const clipboard = new Clipboard(fakeElement, {
        text: () => text,
        action: () => 'copy',
        // container: typeof container === 'object' ? container : document.body,
        container: document.body,
      });
      clipboard.on('success', function (e) {
        clipboard.destroy();
        resolve(e);
      });
      clipboard.on('error', function (e) {
        clipboard.destroy();
        reject(e);
      });
      if (appendToBody) document.body.appendChild(fakeElement);
      fakeElement.click();
      if (appendToBody) document.body.removeChild(fakeElement);
    });
  };