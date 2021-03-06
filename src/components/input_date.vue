<template>
  <div class="q-pa-none">
    <q-input
     v-if="!this.isEdit"
      filled 
      v-model="date"
      :label="label"
      clearable>
        <template v-slot:append>
          <q-icon name="event"  class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="DD/MM/YYYY" >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Fechar" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template> 
    </q-input>


    <q-input
       v-if="this.isEdit"
      filled 
      v-model="date2"
      :label="label"
      clearable>
        <template v-slot:append>
          <q-icon name="event"  class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="DD/MM/YYYY" >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Fechar" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template> 
    </q-input>
  </div>
</template>

<script>
import { date } from "quasar";
import moment from 'moment'
import mixinUtils from '../mixins/mixin-utils'

export default {
   mixins: [mixinUtils],
  props: {
    label: "",
    dataEdit: ""
  },

  data() {
    return {
      date: "",

      date2: "",
      isEdit: false
    };
  },

  
  // beforeMount() {
  //    setTimeout(() => {
  //       moment.locale('pt-br');
  //       let hj = moment().format('L')
  //       this.date = hj
  //    }, 500);
  // }, 

  

  watch: {
    date(value) {
     let dt = value.split('/')
      let ano = dt[2]
      let mes = dt[1]
      let dia = dt[0]     
      let formatedDate = ano + "-" + mes + "-" + dia

      console.log(value)
 

      //envia emit para quem usar esse componente
      this.$emit("update", formatedDate);
    },

    dataEdit(value){
      let data_edit = this.formatarData(value)
      this.isEdit = true
      console.log(data_edit)
      
      this.date2 = data_edit
    }
  },
};
</script>


