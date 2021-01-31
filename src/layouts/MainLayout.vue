<template>
    <q-layout view="hHr lpR fFf">
    
        <q-header class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />
    
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>
            </q-toolbar>
    
            <div class="q-pa-none">
                <div class="q-gutter-y-md">
                    <q-tabs v-model="tab" dense class="bg-grey-2 text-teal" align="justify">
                        <q-route-tab name="despesas" icon="mail" to="/despesas" label="Despesas" />
                        <q-route-tab name="calendario" icon="event" to="/calendario" label="Calendário" />
                        <q-route-tab name="grafico" icon="assessment" to="/relatorios" label="Relatórios" />
                    </q-tabs>
                </div>
            </div>
    
        </q-header>
    
        <q-drawer  v-model="left" side="left" bordered>
            <!-- drawer content -->
        </q-drawer>
    
        <q-page-container>
            <router-view />
        </q-page-container>
    
    </q-layout>
</template>

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