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

    <!-- <q-datetime-picker
      :label="label"
      v-model="date"
      :display-value="date | filterDataFormatada"
      clearable
      danse
      today-btn
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer"></q-icon>
      </template>
    </q-datetime-picker> -->


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
import { mapGetters } from "vuex";

export default {
   mixins: [mixinUtils],
  props: {
    label: "",
    dataEdit: "",
    dense: "",
  //  dataAtual: ""
  },

  data() {
    return {
      date: "",
      date2: "",
      isEdit: false,
    };
  },

  
  beforeMount() {
    setTimeout(() => {
      this.date = this.formatarData(Date.now())
    }, 500);
  }, 

   computed: {
    ...mapGetters("store", ["diaAtualStore"]),

    diaAtual(){
      //this.date = this.diaAtualStore;
     // this.date = this.diaAtualStore;
    //this.date = Date.now()
    }

  },

  

  watch: {
    date(value) {    
      //envia emit para quem usar esse componente
      console.log(date.formatDate(value, 'x'))
     this.$emit("update", date.formatDate(value, 'x'))
   //   this.$emit("update", value);
    },

    dataEdit(value){
      let data_edit = value
      this.isEdit = true     
      this.date2 = data_edit
    },

  //   dataAtual(value){
  //     console.log(value)
  //     this.date = value
  // }

  },
};
</script>


