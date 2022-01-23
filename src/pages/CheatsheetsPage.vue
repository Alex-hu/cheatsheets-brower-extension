<template>
  <div class="q-pa-md">
    <q-table
      title="Cheatsheet"
      :rows="listData"
      :columns="columns"
      row-key="name"
      @row-dblclick="dblclick"
    >
      <template v-slot:top-right="props">
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
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
        <q-btn color="primary" icon-right="archive" label="Add" no-caps @click="add" />
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn dense color="primary" icon="edit" @click="edit(props.row)" />
            <q-btn dense color="red" icon="delete" @click="showDelConfirm(props.row)" />
          </div>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="delItem" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <CheatsheetsFormDialog ref="dialogComp" :onSuccess="refresh"></CheatsheetsFormDialog>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
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
      {
        name: 'link',
        align: 'center',
        label: 'Link',
        style:
          'max-width: 250px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis',
        field: 'link',
        sortable: true,
      },
      {
        name: 'content',
        align: 'center',
        label: 'content',
        style:
          'max-width: 400px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis',
        field: 'content',
      },
      { name: 'order', align: 'center', label: 'order', field: 'order', sortable: true },
      { name: 'type', align: 'center', label: 'type', field: 'type' },
      {
        name: 'createTime',
        align: 'center',
        label: 'createTime',
        field: 'createTime',
        sortable: true,
      },
      {
        name: 'modifyTime',
        align: 'center',
        label: 'modifyTime',
        field: 'modifyTime',
        sortable: true,
      },
      { name: 'url', align: 'center', label: 'url Pattern', field: 'url' },
      {
        name: 'action',
        align: 'center',
        label: 'Action',
        field: 'action',
        sortable: true,
      },
    ];

    const dialogComp = ref();

    const add = () => {
      dialogComp.value.open();
    };
    const edit = (row: CheatSheetData) => {
      console.log('row:', row);
      dialogComp.value.open(row);
    };

    // confirm dialog open status.
    const showConfirm = ref(false);
    const seleted = ref<CheatSheetData>();
    const showDelConfirm = (row: CheatSheetData) => {
      showConfirm.value = true;
      seleted.value = row;
    };

    let rows = ref<CheatSheetData[]>([]);
    const $q = useQuasar();
    const refresh = () => {
      $q.bex
        .send('storage.get', { key: CHEATSHEET_LIST_KEY })
        .then((res: StorageDrawerData<CheatSheetData[]>) => {
          rows.value = res.data as CheatSheetData[];
        });
    };
    refresh();

    const delItem = () => {
      rows.value.forEach((item, index) => {
        if (item.name === seleted.value?.name) {
          rows.value.splice(index, 1);
          return;
        }
      });

      const payload = {
        key: CHEATSHEET_LIST_KEY,
        data: rows.value,
      };
      $q.bex
        .send('storage.set', payload)
        .then(() => {
          refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const dblclick = (_: Event, row: CheatSheetData) => {
      edit(row);
    };

    const filter = ref('');
    const listData = computed(() => {
      if (filter.value) {
        return rows.value.filter(
          (item) =>
            item.label.indexOf(filter.value) > -1 ||
            (item.link && item.link.indexOf(filter.value) > -1) ||
            item.content.indexOf(filter.value) > -1
        );
      } else {
        return rows.value;
      }
    });

    return {
      filter,
      separator: '',
      mode: 'list',
      columns,
      rows,
      add,
      edit,
      showDelConfirm,
      dialogComp,
      refresh,
      showConfirm,
      delItem,
      dblclick,
      listData,
    };
  },
});
</script>
