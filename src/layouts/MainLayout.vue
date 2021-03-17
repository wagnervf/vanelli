<template>
  <q-layout view="lHh lpR fFf" class="bg-white">
    <!-- <q-header class="barraTitulo" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title class="Titulo q-pa-xs">
          EV
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->
<!-- 
    <q-page-sticky position="top-left" style="z-index: 99999;">
      <q-btn 
          dense 
          flat 
          round 
          icon="menu" 
          @click="left = !left"
          dark
      />
    </q-page-sticky> -->

    <div style="position: absolute;">
      <q-btn 
          dense 
          flat 
          round 
          icon="menu" 
          @click="left = !left"
          color="text-grey-8"
          dark
      />
    </div>

     

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <Drawer />
    </q-drawer>

    <q-page-container >
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer elevated class="bg-grey-1 barraTabs">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="tab"
          align="justify"
          dense
          no-caps
          outside-arrows
          mobile-arrows
        >
            <!-- <q-tab
            name="Confi"
            icon="menu"
            @click="left = !left"
            label="Confi"
          /> -->
           <q-route-tab
            name="agenda"
            icon="event"
            to="/agenda"
            label="Agenda"
          />
          <q-route-tab
            name="despesas"
            icon="money_off"
            to="/despesas"
            label="Despesas"
          />
         
          <q-route-tab
            name="grafico"
            icon="assessment"
            to="/relatorios"
            label="Relatórios"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<style>
.Titulo {
  font-family: serif;
  font-size: 1.5rem;
}
.barraTitulo {
  color: #214778;
  background-color: #fff;
  text-align: left;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.barraTabs {
  color: #214778;
  /* color: #ccc; */
}
.q-tab__label {
  font-size: 11px;
}
</style>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Drawer from './Drawer'
export default {
  components :{
    Drawer
  },
  data() {
    return {
      left: false,
      tab: "tabs",
    };
  },
};
</script>
