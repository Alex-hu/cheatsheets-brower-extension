<template>
  <q-dialog v-model="visible" width="900px" :maximized="true">
    <q-card class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ data.name ? 'Edit' : 'Add' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="q-pa-md" style="max-width: 480px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            outlined
            v-model="formModel.name"
            label="Key Name"
            hint="Tab the unique Key Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="formModel.label"
            label="Title"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="formModel.link"
            label="url"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-editor v-model="formModel.content" min-height="5rem" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { CHEATSHEET_LIST_KEY } from 'src/service/storageKey';
import { defineComponent, ref, PropType, reactive } from 'vue';
import { CheatSheetData, StorageDrawerData } from './types';

export default defineComponent({
  name: 'CheatsheetsFormDialog',
  props: {
    data: {
      type: Object as PropType<CheatSheetData>,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(false);
    const open = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    const formModel = reactive(props.data);
    console.log('dialog data:', formModel);

    const $q = useQuasar();

    const onSubmit = () => {
      console.log('1');
      $q.bex
        .send('storage.get', { key: CHEATSHEET_LIST_KEY })
        .then((res: StorageDrawerData<CheatSheetData[]>) => {
          let list = res.data as CheatSheetData[];
          if (list) {
            console.log('not empty');
            list.forEach((item) => {
              if (item.name === formModel.name) {
                item.link = formModel.link;
                item.content = formModel.content;
                item.label = formModel.label;
                item.modifyTime = new Date();
                return;
              }
            });
          } else {
            list = [];
            list.push(formModel);
          }

          const payload = {
            key: CHEATSHEET_LIST_KEY,
            data: list,
          };
          $q.bex
            .send('storage.set', payload)
            .then((res: StorageDrawerData<CheatSheetData[]>) => {
              console.table(res.data);
              hide();
            })
            .catch(() => {
              console.log('test');
            });
        })
        .catch(() => {
          console.log('test');
        });
    };

    return {
      visible,

      name: '',
      age: 10,
      accept: '',
      formModel,
      onSubmit,

      onReset() {
        console.log('1');
      },
      open,
      hide,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 500px
</style>
