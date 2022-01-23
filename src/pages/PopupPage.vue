<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            v-for="item in list"
            v-bind:key="item.name"
            :name="item.name"
            :label="item.label"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="item in list" v-bind:key="item.name" :name="item.name">
            <div class="text-h6" @click="copy(item.content)">
              {{ item.label }}
            </div>
            <a v-if="item.link" :href="item.link" target="_blank">{{ item.link }}</a>
            <pre>{{ item.content }}</pre>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
import { useQuasar } from 'quasar';
import { CHEATSHEET_LIST_KEY } from 'src/service/storageKey';
import { defineComponent, ref } from 'vue';
import { useClipboard } from './../hooks/extend/useClipboard';
import { StorageDrawerData, CheatSheetData } from './types';

export default defineComponent({
  name: 'PopupPage',
  setup() {
    let list = ref<CheatSheetData[]>([]);
    const tab = ref('');
    const copy = async (message: string) => {
      try {
        await useClipboard(message);
      } catch (error) {
        alert('copy error!');
      }
    };

    const $q = useQuasar();
    const refresh = () => {
      $q.bex
        .send('storage.get', { key: CHEATSHEET_LIST_KEY })
        .then((res: StorageDrawerData<CheatSheetData[]>) => {
          list.value = res.data as CheatSheetData[];
          tab.value = list.value[0].name;
        });
    };
    refresh();
    return {
      tab,
      list,
      copy,
    };
  },
});
</script>
