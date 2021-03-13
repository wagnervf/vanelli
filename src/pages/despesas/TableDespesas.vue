<template>
  <div class="q-ma-none bg-white">
    <div class="row full-width bg-red-4 text-white">
      <div class="col"></div>
      <div class="col-7 text-center q-pa-none">
        <q-btn
          icon-right="chevron_right"
          icon="chevron_left"
          flat
          color="white"
          @click="openFiltros()"
        >
          <span v-if="this.datasDoFiltroAtual.inicio">
            {{ this.datasDoFiltroAtual.inicio | filterDataFormatada }} -
            {{ this.datasDoFiltroAtual.fim | filterDataFormatada }}
          </span>
          <span v-else>
            <!-- mixins -->
            {{ this.mesCorrente() }}
          </span>
        </q-btn>
      </div>
      <div class="col text-right q-px-sm">
        <q-btn
          flat
          class="q-ma-none q-px-xs"
          icon="search"
          @click="buscar = !buscar"
        />
        <q-btn
          flat
          class="q-ma-none q-px-xs"
          icon="filter_alt"
          @click="openFiltros()"
        />
      </div>
    </div>

    <div class="full-width bg-white">
      <h6 class="q-ma-none q-pr-xs text-right text-red-4 text-subtitle1">
        Total - {{ totalDespesas() }}
      </h6>
    </div>

    <q-separator class="q-qy-none" />

    <div v-if="buscar" class="row q-pa-xs q-px-md">
      <q-input
        borderless
        dense
        v-model="filter"
        label="Buscar"
        filled
        v-focus
        class="input_buscar"
      />
    </div>

    <!-- Push para atualizar -->
    <q-pull-to-refresh @refresh="refresh" :scroll-target="$refs.scrollTarget">
      <q-table
        :data="itens"
        :columns="colunas"
        row-key="id"
        :filter="filter"
        separator="vertical"
        dense
        no-data-label="Nada encontrado no período!"
        class="q-ma-none"
        :loading="loading"
        binary-state-sort
        :pagination="pagination"
        hide-pagination
        grid
        hide-header
      >
        <template v-slot:item="props">
          <div class="bg-white col-12" @click="editDespesa(props.row)">
            <!-- <div class="row flex-inline">
              <q-card-section class="q-py-none">
                <p class="text-grey-7 text-subtitle2 q-ma-none">
                {{ props.row.data | filterDiaDaSemana}}, {{ props.row.data | filterDiaDaSemanaNumero }}
                </p>
              </q-card-section>
            </div> -->

            <!-- <q-item class="q-pr-sm q-py-xs">
              <q-item-section avatar class="q-px-none" style="min-width: 40px">
                <q-avatar
                  style="top: -15px;"
                  size="md"
                  color="red-10"
                  text-color="white"
                  >{{ props.row.user.name | filterPrimeiraLetra }}
                </q-avatar>
              </q-item-section>

              <q-item-section class="q-px-none">
                <q-item-label>{{ props.row.descricao }}</q-item-label>
                <q-item-label caption>{{ props.row.categoria }}</q-item-label>
                <q-item-label side class="text-right"
                  ><span class="text-subtitle2 text-red-10">
                    {{ props.row.valor | filterMoedaFormatada }}
                  </span></q-item-label
                >
              </q-item-section>
            </q-item> -->

            <q-item class="q-pa-sm q-my-xs">
              <q-item-section top avatar class="q-px-none">
                <q-avatar
                style="top:15px"
                size="md"
                color="red-5"
                text-color="white"
                >
                 {{ props.row.user.name | filterPrimeiraLetra }} 
              </q-avatar>               
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-7 text-caption q-ma-none">
                  <!-- {{ props.row.data | filterDiaDaSemana }}, -->
                  {{ props.row.data | filterDataFormatada }}
                </q-item-label> 
                <q-item-label class="text-subtitle1">{{ props.row.descricao }}</q-item-label>
                <q-item-label caption lines="3">{{props.row.categoria}}</q-item-label>
                
              </q-item-section>

              <q-item-section side bottom>
                <span class="text-subtitle2 text-red-10">
                  {{ props.row.valor | filterMoedaFormatada }}
                </span>
              </q-item-section>
            </q-item>
          </div>
        </template>
      </q-table>
    </q-pull-to-refresh>

    <q-page-sticky position="bottom">
      <div class="row justify-center bg-white full-width q-pa-sm">
        <q-btn round color="red-8" icon="add" @click="adddDespesa()" />
      </div>
    </q-page-sticky>

    <Filtros
      :dialogFiltro="dialogFiltro"
      v-on:data_inicio="setDateInicioFiltro($event)"
      v-on:data_fim="setDateTerminoFiltro($event)"
      @ordernarPor="setOrdernarPor($event)"
      @ordernarTipo="setOrdernarTipo($event)"
    />

    <Form :dados="this.editedItem" :dialogProp="this.dialogAdd" />

    <Visualizar :dados="this.viewDados" />

    <!-- <q-btn 
    no-caps      
    color="primary" 
    label="Compartilhar" @click="show()" /> -->
  </div>
