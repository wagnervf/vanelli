<template>
  <div class="q-ma-xs" >
  <q-dialog
    v-model="dialogFiltro"
    persistent    
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
    <!-- <q-table
      :data="listaDeDespesas"
      :columns="this.colunas"
      row-key="id"
      :filter="filter"
      separator="vertical"
      :dense="$q.screen.lt.md"
      no-data-label="Nada encontrado no período!"
      class="q-mx-xs"
      :loading="loading"
      :sort-method="customSort"
      binary-state-sort
      :pagination="pagination"

    >
      <template v-slot:top>
        <div class="fit row q-py-sm text-indigo-10">
          <div class="col"><h6 class="q-ma-none">Janeiro</h6></div>

          <div class="col q-ma-sm">
            <q-input
              borderless
              dense
              v-model="filter"
              label="Buscar"
              v-if="buscar"
            />
          </div>

          <div class="col" style="display: flex;">
            <q-btn
              flat
              class="q-ma-none"
              icon="search"
              @click="buscar = !buscar"
            />
            <q-btn
              flat
              class="q-ma-none"
              icon="filter_list"
              @click="dialogFiltro = !dialogFiltro"
            />
          </div>
        </div>
      </template>

      <template v-slot:body-cell-acao="props">
        <q-td :props="props">
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="12px" flat dense round icon="more_vert">
              <q-menu transition-show="flip-right" transition-hide="flip-left">
                <q-list bordered separator>   

                  <q-item v-ripple class="q-px-sm" clickable @click="viewDespesa(props.row)">
                    <q-item-section avatar style="min-width: auto;">
                      <q-icon name="visibility" color="teal" />
                    </q-item-section>
                    <q-item-section class="q-pr-sm">Visualizar</q-item-section>
                  </q-item>              

                  <q-item v-ripple class="q-px-sm" clickable @click="editDespesa(props.row)">
                    <q-item-section avatar style="min-width: auto;">
                      <q-icon name="mode" color="primary" />
                    </q-item-section>
                    <q-item-section class="q-pr-sm">Editar</q-item-section>
                  </q-item>
                  
                  <q-item class="q-px-sm" clickable @click="deleteDespesa(props.row)">
                    <q-item-section avatar style="min-width: auto;">
                      <q-icon name="delete" color="red-4" />
                    </q-item-section>
                    <q-item-section class="q-pr-sm">Excluir</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
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

           
    </q-table> -->


   
      <q-table
        :data="listaDeDespesas"
        :columns="colunas"
        row-key="name" 
        :filter="filter"
        grid
        hide-header
      >
        <template v-slot:top>
          <div class="full-width">         
            
            <div class="row flex-inline q-pa-xs" >
              
              <span class="text-subtitle1 q-pa-xs">Despesas</span>
              <q-space />
              
              <q-btn
                flat
                class="q-ma-none"
                icon="search"   
                @click="buscar = !buscar"            
              />
              <q-btn
                flat
                class="q-ma-none"
                icon="filter_list"
                @click="dialogFiltro = !dialogFiltro"
              />
            </div>  
            
            <q-separator dark class="q-qy-none" />

            <div v-if="buscar" class="row q-pa-xs">
              <q-input
                borderless
                dense
                v-model="filter"
                label="Buscar"               
                bg-color="red-3"
                v-focus              
                class="input_buscar"
              />  
            </div>           

          </div>

          <div class="row flex-inline text-grey-8 full-width bg-white q-pa-sm">
            <q-space />

            <q-btn icon="event" flat label="Março" color="primary">
              <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="proxyDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>

            <q-space />

            <div class="q-pt-xs text-red-9">
              {{ totalDespesas() }}
            </div>
          </div>

         
         
          
        

         


        </template>

        <template v-slot:item="props">
          <div class="bg-white col-xs-12 col-sm-6 col-md-4" style="border:1px solid #ddd">
            <div class="row flex-inline bg-grey-1">
              <q-card-section class="q-pt-sm q-pb-none q-pl-xs">
                <!-- <p class="text-caption q-ma-none text-grey-6">Data </p>       -->
                <p class="text-grey-7 text-subtitle2 q-ma-none "> {{ props.row.data | filterDataFormatada }}</p> 
              </q-card-section> 

              <q-space></q-space>             

              <q-card-section class="text-right q-pa-xs">
                <q-btn size="14px" flat dense round icon="more_vert">
                  <q-menu transition-show="flip-right" transition-hide="flip-left">
                    <q-list bordered separator>   

                      <q-item v-ripple class="q-px-sm" clickable @click="viewDespesa(props.row)">
                        <q-item-section avatar style="min-width: auto;">
                          <q-icon name="visibility" color="teal" />
                        </q-item-section>
                        <q-item-section class="q-pr-sm">Visualizar</q-item-section>
                      </q-item>              

                      <q-item v-ripple class="q-px-sm" clickable @click="editDespesa(props.row)">
                        <q-item-section avatar style="min-width: auto;">
                          <q-icon name="mode" color="primary" />
                        </q-item-section>
                        <q-item-section class="q-pr-sm">Editar</q-item-section>
                      </q-item>
                      
                      <q-item class="q-px-sm" clickable @click="deleteDespesa(props.row)">
                        <q-item-section avatar style="min-width: auto;">
                          <q-icon name="delete" color="red-4" />
                        </q-item-section>
                        <q-item-section class="q-pr-sm">Excluir</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-card-section>
          
            </div>

            <q-separator />

            <div class="row flex-inline">
              <q-card-section class="text-left q-pa-sm">
                <p class="text-subtitle1 p-ma-xs text-weight-bold">{{props.row.descricao}}</p>                 
              </q-card-section>

                <q-space></q-space>

              <q-card-section class="text-right q-pa-sm">
                <p class="text-subtitle1 text-red-10">{{props.row.valor | filterMoedaFormatada}}</p>
                <q-badge  color="indigo">{{props.row.categoria}}</q-badge>
              </q-card-section>
            </div>

          </div>
        </template>

        <!-- <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" >
            <q-card >
              <q-card-section>
                <div class="text-grey-8 q-gutter-xs">

                  {{props.data}}

                  <q-separator />
                  
                </div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template> -->

      </q-table>
    
       
    


    <Form :dados="this.editedItem"  :dialogProp="this.dialogAdd" />

    <Visualizar :dados="this.viewDados"  />


    <div class="absolute-bottom text-center">
      <q-btn
        round
        color="red-4"
        icon="add"
        @click="adddDespesa()"
        class="q-ma-sm"
      />
    </div>

    

  </div>
