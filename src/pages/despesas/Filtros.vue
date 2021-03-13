<template>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    full-width
  >
    <q-card class="bg-white">
      <q-card-section class="bg-red-4">
        <div class="text-center text-h5 text-white">
          <q-btn
            flat
            icon="arrow_back_ios"
            @click="dialog = !dialog"
            class="absolute-left q-pl-md"
          />
          <span class="text-h6">Filtros</span>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md q-mx-xs">
        <q-list>
          <q-item tag="label" v-ripple class="q-px-none">
            <q-item-section>
              <q-item-label class="text-subtitle2">Ordernação</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="red" v-model="ordenarToggle" val="battery" />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-ma-xs" v-if="ordenarToggle">
          <q-select
            dense
            v-model="ordernarPor"
            :options="optionsOrdernar"
            class="ordenarDespesas"
            emit-value
            map-options
            label-color="primary"
            hide-hint
            use-chips
          >
            <template v-slot:prepend>
              <q-icon name="format_list_bulleted" />
            </template>
            <template v-slot:selected-item="scope">
              <q-chip
                outline
                color="red"
                text-color="white"
              >
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
        <div class="q-ma-xs" v-if="ordenarToggle">
          <q-select
            dense
            v-model="ordernarTipo"
            :options="optionsTipos"
            class="ordenarDespesas"
            emit-value
            map-options
            label-color="primary"
            hide-hint
            use-chips
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="swap_vert" />
            </template>

            <template v-slot:selected-item="scope">
              <q-chip
                outline
                color="red"
                text-color="white"
              >
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div> 
        
        </q-card-section
      ><!-- Ordenação -->

      <q-separator />

      <q-card-section class="q-gutter-md q-mx-xs">
        <q-list>
          <q-item tag="label" v-ripple class="q-px-none">
            <q-item-section>
              <q-item-label class="text-subtitle2"
                >Filtrar por período</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="red" v-model="filtrarPorPeriodo" val="battery" />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-ma-xs" v-if="filtrarPorPeriodo">
          <q-datetime-picker
            label="Data Inicial"
            v-model="inicio"
            :display-value="inicio | filterDataFormatada"
            clearable
            today-btn
            color="negative"
            class="date_color"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer"></q-icon>
            </template>

            
          </q-datetime-picker>
        </div>

        <div class="q-ma-xs" v-if="filtrarPorPeriodo">
          <q-datetime-picker
            label="Data Final"
            v-model="fim"
            :display-value="fim | filterDataFormatada"
            clearable
            today-btn
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer"></q-icon>
            </template>
          </q-datetime-picker>
        </div> </q-card-section
      ><!-- Filtrar por Data -->

      <q-card-actions class="row full-width q-pa-md">
        <div class="row fit justify-end text-right">
          <q-btn
            label="Limpar Filtros"
            @click="cancelar()"
            color="red-10"
            icon-right="restart_alt"
            flat
          />
        </div>

        <div class="row fit justify-center q-pa-sm">
          <q-btn @click="submitFiltro()" color="teal" icon="check" round />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { date } from "quasar";
import moment from "moment";
import mixinUtils from "../../mixins/mixin-utils";

export default {
  props: {
    dialogFiltro: "",
  },
  components: {},
  mixins: [mixinUtils],

  data() {
    return {
      date: "",
      dialog: false,
      filter: "",
      ordernarPor: "data",
      optionsOrdernar: [
        {
          label: "Data",
          value: "data",
        },
        {
          label: "Descrição",
          value: "descricao",
        },
        {
          label: "Categoria",
          value: "categoria",
        },
        {
          label: "Valor",
          value: "valor",
        },
      ],
      ordernarTipo: true,
      optionsTipos: [
        {
          label: "Crescente",
          value: false,
        },
        {
          label: "Decrescente",
          value: true,
        },
      ],
      inicio: "",
      fim: "",
      end: "",

      filtro: {
        inicio: "",
        fim: "",
      },
      filtrarPorPeriodo: false,
      ordenarToggle: true,
      limpouFiltro: false,
    };
  },

  mounted() {
    setTimeout(() => {
      // this.ordernarPor = "data";
      // this.setDateInicioFiltro(this.primeiroDiaMes())
      //this.setDateTerminoFiltro(this.ultimoDiaMes())
      //  let filtro = {
      //   inicio: this.primeiroDiaMes(),
      //   fim: this.ultimoDiaMes()
      //  // dataFim: "2021-04-31",
      //   //dataInicio: "2021-04-01"
      // }
      // this.getDespesas(filtros)
    }, 500);
  },

  methods: {
    ...mapActions("store", ["getAllDespesas", "setDataFiltrada"]),

    cancelar() {
      this.ordernarPor = "data";
      this.ordernarTipo = true;
      this.inicio = this.inicioMesStore;
      this.fim = this.fimMesStore;
      this.filtrarPorPeriodo = false;
      this.limpouFiltro = true;
      this.setDataFiltrada(this.filtro = {})
    },

    submitFiltro() {
      this.dialog = false;
      //console.log(this.filtro)

      //Store Actions
      if (this.filtrarPorPeriodo || this.limpouFiltro) {
        //Actions Store
       // this.setDataFiltrada(this.filtro)
        this.getAllDespesas(this.filtro);
      }

       if (this.filtrarPorPeriodo){
          this.setDataFiltrada(this.filtro)
       }

      this.limpouFiltro = false;
    },
  },

  computed: {
    ...mapGetters("store", ["mesAtual"]),

    inicioMesStore() {
      return this.mesAtual.inicio;
    },
    fimMesStore() {
      return this.mesAtual.fim;
    },

    // datas(){

    //   return this.mesAtual

    //   //Recebe as datas atuais
    // //  this.setData(this.mesAtual.inicio)
    //  // this.setData(this.mesAtual.fim)

    //   //console.log(this.filtro.fim)
    // }
  },

  watch: {
    dialogFiltro(value) {
      this.dialog = true;
      this.inicio = this.mesAtual.inicio;
      this.fim = this.mesAtual.fim;
    },

    inicio(value) {
      this.filtro.inicio = this.formatarDataMoment(value);
    },

    fim(value) {
      this.filtro.fim = this.formatarDataMoment(value);
      this.end = this.formatarData(value);
    },

    ordernarPor(value) {
      this.$emit("ordernarPor", value);
    },
    ordernarTipo(value) {
      this.$emit("ordernarTipo", value);
    },
  },
};
</script>


<style lang="sass">
div.q-field__native.row > span
    vertical-align: middle;
    border-radius: 16px;
    outline: 0;
    position: relative;
    //height: em;
    max-width: 100%;
    margin: 4px;
    font-size: 14px;
    padding: .5em .9em;
    background: transparent !important;
    border: 1px solid currentColor;
    color: red!important;
    
</style>