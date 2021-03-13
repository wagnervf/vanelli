<template>
    <div class="bg-white q-ma-none" >
      <div class="row fit justify-center q-pa-sm bg-red-4 text-white">
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
