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
            <q-btn round flat color="white" icon="arrow_back" v-close-popup />
          </div>
          <div
            class="col-6 text-h5 q-ma-none text-white"
            style="line-height: 1.7;"
          >
            <span v-if="isAdd">Nova</span>
            <span v-else>Editar</span>
            Despesa
          </div>
          <span class="col text-right">
            <q-btn
                v-if="!isAdd"
                icon="delete"
                color="white"
                outline
                @click="deleteDespesa()"
                class="q-ma-xs"
              />
          </span>
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <q-form role="form" class="q-gutter-y-md">
            <!-- <inputDate
              label="Data"
              @update="setDataEscolhida($event)"
              :dataEdit="this.dataEdit"
              class="q-pb-md"
            /> -->

            <q-datetime-picker
            label="Data"
            v-model="date"
            :display-value="date | filterDataFormatada"
            clearable
            danse
            today-btn
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer"></q-icon>
            </template>
          </q-datetime-picker> 

            <q-select
              v-model="formDespesa.categoria"
              use-input
              input-debounce="0"
              label="Categoria"
              :options="options"
              @filter="filterFn"
              behavior="dialog"
              use-chips
              clearable
              :rules="[
                (val) => (val !== null && val !== '') || 'Informe a Categoria',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
              <template v-slot:selected-item="scope">
                <q-chip outline color="red" text-color="red">
                  {{ scope.opt }}
                </q-chip>
              </template>
            </q-select>

            <q-input
              v-model="formDespesa.descricao"
              label="Descrição"
              type="text"
              reverse-fill-mask
              input-class="text-left"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Valor Obrigatório']"
            >
              <template v-slot:prepend>
                <q-icon name="title" />
              </template>
            </q-input>

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

            <div class="q-pt-xs">
            <label class="text-grey-8">Observação</label>
            <q-input
              filled
              v-model="formDespesa.observacao"
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
import { listaCategorias } from "../../dados/listaCategorias";
import inputDate from "../../components/input_date";
import { mapActions } from "vuex";
import mixinUtils from "../../mixins/mixin-utils";
const stringOptions = listaCategorias.sort();
import { date } from "quasar";
import conectFirebaseServices from "src/services/conectFirebaseServices"

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
      date: '',

      formDespesa: {
        id: null,
        data: "",
        categoria: "",
        descricao: "",
        valor: "",
        observacao: "",
      },
      valorDespesa: "",
      model: null,
      stringOptions: "",
      options: stringOptions,
      dataEdit: "",
    };
  },


  methods: {
    ...mapActions("store", [
      "getAllDespesas",
      "addDespesaUserCategoria",
      "updateDespesaUserCategoria",
      "deleteDespesaUserCategoria",
      "setDiaAtual",
    ]),

    onSubmit() {
      if (this.isAdd) {
      //  this.addDespesaUserCategoria(this.formDespesa);
        conectFirebaseServices.addDespesaUserCategoria(this.formDespesa)
      }else {
        conectFirebaseServices.updateDespesaUserCategoria(this.formDespesa)
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
          //this.deleteDespesaUserCategoria(this.formDespesa);
          console.log(this.formDespesa)
          
          let response = conectFirebaseServices.deleteDespesaUserCategoria(this.formDespesa.id)
          console.log(response)

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

    setDataAtual(){
      let timeStamp = Date.now()
      this.date = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      this.formDespesa.data = Number( date.formatDate(timeStamp, 'x'))
    }
  },

  watch: {
    date(value){
      this.formDespesa.data = Number(date.formatDate(value, 'x'))
    },
    valorDespesa(value) {
      this.formDespesa.valor = Number(value);
    },

    dados(value) {
      this.formDespesa.id = value.id;
      this.formDespesa.categoria = value.categoria;
      this.formDespesa.descricao = value.descricao;
      this.formDespesa.observacao = value.observacao ? value.observacao : "";

    //  let dates = date.addToDate(value.data, { days: 1 })
      this.date = date.formatDate(value.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      this.valorDespesa = value.valor;
      this.dialog = true;
      this.isAdd = false;
    },

    dialogProp() {
      this.dialog = true;
      this.isAdd = true;
      this.formDespesa = {}
      this.setDataAtual()

    },
  },
};
</script>
