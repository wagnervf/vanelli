<template>
  <div class="q-pa-sm row justify-center">
    <q-card class="full-width q-ma-md">
      <q-card-section class="bg-green text-white">
        <div class="text-h6">Receitas</div>

        <div class="absolute-right q-ma-md">
          <q-btn round rounded outline  icon="add" />
        </div>
        
      </q-card-section>

      <q-separator />

      <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Total mês de Janeiro</q-btn>
        <q-btn flat>Novo</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="full-width">
      <q-card-section class="bg-red text-white">
        <div class="text-h6">Despesas</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-separator />


      <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

      <q-card-actions align="around">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Novo</q-btn>
      </q-card-actions>
    </q-card>

  
  </div>
</template>

<script>
  export default {
    data () {
      return {
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    }
  }
</script>