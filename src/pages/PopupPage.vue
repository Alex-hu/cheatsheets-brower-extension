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
          <q-tab-panel
            v-for="item in list"
            v-bind:key="item.name"
            :name="item.name"
          >
            <div class="text-h6" @click="copy(item.content)">
              {{ item.label }}
            </div>
            <a v-if="item.link" :href="item.link" target="_blank">{{
              item.link
            }}</a>
            <pre>{{ item.content }}</pre>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useClipboard } from './../hooks/extend/useClipboard';

export default defineComponent({
  name: 'PopupPage',
  setup() {
    const list = reactive([
      {
        name: 'arthas',
        label: 'Arthas',
        link: 'https://arthas.aliyun.com/doc/watch.html',
        content: `wget https://alibaba.github.io/arthas/arthas-boot.jar
java -jar arthas-boot.jar`,
      },
      {
        name: 'lancet',
        label: '柳叶刀',
        link: 'http://lancet.corp.elong.com/',
        content: `wget 'http://lancet.corp.elong.com/lancet.sh'
chmod 777 lancet.sh
./lancet.sh`,
      },
      {
        name: 'nosync',
        label: 'NoCloud',
        link: 'https://apple.stackexchange.com/questions/254313/how-to-exclude-a-sub-folder-from-icloud-drive-in-macos-sierra',
        content: `mv fileorfolder fileorfolder.nosync
ln -s fileorfolder.nosync fileorfolder`,
      },
    ]);
    const tab = ref(list[0].name);
    const copy = async (message: string) => {
      try {
        await useClipboard(message);
      } catch (error) {
        alert('copy error!');
      }
    };
    return {
      tab,
      list,
      copy,
    };
  },
});
</script>
