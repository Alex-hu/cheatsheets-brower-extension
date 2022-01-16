import { useQuasar } from 'quasar';
import { StorageDrawerData, ToggleStatus } from 'src/pages/types';

const $q = useQuasar();
/**
 *
 * @returns boolean: is opened.
 */
export async function getToggleStatus() {
  const response = (await $q.bex.send('storage.get', {
    key: 'wb.drawer.toggle',
  })) as StorageDrawerData<ToggleStatus>;

  const res = response.data;
  if (!res) {
    throw new Error('error');
  }
  return res.open;
}

/**
 * set the toggle status.
 * @param openStatus the toggle status.
 */
export async function setToggleStatus(openStatus: boolean) {
  const payload = {
    key: 'wb.drawer.toggle',
    data: {
      open: openStatus,
    },
  };
  await $q.bex.send('storage.set', payload);
}
