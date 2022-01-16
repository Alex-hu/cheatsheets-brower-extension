<template>
  <q-dialog v-model="visible" width="900px">
    <q-card class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Edit Cheatsheet</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { CheatSheetData } from './types';

export default defineComponent({
  name: 'CheatsheetsFormDialog',
  props: {
    data: {
      type: Object as PropType<CheatSheetData>,
      required: true,
    },
  },
  setup() {
    const visible = ref(false);
    const open = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    return {
      visible,

      name: '',
      age: 10,
      accept: '',
      onSubmit() {
        console.log('1');
      },

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
  width: 100%
  max-width: 850px
</style>
