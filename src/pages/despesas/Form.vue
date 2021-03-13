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
        <q-card-section class="row bg-red-4 flex-inline q-pa-sm">
          <div class="col q-ma-none text-left">
            <q-btn
              round
              flat
              color="white"
              icon="arrow_back"
              v-close-popup             
            />
          </div>
          <div class="col-6 text-h5 q-ma-none text-white" style="line-height:1.7"> 
            <span v-if="isAdd">Nova</span>
            <span v-else>Editar</span>
             Despesa
          </div> 
          <span class="col"></span>      
          
        </q-card-section>
       
        <q-card-section class="q-gutter-md">
            <!-- v-on:submit.prevent="onSubmit" -->

          <q-form role="form" class="q-gutter-sm">
            <inputDate 
              label="Data" 
              @update="setData($event)" 
              :dataEdit="this.dataEdit"
              class="q-pb-md"
            />

            <q-select
              filled
              v-model="formDespesa.categoria"
              use-input
              input-debounce="0"
              label="Categoria"
              :options="options"
              @filter="filterFn"
              behavior="dialog"
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
              v-model="formDespesa.descricao"
              label="Descrição"
              type="text"
              reverse-fill-mask
              input-class="text-left"            
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Valor Obrigatório']"
            />

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
              v-model="formDespesa.observacao"
              type="textarea"
              label="Observação"
            />

            <div class="text-right q-mt-md q-gutter-x-sm">
              <q-btn
                label="Fechar"
                color="orange"
                @click="closeDialog()"
                flat
                class="q-ma-xs"
                dense
                icon-right="close"
              />
              <q-btn
                label="Deletar"
                color="red-4"
                @click="deleteDespesa()"
                flat
                class="q-ma-xs"
                dense
                icon-right="delete"
              />
              <q-btn
                label="Salvar"
                @click="onSubmit()"
                color="teal"
                flat
                dense
                class="q-ma-xs"
                icon-right="save"
              />
            </div>
          </q-form>
        </q-card-section>

        {{this.formDespesa}}

      </q-card>
    </q-dialog>
    
  </div>
</template>
<style lang="sass">

div.q-dialog__inner.flex.no-pointer-events.q-dialog__inner--minimized.q-dialog__inner--standard.fixed-full.flex-center > div > div.q-card__actions.q-card__actions--horiz.row.justify-end > button:nth-child(1)
  background: white!important;
  color: red!important;
  border: 1px solid red !important
  text-transform: capitalize;

div.q-dialog__inner.flex.no-pointer-events.q-dialog__inner--minimized.q-dialog__inner--standard.fixed-full.flex-center > div > div.q-card__actions.q-card__actions--horiz.row.justify-end > button:nth-child(2)
  background: white!important;
  color: #009688 !important;
  border: 1px solid #009688 !important
  text-transform: capitalize;

.q-btn__wrapper:before
  box-shadow:none!important

</style>


<script>
import { Notify } from 'quasar'
import { listaCategorias } from '../../dados/listaCategorias'
import inputDate from "../../components/input_date";
import { mapActions } from 'vuex'
import mixinUtils from '../../mixins/mixin-utils'
const stringOptions =  listaCategorias.sort()
import { date } from 'quasar'

export default {
  mixins: [mixinUtils],
   props: {  
    dados: {
      type: Object,
      default: {}
    }, 
    dialogProp:"" 
  },
  components: {
    inputDate,
  },
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      isAdd: false,

      formDespesa: {
        id: null,
        data: '',        
        categoria: '',
        descricao: '',
        valor: '',
        observacao: '',
      },
      valorDespesa:'',
      model: null,
      stringOptions:'',
      options: stringOptions,
      dataEdit: ''
    
    };
  },

  // beforeMount() {
  //    setTimeout(() => {
  //       moment.locale('pt-br');
  //       let hj = moment().format('L')
  //       this.setData(hj)
  //    }, 500);
  // }, 

  computed: {},



  methods: {
    ...mapActions('store', [
      'getAllDespesas',
      'addDespesaUserCategoria',
      'updateDespesaUserCategoria',
      'deleteDespesaUserCategoria'
      ]),


    onSubmit() {
            
      if(this.isAdd){
         this.addDespesaUserCategoria(this.formDespesa)
         console.log('Cadastrar')

      }else{

        this.updateDespesaUserCategoria(this.formDespesa)
        console.log('Atualizar')
      }     

      this.onReset()
      this.dialog = false
      this.isAdd = false

     this.mensagemSucesso('Dados salvos com sucesso!')
    },

    setData(value) {
       this.formDespesa.data = value
    },

    setDataEdit(value){
      this.dataEdit = ''
      setTimeout(() => {  
          let day = date.addToDate(value, { days: 1 })
          day = date.formatDate(day, "YYYY-MM-DD")
          this.dataEdit = day
          this.setData(day)
      }, 500);     
    },

    deleteDespesa() {
       this.$q.dialog({
        title: 'Deletar Despesa',
        message: 'Tem certeza que sejsa excluir a Despesa?',
        persistent: true,
        
        cancel: true,
        ok: {
          label : 'Sim',
          outlined: true,
          
        },
        cancel: {
          label : 'Não',
          push: false
          
        },
      }).onOk(() => {
        this.deleteDespesaUserCategoria(this.formDespesa);
        this.mensagemSucesso('Despesa deletada com sucesso!')
        
      }).onCancel(() => {
        this.dialog = false
        this.onReset()
      }).onDismiss(() => {
        this.dialog = false
        this.onReset()
      })
     
    },

    mensagemSucesso(value){
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        type: 'positive',
        icon: "cloud_done",
        message: value
      });
    },


    onReset() {
      this.formDespesa = {}
      this.valorDespesa = ''      
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions
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

    closeDialog(){
     this.dialog = false
    }

  },

  watch:{
    valorDespesa(value){
      this.formDespesa.valor = Number(value)
    },

    dados(value){    
      console.log(value)   
      this.formDespesa.id = value.id
      this.formDespesa.categoria = value.categoria
      this.formDespesa.descricao = value.descricao      
      this.formDespesa.observacao = value.observacao ? value.observacao : ""

      this.setDataEdit(value.data)
      this.valorDespesa = value.valor
      this.dialog = true;
    },

    dialogProp(value){
      this.dialog = true;
      this.isAdd = true
      this.onReset()
    }
  }
};
</script>
