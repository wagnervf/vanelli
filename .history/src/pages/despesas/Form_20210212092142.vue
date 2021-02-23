<template>
  <div class="q-pa-none q-gutter-sm">
    <!-- <q-btn label="Maximized" color="primary" @click="dialog = true" /> -->
    <q-btn round color="red" icon="add" @click="dialog = !dialog" />

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-card-section class="bg-red-4">
          <div class="text-h5 text-white">Nova Despesa</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-select
              filled
              v-model="formDespesa.modalidade"
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
                val => (val !== null && val !== '') || 'Informe a Modalidade'
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
              v-model="formDespesa.categoria"
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
                val => (val !== null && val !== '') || 'Informe a Categoria'
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
              prefix="R$"
              type="number"
              v-model="formDespesa.valor"
              label="Valor*"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Informe o valor'
              ]"
            />

            <q-input
              filled
              v-model="formDespesa.observacao"
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
              <q-btn label="Salvar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
export default {
  // props:{
  //     dialog: {default: false}
  // },
  data() {
    return {
      dialog: true,
      maximizedToggle: true,

      formDespesa: {
        modalidade: "",
        categoria: "",
        valor: "",
        observacao: null
      },

      model: null,
      stringOptions,
      options: stringOptions,
      modalidades: [
        "Conta Fixa",
        "Obra",
        "Ampliação",
        "Reforma",
        "Segurança",
        "Reposição"
      ]
    };
  },

  methods: {
    onSubmit() {
      e.preventDefault();

      console.log(this.formDespesa.$q);

      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.observacao = null;
      this.valor = null;
      this.accept = false;
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
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>
