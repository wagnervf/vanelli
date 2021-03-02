<template>
  <div class="full-width q-gutter-sm">
   
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-card-section class="row bg-red-4 flex">
          <div class="col text-h5 text-white">Editar Despesa</div>        
          <div class="col text-right">
            <q-btn
              round
              flat
              color="white"
              icon="close"
              v-close-popup             
            />
          </div>
        </q-card-section>
       
        <q-card-section class="q-gutter-md">
            <!-- v-on:submit.prevent="onSubmit" -->

          <q-form
            role="form"
            
            class="q-gutter-md"
          >
            <inputDate label="Data" @update="setData($event)" />

            <q-select
              filled
              v-model="modalidade"
              transition-show="flip-up"
              transition-hide="flip-down"
              use-input
              input-debounce="0"
              label="Modalidade"
              :options="modalidades"
              @filter="filterFn"
              behavior="menu"
              clearable
              :rules="[
                (val) => (val !== null && val !== '') || 'Informe a Modalidade',
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              filled
              v-model="categoria"
              use-input
              input-debounce="0"
              label="Categoria"
              :options="options"
              @filter="filterFn"
              behavior="menu"
              transition-show="flip-up"
              transition-hide="flip-down"
              clearable
              :rules="[
                (val) => (val !== null && val !== '') || 'Informe a Categoria',
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              filled
              v-model="valorDespesa"
              label="Valor"
              type="number"
              mask="#,##"
              reverse-fill-mask
              input-class="text-left"
              prefix="R$"
              class="text-h6"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Valor Obrigatório']"
              clearable
            />

            <q-input
              filled
              v-model="observacao"
              type="textarea"
              label="Observação"
            />

            <div class="text-right">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                v-close-popup
                flat
                class="q-ml-sm"
              />
              <q-btn
                label="Salvar"
                @click="onSubmit()"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>


  </div>
</template>
<script>
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
import inputDate from "../../components/input_date";
import { mapActions } from 'vuex'
export default {
  props: {  
  //  dialog: {
  //    type: Boolean,
  //    default: false
  //  },

    dados: {
      type: Object,
      default: {}
    }
  },


  components: {
    inputDate,
  },
  data() {
    return {
     // dialog: false,
      maximizedToggle: true,

      // formDespesa: {
        data: '',
        modalidade: '',
        categoria: '',
        valor: '',
        observacao: '',
      // },

      valorDespesa:'',
      model: null,
      stringOptions:'',
      options: stringOptions,
      modalidades: [
        "Conta Fixa",
        "Obra",
        "Ampliação",
        "Reforma",
        "Segurança",
        "Reposição",
      ],

      dialog:false
    };
  },

  computed:{
    //janela(){
      //  get: () => {
      //  return this.dialog
      //  },   
      //  set: (newValue) => {
      //     return newValue        
      // }
    //  }
  },

  methods: {
    ...mapActions('store', ['addTask' ,'getAllDespesas']),


    onSubmit() {
    
      
     // this.addTask(this.formDespesa)
      this.onReset()
     // this.dialog = true

      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: 'Dados salvos com sucesso!'
       // message: "Submitted"
      });
    },

    getDespesas(){
      this.getAllDespesas()
    },

    setData(value) {
      this.data = value;
    },
    onReset() {
      this.valorDespesa = ''
      
     
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },

  watch:{
    valorDespesa(value){
      // console.log(typeof(value))
      // console.log(parseFloat(value))
      // console.log(Number(value))
      this.valor = Number(value)
    },

    dados(value){
      console.log(value)
      this.data = value.desp_data
      this.categoria = value.cat_descricao
      this.modalidade = value.desp_descricao
      this.valorDespesa = value.desp_valor
      this.observacao = value.desp_observacao

      this.dialog =true
    },

    janela(value){
      console.log(value)
    }
  }
};
</script>
