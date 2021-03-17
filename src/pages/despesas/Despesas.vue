<template>
    <div class="bg-white q-ma-none">
      <div class="row fit justify-center q-py-sm text-red-4">
        <h5 class="text-h5 q-ma-none">Despesas</h5>
      </div> 
     
          
      <TableDespesas />
      
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

  created () {
    this.$q.addressbarColor.set('#e57373')
  },

  data() {
    return {
      dialog: false
    };
  },

  
};
</script>
