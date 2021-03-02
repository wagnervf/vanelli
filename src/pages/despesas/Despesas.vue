<template>
    <q-page>
     
      <Form  />
     
      <TableDespesas />
      
    </q-page>
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
