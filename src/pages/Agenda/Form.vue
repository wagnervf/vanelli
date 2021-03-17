<template>
  <div class="full-width q-gutter-sm">
    <q-dialog
      v-model="dialog"
      :maximized="false"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-card-section class="row bg-indigo q-py-md q-px-sm">
          <div class="col-10 text-h6 text-center text-white q-pt-sm" >
            <span v-if="isAdd">Novo</span>
            <span v-else>Editar</span>
            Agendamento
          </div>
          <div class="col-1 q-ma-xs justify-end text-right">
          <q-btn round flat color="white" icon="close" v-close-popup />
          </div>
          <!-- <span class="col text-right">
            <q-btn
              v-if="!isAdd"
              icon="delete"
              color="white"
              outline
              @click="deleteDespesa()"
              class="q-ma-xs"
            />
          </span> -->
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <q-form role="form" class="q-gutter-y-md">
            <div class="full-width bg-primary text-white q-pa-xs">
              <span class="text-caption ">Dia do Agendamento</span>
              <h5 class="q-ma-none q-pa-md q-pb-lg text-center">
                {{ this.dateClicado.value | filterDiaDaSemana }}</h5>
            </div>
            <q-input
              v-model="formEvento.cliente"
              label="Cliente"
              type="text"
              reverse-fill-mask
              input-class="text-left"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Valor Obrigatório']"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-select
              v-model="formEvento.tipoEvento"
              use-input
              input-debounce="0"
              label="Evento"
              :options="options"
              @filter="filterFn"
              behavior="dialog"
              use-chips
              clearable
              :rules="[
                (val) => (val !== null && val !== '') || 'Informe a tipoEvento',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
              <template v-slot:selected-item="scope">
                <q-chip outline color="indigo" text-color="indigo">
                  {{ scope.opt }}
                </q-chip>
              </template>
            </q-select>

            <q-input
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
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>

            <q-list>
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label>Valor Pago </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle
                    color="blue"
                    v-model="pago"
                    val="battery"
                  />
                </q-item-section>
              </q-item>
            </q-list>

            <q-list>
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label>Confirmado</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle
                    color="blue"
                    v-model="confirmado"
                    val="battery"
                  />
                </q-item-section>
              </q-item>
            </q-list>

            <div class="q-pt-xs">
            <label class="text-grey-8">Observação</label>
            <q-input
              filled
              v-model="formEvento.observacao"
              type="textarea"
              hide-hint
              class="q-pt-sm"             
            >
              <template v-slot:prepend>
                <q-icon name="mode" />
              </template>
            </q-input>
            </div> 

            <div class="text-right q-mt-md">
              <q-btn label="Fechar" color="orange" @click="closeDialog()" />
              <q-btn
                label="Salvar"
                @click="onSubmit()"
                color="teal"
                class="q-ma-xs"
              />
            </div>
          </q-form>
        </q-card-section>

        <pre>
          {{this.formEvento}}
        </pre>
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
import { Notify } from "quasar";
import { listaTiposEvento } from "../../dados/listaTiposEvento";
import inputDate from "../../components/input_date";
import { mapActions } from "vuex";
import mixinUtils from "../../mixins/mixin-utils";
const stringOptions = listaTiposEvento.sort();
import { date } from "quasar";
import conectFirebaseServices from "src/services/conectFirebaseServices";

export default {
  mixins: [mixinUtils],
  props: {
    dados: {
      type: Object,
      default: {},
    },
    dialogProp: "",
  },
  components: {
    inputDate,
  },
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      isAdd: false,
      date: "",
      pago: false,
      confirmado: false,

      formEvento: {
        id: null,
        data: "",
        tipoEvento: "",
        cliente: "",
        valor: "",
        observacao: "",
        pago:"",
        confirmado:""
        
      },
      valorDespesa: "",
      model: null,
      stringOptions: "",
      options: stringOptions,
      dataEdit: "",
    };
  },

  computed: {
    dateClicado() {
      this.formEvento.data = Number(date.formatDate(this.dialogProp.value, 'x'))
      return this.dialogProp;
    },
  },

  methods: {
    onSubmit() {
      if (this.isAdd) {
        //  this.addDespesaUserCategoria(this.formEvento);
        conectFirebaseServices.addEventoAgenda(this.formEvento);
      } else {
    //    conectFirebaseServices.updateDespesaUserCategoria(this.formEvento);
      }

      this.onReset();
      this.dialog = false;
      this.isAdd = false;
      this.mensagemSucesso("Dados salvos com sucesso!");
    },

    deleteDespesa() {
      this.$q
        .dialog({
          title: "Deletar Despesa",
          message: "Tem certeza que sejsa excluir a Despesa?",
          persistent: true,
          cancel: true,

          ok: {
            label: "Sim",
            outlined: true,
          },
          cancel: {
            label: "Não",
            push: false,
          },
        })
        .onOk(() => {
          //this.deleteDespesaUserCategoria(this.formEvento);
          console.log(this.formEvento);

          let response = conectFirebaseServices.deleteDespesaUserCategoria(
            this.formEvento.id
          );
          console.log(response);

          this.mensagemSucesso("Despesa deletada com sucesso!");
        })
        .onCancel(() => {
          this.dialog = false;
          this.onReset();
        })
        .onDismiss(() => {
          this.dialog = false;
          this.onReset();
        });
    },

    mensagemSucesso(value) {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        type: "positive",
        icon: "cloud_done",
        message: value,
      });
    },

    onReset() {
      this.valorDespesa = "";
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

    closeDialog() {
      this.dialog = false;
    },
  },

  watch: {
    valorDespesa(value) {
      this.formEvento.valor = Number(value);
    },
    pago(value){
      this.formEvento.pago = value;
    },
    confirmado(value){
      this.formEvento.confirmado = value;
    },
    

    dados(value) {
      this.formEvento.id = value.id;
      this.formEvento.tipoEvento = value.tipoEvento;
      this.formEvento.cliente = value.cliente;
      this.formEvento.observacao = value.observacao ? value.observacao : "";

      //  let dates = date.addToDate(value.data, { days: 1 })
      this.date = date.formatDate(value.data, "YYYY-MM-DDTHH:mm:ss.SSSZ");
      this.valorDespesa = value.valor;
      this.dialog = true;
      this.isAdd = false;
    },

    dialogProp(value) {
      console.log(value);
      // Só abre o dialog se vie algum valor ao clicar no calendário
      if(value.value){
        this.dialog = true;
        this.isAdd = true;
        this.formEvento = {};
      }


      
    },
  },
};
</script>
