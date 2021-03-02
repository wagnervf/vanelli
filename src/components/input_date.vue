<template>
  <div class="q-pa-none">
   
      <q-input 
      filled 
      v-model="date"
      :label="label"
      clearable>
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="DD/MM/YYYY">
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

export default {
  props: {
    label: "",
  },

  data() {
    return {
      date: "",
    };
  },

  mounted() {
    let timeStamp = Date.now()
    this.date = date.formatDate(timeStamp, 'DD/MM/YYYY')
  },
  computed: {
    dateFormatado() {
      return date.formatDate(this.date, "DD/MM/YYYY");
    },
  },

  methods: {},
  watch: {
    date(value) {
      //envia emit para quem usar esse componente
      this.$emit("update", value);
    },
  },
};
</script>

<style lang="sass"></style>
