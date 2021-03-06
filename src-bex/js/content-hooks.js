// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

// export default function attachContentHooks (/* bridge */) {
  // Hook into the bridge to listen for events sent from the client BEX.
  /*
  bridge.on('some.event', event => {
    if (event.data.yourProp) {
      // Access a DOM element from here.
      // Document in this instance is the underlying website the contentScript runs on
      const el = document.getElementById('some-id')
      if (el) {
        el.value = 'Quasar Rocks!'
      }
    }
  })
  */
// }
// const
//   iFrame = document.createElement('iframe'),
//   defaultFrameHeight = '62px'

// /**
//  * Set the height of our iFrame housing our BEX
//  * @param height
//  */
// const setIFrameHeight = height => {
//   iFrame.height = height
// }

// /**
//  * Reset the iFrame to its default height e.g The height of the top bar.
//  */
// const resetIFrameHeight = () => {
//   setIFrameHeight(defaultFrameHeight)
// }

// /**
//  * Content hooks which listen for messages from the BEX in the iFrame
//  * @param bridge
//  */
// export default function attachContentHooks (bridge) {
//   /**
//    * When the drawer is toggled set the iFrame height to take the whole page.
//    * Reset when the drawer is closed.
//    */
//   bridge.on('wb.drawer.toggle', event => {
//     console.log("test")
//     const payload = event.data
//     if (payload.open) {
//       setIFrameHeight('100%')
//     } else {
//       resetIFrameHeight()
//     }
//     bridge.send(event.eventResponseKey)
//   })
// }

// /**
//  * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
//  * @type {string}
//  */
// iFrame.id = 'bex-app-iframe'
// iFrame.width = '100%'
// resetIFrameHeight()

// // Assign some styling so it looks seamless
// Object.assign(iFrame.style, {
//   position: 'fixed',
//   top: '0',
//   right: '0',
//   bottom: '0',
//   left: '0',
//   border: '0',
//   zIndex: '9999999', // Make sure it's on top
//   overflow: 'visible'
// })

// ;(function () {
//   // When the page loads, insert our browser extension app.
//   iFrame.src = chrome.runtime.getURL(`www/index.html`)
//   document.body.prepend(iFrame)
// })()

