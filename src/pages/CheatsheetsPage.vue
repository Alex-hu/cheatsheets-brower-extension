<template>
  <div class="q-pa-md">
    <q-table title="Cheatsheet" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top-right="props">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >{{ mode === 'grid' ? 'List' : 'Grid' }}
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Add"
          no-caps
          @click="add"
        />
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn dense color="primary" icon="edit" @click="edit(props.row)" />
            <q-btn dense color="red" icon="delete" @click="del" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
  <CheatsheetsFormDialog ref="dialogComp" :data="data"></CheatsheetsFormDialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { CheatSheetData, StorageDrawerData } from './types';
import CheatsheetsFormDialog from './CheatsheetFormDialog.vue';
import { useQuasar } from 'quasar';
import { CHEATSHEET_LIST_KEY } from 'src/service/storageKey';

export default defineComponent({
  name: 'CheatsheetsPage',
  components: {
    CheatsheetsFormDialog,
  },
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
      { name: 'order', label: 'order', field: 'order', sortable: true },
      { name: 'type', label: 'type', field: 'type' },
      {
        name: 'createTime',
        label: 'createTime',
        field: 'createTime',
        sortable: true,
      },
      {
        name: 'modifyTime',
        label: 'modifyTime',
        field: 'modifyTime',
        sortable: true,
      },
      { name: 'url', label: 'url Pattern', field: 'url' },
      {
        name: 'action',
        align: 'left',
        label: 'Action',
        field: 'action',
        sortable: true,
      },
    ];
    let data = reactive<CheatSheetData>({
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
    const dialogComp = ref();

    const add = () => {
      dialogComp.value.open();
    };
    const edit = (row: CheatSheetData) => {
      console.log(row);
      data = row;
      dialogComp.value.open();
    };
    const del = () => {
      console.log('test');
    };

    let rows = ref<CheatSheetData[]>([]);
    const $q = useQuasar();
    $q.bex
      .send('storage.get', { key: CHEATSHEET_LIST_KEY })
      .then((res: StorageDrawerData<CheatSheetData[]>) => {
        console.log(res);
        console.table(res.data);
        rows.value = res.data as CheatSheetData[];
      });

    return {
      filter: '',
      separator: '',
      mode: 'list',
      columns,
      rows,
      add,
      edit,
      del,
      dialogComp,
      data,
    };
  },
});
</script>
