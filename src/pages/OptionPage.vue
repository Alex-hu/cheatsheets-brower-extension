<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerToggled"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      @update:model-value="drawerToggled"
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import EssentialLink from 'components/EssentialLink.vue';

interface StorageDrawerData {
  key: string;
  data: ToggleStatus;
}

interface ToggleStatus {
  open: boolean;
}

export default defineComponent({
  name: 'OptionPage',

  components: {
    EssentialLink,
  },
  setup() {
    const linksList = [
      {
        title: 'Docs',
        caption: 'quasar.dev',
        icon: 'school',
        link: 'https://quasar.dev',
      },
    ];

    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    $q.bex
      .send('storage.get', { key: 'wb.drawer.toggle' })
      .then((res: StorageDrawerData) => {
        debugger;
        console.log(res);
        leftDrawerOpen.value = res.data.open;
      })
      .catch(() => {
        console.log('test');
      });

    const drawerToggled = () => {
      const payload = {
        key: 'wb.drawer.toggle',
        data: {
          open: !leftDrawerOpen.value,
        },
      };
      $q.bex
        .send('storage.set', payload)
        .then((res: StorageDrawerData) => {
          debugger;
          // Only set this once the promise has resolved so we can see the entire slide animation.
          leftDrawerOpen.value = res.data.open;
        })
        .catch(() => {
          console.log('test');
        });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      drawerToggled,
    };
  },
});
</script>
