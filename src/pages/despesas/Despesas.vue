<template>
    <q-page class="bg-grey-2" style="display: flow-root">
     
          
      <TableDespesas />

      <!-- <Form  /> -->
      
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
  },

  
};
</script>
