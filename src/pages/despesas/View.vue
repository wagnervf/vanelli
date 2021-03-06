<template>
  <q-dialog
    v-model="dialog"
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-sm text-white bg-red-4">
        <div class="text-h6">Fechar</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <div class="q-pa-md q-gutter-xs">
        <q-list bordered class="rounded-borders">
          <q-item-label header class="bg-grey-3 text-weight-bold"
            >Despesa Lançada</q-item-label
          >
          <div v-for="item in despesas">
            <q-item>
              <q-item-section>
                <span class="text-weight-bold">{{ item.label }}</span>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.value }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import mixinUtils from '../../mixins/mixin-utils'
export default {
  props: {
    dados: {
      type: Object,
      default: {},
    },
  },

   mixins: [mixinUtils],

  data() {
    return {
      dialog: false,
      despesas: "",
    };
  },

  watch: {
    dados(value) {
      this.despesas = [
        { label: "Data", value: this.formatarData(value.data) },
        { label: "Categoria", value: value.categoria },
        { label: "Descrição", value: value.descricao },
        { label: "Valor", value: this.formatarReal(value.valor) },
        { label: "Observação", value: value.observacao },
        { label: "Usuário", value: value.user.name },
        { label: "E-mail", value: value.user.email },
      ];
      this.dialog = true;
    },
  },
};
</script>
