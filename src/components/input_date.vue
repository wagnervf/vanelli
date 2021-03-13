<template>
  <div class="q-pa-none">
    <q-input
     v-if="!this.isEdit"      
      v-model="date"
      :label="label"
      :dense="dense"
      clearable
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
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
      v-model="date2"
      :label="label"
      :dense="dense"
      clearable>
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
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
    dataEdit: "",
    dense: "",
  },

  data() {
    return {
      date: "",
      date2: "",
      isEdit: false
    };
  },

  
  beforeMount() {
     setTimeout(() => {
        moment.locale('pt-br');
        let hj = moment().format('L')
       // this.date = hj
     }, 500);
  }, 

  

  watch: {
    date(value) {    
      //envia emit para quem usar esse componente
      this.$emit("update", this.formatarDataFirebase(value));
    },

    dataEdit(value){
      let data_edit = value
      this.isEdit = true     
      this.date2 = data_edit
    }, 
  },
};
</script>


