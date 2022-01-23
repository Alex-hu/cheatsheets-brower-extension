<template>
  <q-dialog v-model="visible" width="900px" :maximized="true">
    <q-card class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ dialogType == 'EDIT' ? 'Edit' : 'Add' }}</div>
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
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            outlined
            v-model="formModel.label"
            label="Title"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            outlined
            v-model="formModel.link"
            label="url"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            outlined
            v-model="formModel.content"
            type="textarea"
            label="content"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { CHEATSHEET_LIST_KEY } from 'src/service/storageKey';
import { defineComponent, ref, reactive } from 'vue';
import { CheatSheetData, StorageDrawerData } from './types';

export default defineComponent({
  name: 'CheatsheetsFormDialog',
  props: {
    onSuccess: {
      type: Function,
      required: false,
    },
  },
  setup(props) {
    const visible = ref(false);
    const dialogType = ref('ADD');
    let formModel = reactive<CheatSheetData>({
      name: '',
      label: '',
      link: '',
      content: '',
      order: 1,
      type: '',
      createTime: new Date(),
      modifyTime: new Date(),
      url: '',
    });
    const open = (one: CheatSheetData) => {
      console.log('dialog:', one);
      if (one) {
        dialogType.value = 'EDIT';
        formModel.name = one.name;
        formModel.label = one.label;
        formModel.link = one.link;
        formModel.content = one.content;
      } else {
        formModel.name = '';
        formModel.label = '';
        formModel.link = '';
        formModel.content = '';
        formModel.createTime = new Date();
        formModel.modifyTime = new Date();
        dialogType.value = 'ADD';
      }
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    console.log('dialog data:', formModel);

    const $q = useQuasar();

    const onSubmit = () => {
      // fetch all data
      $q.bex
        .send('storage.get', { key: CHEATSHEET_LIST_KEY })
        .then((res: StorageDrawerData<CheatSheetData[]>) => {
          let list = res.data as CheatSheetData[];
          if (dialogType.value === 'EDIT') {
            // find the edit one, then update the data.
            list.forEach((item) => {
              if (item.name === formModel.name) {
                item.link = formModel.link;
                item.content = formModel.content;
                item.label = formModel.label;
                item.modifyTime = new Date();
                return;
              }
            });
          } else if (dialogType.value === 'ADD') {
            if (!list) {
              list = [];
            }
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
              props.onSuccess?.apply(res.data);
              hide();
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      visible,
      dialogType,
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