</template>

<style lang="sass">
.q-table-control
  // width: 100%

div.q-table__middle.scroll > table > tbody > tr:nth-child(odd)
  background-color: #eee;

.my-special-class
  color: #26A69A;
  text-align: left;
  padding-left: 4px!important;
  padding-right: 1px!important;
.q-table__top
    background-color: #e57373;
    padding: 0px;
    border-radius: 5px 5px 0px 0px;
    color: #fff
.input_buscar
  display: contents
  padding: 5px

.q-table--grid .q-table__middle
  min-height: 0px;
  margin: 0px;
.q-table--grid .q-table__top
  padding: 0px
.q-table__grid-content
  margin-top: 10px

</style>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import inputDate from "../../components/input_date";
import Form from "./Form";
//import Edit from "./Edit";
import Visualizar from "./View";
import { date } from "quasar";
import moment from 'moment'
import mixinUtils from '../../mixins/mixin-utils'


export default {
  components: {
    inputDate,
    Form,
    Visualizar,
  },
   mixins: [mixinUtils],

  data() {
    return {
      pagination: {
        sortBy: "data",
        descending: true,
        page: 1,
        rowsPerPage: 7,
      },
      filter: "",   
      colunas: [
        {
          name: "data",
          label: "Data",
          field: "data",
          sortable: true,
          align: "left",
          classes: 'my-special-class',          
          format: val => `${ moment(val).format('DD/MM/YYYY')}`,
    
        },
        {
          sortable: true,
          align: "left",
          name: "descricao",
          label: "Descricao",
          field: "descricao",
        },
        {
          name: "categoria",
          align: "center",
          label: "Categoria",
          field: "categoria",
          sortable: true,
        },
        {
          name: "valor",
          label: "Valor",
          field: "valor",
          sortable: true,
          align: "center",          
          format: val => `${ this.formatarReal(val)}`,

          
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

      dialogAdd: {},

      editedItem: {},
      editedIndex: -1,

      viewDados: {},

      loading: false,
     
    };
  },

  beforeMount() {

    this.loading=true
    setTimeout(() => {
      this.loading = false,
      this.getDespesas()
    }, 1000);
     
  }, 


  methods: {
    ...mapActions('store', [
      'getAllDespesas', 
      'deleteDespesaUserCategoria']),

    getDespesas(){
      this.getAllDespesas()
    },
    
    adddDespesa(){
      this.dialogAdd = Object.assign({}, true);
    },

    viewDespesa(value) {
      //sempre cria um novo valor e atribui para viewDados que fica escutando (watch) no componente Visualizar
      this.viewDados = Object.assign({}, value);
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
            const element = value[key];
          
            if(element === 'user'){
              this.viewDados = {
                user: element,
                dados: value
              }
            }
        }
      }  
    },

    editDespesa(item) {
      this.editedIndex = this.listaDeDespesas.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    deleteDespesa(value) {
      this.deleteDespesaUserCategoria(value)
    },
 

    totalDespesas() {
      let value = 0;
      
      if(typeof this.listaDeDespesas != 'undefined'){
        this.listaDeDespesas.forEach((val) => {
          value = value + val.valor;
       });
      }
       //usando mixins
      return this.formatarReal(value)
    },


    customSort (rows, sortBy, descending) {
      const data = [ ...rows ]
      
      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b
        
          if (sortBy === 'data') {
           let xa = x[sortBy]
           let ya = y[sortBy]
            return xa > ya ? 1 : xa < ya ? -1 : 0
          }
          else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    }
  

  },

  computed: {
  //  ...mapState("store", ["allDespesas"]),
    ...mapGetters('store', ['allDespesas']),

    listaDeDespesas(){
      let dados_obj = this.allDespesas
      let dados_array = []
          
      dados_array.push(Object.values(dados_obj))
      return dados_array[0]
    },


    pagesNumber() {
      return Math.ceil(this.listaDeDespesas.length / this.pagination.rowsPerPage);
    },

  },
};
</script>
