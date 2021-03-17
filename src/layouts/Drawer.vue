<template>
  <div class="q-ma-sm">
      <q-list >
      
       <q-item clickable v-ripple class="q-mb-sm">
        <q-item-section avatar top>
          <q-avatar icon="account_circle" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">User</q-item-label>
          <q-item-label caption>February 22nd, 2019</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="green" />
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="settings" />
        </q-item-section>

        <q-item-section>Configurações</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="login" />
        </q-item-section>

        <q-item-section>Entrar</q-item-section>
      </q-item>

      <q-item class="absolute-bottom">
        <q-item-section>
          <q-item-label caption>Espaço Vanelli (0.01 beta)</q-item-label>
          <q-item-label caption>{{ minuto }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
        </q-item-section>
      </q-item>
      </q-list>
  </div>
</template>

<script>
import mixinUtils from "../mixins/mixin-utils";
import moment from "moment";
export default {
  mixins: [mixinUtils],


computed:{
  minuto(){
    moment.locale('pt-br');
    return moment().format("DD, MMMM YY")
  }
}
}
</script>

<style>

</style>