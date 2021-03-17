<template>
  <div class="despesas">
    <div class="row full-width bg-red-4 text-white q-py-sm header-despesas">
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
      <div class="col text-right q-pr-sm">
        <q-btn
          flat
          class="q-ma-none q-px-none"
          icon="search"
          @click="buscar = !buscar"
        />

        <q-btn
          flat
          class="q-ma-none q-px-none"
          icon="filter_alt"
          @click="openFiltros()"
        />
      </div>
    </div>

    <!-- <div class="full-width bg-white">
      <h6 class="q-ma-none q-pr-xs text-right text-red-4 text-subtitle1">
        Total - {{ totalDespesas() }}
      </h6>
    </div> -->

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
        row-key="data"
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
            <q-list separator>
              <q-item class="q-pa-sm q-my-xs">
                <q-item-section top avatar class="q-px-none">
                  <q-avatar
                    style="top: 15px;"
                    size="md"
                    color="red-5"
                    text-color="white"
                  >
                    {{ props.row.user.nome | filterPrimeiraLetra }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-grey-7 text-caption q-ma-none">
                    <!-- {{ props.row.data | filterDiaDaSemana }}, -->
                    {{ props.row.data | filterDataFormatada }}
                  </q-item-label>
                  <q-item-label class="text-subtitle1">{{
                    props.row.descricao
                  }}</q-item-label>
                  <q-item-label caption lines="3">{{
                    props.row.categoria
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side bottom style="display: grid;">
                  <span class="text-subtitle2 text-deep-orange-14">
                    {{ props.row.valor | filterMoedaFormatada }}
                  </span>
                </q-item-section>
              </q-item>
              <q-separator color="grey-2" />
            </q-list>
          </div>
        </template>
         <template v-slot:bottom>
           <div class="full-width bg-red-4" 
            style="border-radius: 0px 0px 25px 25px;">
        <h6 class="q-ma-none q-pr-md text-right text-white text-subtitle1">
          Total  {{ totalDespesas() }}
        </h6>
      </div>
         </template>
      </q-table>
      
    </q-pull-to-refresh>

    <q-page-sticky position="bottom">
      <div class="row justify-center full-width q-pa-sm">
        <q-btn round color="red-8" icon="add" @click="adddDespesa()" />
      </div>
    </q-page-sticky>

    <Filtros
      :dialogFiltro="dialogFiltro"
      @ordernarPor="setOrdernarPor($event)"
      @buscarFiltrado="buscarFiltrado($event)"
    />

    <Form :dados="this.editedItem" :dialogProp="this.dialogAdd" />

    <Visualizar :dados="this.viewDados" />
  </div>
</template>

<style lang="stylus">
.q-btn__wrapper{
    padding: 4px
}
.q-table__bottom{
    //top: -50px!important;
    padding: 0px;
    position: relative!important;
  //  background: #d32f2f;
    color: white;
    }
</style>

<style lang="sass" scoped>
.despesas
  // margin: 10px;
  padding-top: 0px;
  background: white;
  border-radius: 25px;

.header-despesas
  border-radius: 25px 25px 0px 0px;

.q-table__bottom
  position: absolute;
  width: 100%;

div.q-table__middle.scroll > table > tbody > tr:nth-child(odd)
  background-color: #eee;

div.col-12:nth-child(1)
.q-table__grid-content >div.col-12:nth-last-child(1)
  margin-bottom: 50px
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
.button.q-ma-none:nth-child(1) > span:nth-child(1)
.button.q-ma-none:nth-child(1) > span:nth-child(2)
  padding: 4px!important
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
import { firebaseDb } from "src/boot/firebase.js";

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
        campo: "",
        tipo: "",
      },

      tipoOrdenacao: true,
    };
  },

  // created () {
  //   this.$q.addressbarColor.set('#e57373')
  // },

  beforeMount() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 700);
  },

  mounted() {
    this.getDespesas();
  },

  methods: {
    ...mapActions("store", ["getAllDespesas", "setInicioFimMesAtual"]),

    refresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },

    getDespesas() {
      this.filtro.inicio = Number(this.primeiroDiaMes());
      this.filtro.fim = Number(this.ultimoDiaMes());
      this.filtro.campo = "data";
      this.filtro.tipo = "asc";

      firebaseDb
        .collection("despesas_categoria_user")
        .orderBy(this.filtro.campo, this.filtro.tipo)
        .startAt(this.filtro.inicio)
        .endAt(this.filtro.fim)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let itenAlterado = change.doc.data();
            itenAlterado.id = change.doc.id;

            if (change.type === "added") {
              this.itens.unshift(itenAlterado);
            }
            if (change.type === "modified") {
              let index = this.itens.findIndex(
                (item) => item.id === itenAlterado.id
              );
              Object.assign(this.itens[index], itenAlterado);
            }
            if (change.type === "removed") {
              let index = this.itens.findIndex(
                (item) => item.id === itenAlterado.id
              );
              this.itens.splice(index, 1);
            }
          });
        });
    },

    adddDespesa() {
      this.dialogAdd = Object.assign({}, true);
    },

    editDespesa(item) {
      this.editedIndex = this.itens.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    totalDespesas() {
      let value = 0;

      if (typeof this.itens != "undefined") {
        this.itens.forEach((val) => {
          value = value + val.valor;
        });
      }
      //usando mixins
      return this.formatarReal(value);
    },

    openFiltros() {
      //Envia um objeto vazio apenas para o watch ouvir e atualizar lá no Filtros.vue
      this.dialogFiltro = Object.assign({}, true);
    },

    setDateInicioFiltro(value) {
      this.filtro.inicio = value;
    },

    setDateTerminoFiltro(value) {
      this.filtro.fim = value;
    },

    buscarFiltrado(filtro) {
      console.log(filtro);
      this.itens = [];
      firebaseDb
        .collection("despesas_categoria_user")
        .where("data", ">=", filtro.inicio)
        .where("data", "<=", filtro.fim)
        //.orderBy(filtro.campo, filtro.tipo)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            this.itens.unshift(doc.data());
            this.itens = this.customSort(this.itens, filtro.campo, filtro.tipo);
          });
        });
    },

    setOrdernarPor(value) {
      let lista =  this.itens
      this.itens = this.customSort(lista, value.campo, value.tipo)
    },


    customSort(rows, sortBy, tipoOrdenacao) {
      console.log(rows, sortBy, tipoOrdenacao)
      //const data = [...rows];
      const data = rows;
      var descending = tipoOrdenacao;

      data.sort((a, b) => {
        const x = descending ? b : a;
        const y = descending ? a : b;

      if (sortBy === "descricao" || "categoria") {
          let xa = x[sortBy];
          let ya = y[sortBy];
        return xa > ya ? 1 : xa < ya ? -1 : 0;
      } 

      if (sortBy === "data" || "valor")  {
        return x[sortBy] - y[sortBy];
       }
      });
      return data;
    }
  },

  computed: {
    ...mapGetters("store", ["allDespesas", "dataSetadaNoFiltro", "mesAtual"]),
    pagesNumber() {
      return Math.ceil(this.itens.length / this.pagination.rowsPerPage);
    },

    datasDoFiltroAtual() {
      return this.dataSetadaNoFiltro;
    },
  },

  watch: {
  },
};
</script>
