<template>
  <div class="q-mt-sm">
   
    <!-- <q-dialog
      v-model="dialogEdit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >     
      <q-card>
        {{this.editedItem}} -->

        <FormComponent :dados="this.editedItem" :dialog="dialogEdit" />
<!-- 
      </q-card>
    </q-dialog> -->
    


<!-- --------------- -->
    <q-dialog
      v-model="dialogFiltro"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-card-section class="bg-red-4">
          <div class="text-center text-h5 text-white">
            <q-btn
              flat
              icon="arrow_back_ios"
              @click="dialogFiltro = !dialogFiltro"
              class="absolute-left"
            />
            <span class="text-h6">Filtros</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-gutter-md q-pa-md">
            <inputDate label="Inicio" @update="setDateInicio($event)" />

            <inputDate label="Fim" @update="setDateTermino($event)" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Get itens do Store -->
    <q-table
      :data="this.listaDespesas"
      :columns="this.colunas"
      row-key="id"
      sortBy="data"
      :filter="filter"
      :pagination="initialPagination"
      separator="vertical"
      dense
      no-data-label="Nada encontrado no período!"
    >
      <template v-slot:top>
        <div class="fit row q-py-sm text-indigo-10">
          <div class="col"><h6 class="q-ma-none">Janeiro</h6></div>
            
          <div class="col q-ma-sm">
            <q-input borderless dense v-model="filter" label="Buscar"  v-if="buscar"/>
          </div>

          <div class="col" style="display: flex">
            <q-btn flat class="q-ma-none" icon="search" @click="buscar = !buscar" />
            <q-btn flat class="q-ma-none" icon="filter_list" @click="dialogFiltro = !dialogFiltro"/>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-acao="props">
        <q-td :props="props">          
          <div class="my-table-details">
            
            <q-btn round size="sm" color="primary" icon="mode" @click="editDespesa(props.row)" />
            <q-btn round size="sm" color="red-10" icon="delete" @click="deleteDespesa(props.row)"/>
          </div>
        </q-td>
      </template>

      <template v-slot:bottom-row>
        <q-tr class="text-right">
          <q-td colspan="100%" class="q-gutter-xl">
            <span> Total</span>
            <span class="text-red-9"> R$ {{ totalDespesas() }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
.q-table-control
  // width: 100%

div.q-table__middle.scroll > table > tbody > tr:nth-child(odd)
  background-color: #eee;
</style>

<script>
import { mapState } from "vuex";
import inputDate from "../../components/input_date";
import FormComponent from './FormComponent'

export default {
  components: {
    inputDate,
    FormComponent
  },

  data() {
    return {      
      date: "",
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      filter: "",   
      colunas: [
        {
          name: "desp_data",
          label: "Data",
          field: "desp_data",
          sortable: true,
          align: "left",
        },
        {        
          sortable: true,
          align: "left",
          name: "desp_descricao",
          label: "Descricao",
          field: "desp_descricao",
        },
        {
          name: "cat_descricao",
          align: "center",
          label: "Categoria",
          field: "cat_descricao",
          sortable: true,
        },
        {
          name: "desp_valor",
          label: "Valor",
          field: "desp_valor",
          sortable: true,
        },
        {
          name: "acao",
          label: "Ações",
          
          sortable: false,
        },


      ],
      searchText: "",
      dialogFiltro: false,
      buscar: false,

      editedItem: {},
      editedIndex: -1,
      dialogEdit: false,

      data: '',
      modalidade: '',
      categoria: '',
      valor: '',
      observacao: '',
    };
  },

  mounted() {},

  methods: {
    totalDespesas() {
      let value = 0;
      this.listaDespesas.forEach((val) => {
        value = value + val.desp_valor;
      });

      return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
    },

    setDateInicio(value) {
      console.log(value);
    },
    setDateTermino(value) {
      console.log(value);
    },

  editDespesa(item){
      this.editedIndex = this.listaDespesas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;    
  
    },

    deleteDespesa(value){
      console.log(value)
    }

  },

  computed: {
    ...mapState("store", ["listaDespesas"]),

    pagesNumber() {
      return Math.ceil(this.listaDespesas.length / this.pagination.rowsPerPage);
    },
  },
};
</script>
