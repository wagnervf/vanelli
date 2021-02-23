<template>
  <div>
    <q-page>
      <div class="q-pa-none row justify-center">
        <q-card class="full-width q-ma-sm">
          <q-card-section>
            <div class="text-h6">Despesas</div>
            <div class="absolute-right q-pa-sm">

               <Form  />

            </div>
          </q-card-section>
          <q-separator />

          <div class="q-pa-none">
            <TableDespesas />
          </div>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import Form from "./Form";
import TableDespesas from "./TableDespesas";

export default {
  name: "DespesasIndex",

  components: {
    Form,
    TableDespesas
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