</template>

<style lang="sass">


.q-table__bottom
  position: absolute;
  width: 100%;

div.q-table__middle.scroll > table > tbody > tr:nth-child(odd)
  background-color: #eee;

div.col-12:nth-child(1)


.q-table__grid-content >div.col-12:nth-last-child(1)
  margin-bottom: 70px
  position: relative
  border-bottom: 1px solid #eee

span.q-btn__wrapper.col.row.q-anchor--skip
  padding: 0px

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

div.q-table__top.relative-position.row.items-center > div:nth-child(1) > div > button:nth-child(5) > span.q-btn__wrapper.col.row.q-anchor--skip
  padding: 0px

div.q-table__top.relative-position.row.items-center > div:nth-child(1) > div > button:nth-child(4) > span.q-btn__wrapper.col.row.q-anchor--skip
  padding: 0px
  padding-right: 2px
.q-item__section--avatar
  min-height: 45px
  min-width: 45px
</style>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import inputDate from "../../components/input_date";
import Form from "./Form";
import Filtros from "./Filtros";
import Visualizar from "./View";
import { date } from "quasar";
import moment from "moment";
import mixinUtils from "../../mixins/mixin-utils";

import { BottomSheet } from "quasar";

export default {
  components: {
    inputDate,
    Form,
    Visualizar,
    Filtros,
  },
  mixins: [mixinUtils],

  data() {
    return {
      pagination: {
        sortBy: "",
        descending: true,
        page: 1,
        rowsPerPage: 0,
      },
      updateProxy: "",
      proxyDate: "",
      filter: "",
      colunas: [
        {
          name: "data",
          label: "Data",
          field: "data",
          sortable: true,
          align: "left",
          classes: "my-special-class",
          format: (val) => `${moment(val).format("DD/MM/YYYY")}`,
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
          format: (val) => `${this.formatarReal(val)}`,
        },
        {
          name: "acao",
          label: "Ações",
          sortable: false,
        },
      ],
      itens: [],
      searchText: "",
      dialogFiltro: false,
      buscar: false,

      dialogAdd: {},

      editedItem: {},
      editedIndex: -1,

      viewDados: {},
      loading: false,
      filtro: {
        inicio: "",
        fim: "",
      },

      tipoOrdenacao: true,
    };
  },

  beforeMount() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 700);
  },

  mounted() {
    setTimeout(() => {
      //this.setOrdernarPor("data")
      let filtro = {
        inicio: this.primeiroDiaMes(),
        fim: this.ultimoDiaMes(),
      };
      this.getDespesas();
      this.setInicioFimMesAtual(filtro);
    }, 500);
  },

  methods: {
    ...mapActions("store", ["getAllDespesas", "setInicioFimMesAtual"]),

    refresh(done) {
      setTimeout(() => {
        this.getDespesas();
        done();
      }, 1000);
    },

    getDespesas() {
      let filtro = {
        inicio: this.primeiroDiaMes(),
        fim: this.ultimoDiaMes(),
      };
      //  setTimeout(() => {
      this.getAllDespesas(filtro);
      // done()
      // }, 1000)
    },

    adddDespesa() {
      this.dialogAdd = Object.assign({}, true);
    },

    // viewDespesa(value) {
    //   //sempre cria um novo valor e atribui para viewDados que fica escutando (watch) no componente Visualizar
    //   this.viewDados = Object.assign({}, value);
    //   for (const key in value) {
    //     if (value.hasOwnProperty(key)) {
    //       const element = value[key];

    //       if (element === "user") {
    //         this.viewDados = {
    //           user: element,
    //           dados: value,
    //         };
    //       }
    //     }
    //   }
    // },

    editDespesa(item) {
      this.editedIndex = this.listaDeDespesas.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    totalDespesas() {
      let value = 0;

      if (typeof this.listaDeDespesas != "undefined") {
        this.listaDeDespesas.forEach((val) => {
          value = value + val.valor;
        });
      }
      //usando mixins
      return this.formatarReal(value);
    },

    customSort(rows, sortBy, tipoOrdenacao) {
      const data = [...rows];
      var descending = tipoOrdenacao;

      data.sort((a, b) => {
        const x = descending ? b : a;
        const y = descending ? a : b;

        if (sortBy === "data" || "descricao" || "categoria") {
          let xa = x[sortBy];
          let ya = y[sortBy];
          return xa > ya ? 1 : xa < ya ? -1 : 0;
        } else {
          // numeric sort
          return x[sortBy] - y[sortBy];
        }
      });

      return data;
    },

    openFiltros() {
      //Envia um objeto vazio apenas para o watch ouvir e atualizar lá no Filtros.vue
      this.dialogFiltro = Object.assign({}, true);
    },

    // setDateInicioFiltro(value) {
    //  this.filtro.inicio = value
    // },

    // setDateTerminoFiltro(value) {
    //   this.filtro.fim = value
    // },

    setOrdernarPor(value) {
      this.itens = this.customSort(this.itens, value, this.tipoOrdenacao);
    },

    setOrdernarTipo(value) {
      this.tipoOrdenacao = value;
    },

    // groupByItensData(value) {
    //   let info = []
    //   let xs = value
    //   let key = 'data'
    //   info = xs.reduce((rv, x) => {
    //     (rv[x[key]] = rv[x[key]] || []).push(x);
    //     return rv;
    //   }, {})
    //   return y
    // },

    show(grid) {
      this.$q
        .bottomSheet({
          message: "Bottom Sheet message",
          grid,
          actions: [
            {
              label: "Drive",
              img: "https://cdn.quasar.dev/img/logo_drive_128px.png",
              id: "drive",
            },
            {
              label: "Keep",
              img: "https://cdn.quasar.dev/img/logo_keep_128px.png",
              id: "keep",
            },
            {
              label: "Google Hangouts",
              img: "https://cdn.quasar.dev/img/logo_hangouts_128px.png",
              id: "calendar",
            },
            {
              label: "Calendar",
              img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
              id: "calendar",
            },
            {},
            {
              label: "Share",
              icon: "share",
              id: "share",
            },
            {
              label: "Upload",
              icon: "cloud_upload",
              color: "primary",
              id: "upload",
            },
            {},
            {
              label: "John",
              avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
              id: "john",
            },
          ],
        })
        .onOk((action) => {
          // console.log('Action chosen:', action.id)
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },

  computed: {
    ...mapGetters("store", ["allDespesas", "dataSetadaNoFiltro", "mesAtual"]),

    listaDeDespesas() {
      let dados_obj = this.allDespesas;
      let dados_array = [];

      dados_array.push(Object.values(dados_obj));
      let value = dados_array[0];

      //ao receber a listagem do Vuex, preenche e ordena os itens
      this.itens = this.customSort(dados_array[0], "data", this.tipoOrdenacao);

      return dados_array[0];
    },

    pagesNumber() {
      return Math.ceil(
        this.listaDeDespesas.length / this.pagination.rowsPerPage
      );
    },

    datasDoFiltroAtual() {
      return this.dataSetadaNoFiltro;
    },
  },

  watch: {
    // ordernarPor(value) {
    //   this.itens = this.customSort(this.itens, value);
    // },
  },
};
</script>
