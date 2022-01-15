<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  setup() {
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'center',
        field: 'name',
        sortable: true,
      },
      {
        name: 'label',
        align: 'center',
        label: 'label',
        field: 'label',
        sortable: true,
      },
      { name: 'link', label: 'Link', field: 'link', sortable: true },
      { name: 'content', label: 'content', field: 'content' },
      { name: 'order', label: 'order', field: 'order' },
      { name: 'type', label: 'type', field: 'type' },
      { name: 'createTime', label: 'createTime', field: 'createTime' },
      { name: 'modifyTime', label: 'modifyTime', field: 'modifyTime' },
      { name: 'url', label: 'url Pattern', field: 'url' },
    ];
    return {
      columns,
      rows: [],
    };
  },
});
</script>
