<template>
  <div class="q-pa-1">

    <!-- Get itens do Store -->
    <q-table
      :data="this.itensTable"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
    >
      <template v-slot:top-left>
        <q-list class="text-right">
          <q-expansion-item
            expand-separator
            expand-icon="filter_list"
            expanded-icon="expand_less"
            label="Filtros"
            class="justify-end text-h7"
          >
            <q-card bordered>
              <q-card-section class="q-px-none">
                <div class="row">
                  <div class="col">
                    <q-input
                      dense
                      v-model="date"
                      filled
                      type="date"
                      hint="Inicio"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      v-model="date"
                      filled
                      type="date"
                      hint="Fim"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Buscar"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </template>

      <template v-slot:body-cell-categoria="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>

      <template v-slot:bottom-row="props">
        <q-tr class="text-red-7">
          <q-td colspan="1" class="text-left">
            Total
          </q-td>
          <q-td colspan="2" class="text-right">
            <span class="text-h6">R$ {{ totalDespesas() }}</span>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
.q-table-control
     width: 100%
</style>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      date: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 4

        // rowsNumber: xx if getting data from a server
      },

      filter: "",

      columns: [
        {
          name: "despesa",
          label: "Despesa",
          field: "despesa",
          align: "left",
          sortable: true
        },
        {
          name: "categoria",
          align: "center",
          label: "Categoria",
          field: "categoria",
          sortable: true
        },
        {
          name: "valor",
          label: "Valor",
          field: "valor",
          sortable: true,
          format: val => `${val}`
        }
      ],

     // rows: ""
    }
  },

  mounted() {},

  methods: {
    //format: (val, row) => `${val}%`

    totalDespesas() {
      let value = 0;
      this.itensTable.forEach(val => {
        value = value + val.valor;
      });

      return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
    }
  },

  computed: {
    ...mapState ('store', ['itensTable'] ),

    pagesNumber() {
      return Math.ceil(this.itensTable.length / this.pagination.rowsPerPage);
    }
  }
};
</script>
