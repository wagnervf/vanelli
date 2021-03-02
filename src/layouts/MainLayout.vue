<template>

  <q-layout view="lHh lpR fFf">
       <q-header class="barraTitulo" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />
                <q-toolbar-title class="Titulo q-pa-xs">
                    Espaço Vanelli
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
  
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
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
                <q-route-tab  name="despesas" icon="mail" to="/despesas" label="Despesas" />
                <q-route-tab  name="calendario" icon="event" to="/calendario" label="Calendário" />
                <q-route-tab  name="grafico" icon="assessment" to="/relatorios" label="Relatórios" />
            </q-tabs>
        </div>
    </q-footer>
  </q-layout>

</template>

<style >

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
export default {
    data() {
        return {
            left: false,
            tab: 'tabs'
        }
    }
}
</script>