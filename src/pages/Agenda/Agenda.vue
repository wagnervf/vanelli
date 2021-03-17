<template>
  <div class="q-pa-sm row justify-center">
    <div class="row fit justify-center q-pa-sm text-primary" style="border-radius:25px">
      <h5 class="text-h5 q-ma-none">Agenda</h5>
    </div>
    <q-date
      v-model="date"
      :events="events"
      @click="addDespesa(date)"
      
    />

    <Form :dados="this.editedItem" :dialogProp="this.dialogAdd" />
    <!-- <ListaEventos /> -->
     
      

     <q-list class="full-width q-my-md q-mb-xl" 
     style="max-width: 500px; border-radius:25px; border: 1px solid #eee">  
       <q-banner class="bg-primary text-white">
        Lista de Evento
      </q-banner>   
       
      <q-item v-for="evento in eventos" :key="evento.id" style="border-bottom: 1px solid #eee ">       
        <q-item-section top avatar>
          <q-avatar
          class="q-ma-xs"
              size="md"
              :color="evento.confirmado ? 'teal' : 'yellow'" 
              text-color="white"
            >
             <q-icon :name="evento.confirmado ? 'check' : ''"></q-icon>
            </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{evento.cliente}}</q-item-label>
          <q-item-label caption lines="2">{{evento.tipoEvento}}</q-item-label>
        </q-item-section>

        <q-item-section side top class="q-pt-md">
          <q-item-label class="text-bold">{{evento.data | filterDataFormatada}}</q-item-label>
        </q-item-section>
 
      </q-item>
     
     </q-list>

        

        
        

     </q-list>
     <!-- {{this.eventos}} -->
  </div>

 
</template>

<style>
.q-date__view {
  padding-top: 0px;
}
.q-date__calendar-weekdays {
     height: 9%;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #eee
}
.q-date.q-date--portrait.q-date--portrait-standard {
  height: 500px !important;
  width: 500px !important;
}

.q-date__header {
  padding: 4px;
  text-align: center;
}

.q-date__content .q-btn {
  font-size: 18px;
  font-weight: 600;
}
.q-date--portrait-standard .q-date__header {
  height: auto;
}
.q-date__calendar-item{
    font-size: 20px;
    max-width: 15%;
    max-height:17%;
    border: 1px solid #eee
}

.q-date__event {
  position: relative;
  top: -48px;
  width: 165px;
  max-width: 65px;
  height: 52px;
  border-radius: 5px;
  background-color: #f443369e !important;
  color: #fff;
  min-width: 45px;
  left: 110%;
}
</style>

<script>
import { date } from "quasar";
import Form from "./Form";
import ListaEventos from "./ListaEventos";
import { firebaseDb } from "src/boot/firebase.js";
import mixinUtils from "../../mixins/mixin-utils";
//import { DaykeepCalendar } from '@daykeep/calendar-quasar'
// import {
//   DaykeepCalendarMonth,
//   DaykeepCalendarAgenda,
//   DaykeepCalendarMultiDay,
// } from "@daykeep/calendar-quasar";

//let timeStamp = Date.now()
//let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

export default {
  name: "CalendariosIndex",
    mixins: [mixinUtils],

  components: {
    Form,
    ListaEventos,
    // DaykeepCalendarMonth,
    // DaykeepCalendarAgenda,
    // DaykeepCalendarMultiDay,
  },
  data() {
    return {
      alert: false,
      splitterModel: 50,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),

      events: [],
      now: date.formatDate(Date.now(), "YYYY-DD-MM"),
      dialogAdd: false,

      editedItem: {
        nome: "wagner",
        id: 254,
      },

      eventos:[],

      someEventObject: [
        {
          id: 1,
          cliente: "Test event",
          description: "Some extra info goes here",
          location:
            "Office of the Divine Randomness, 1232 Main St., Denver, CO",
          start: {
            dateTime: "2021-03-16T14:00:00", // ISO 8601 formatted
            timeZone: "America/New_York", // Timezone listed as a separate IANA code
          },
          end: {
            dateTime: "2021-03-16T16:30:00",
            timeZone: "American/New_York",
          },
          color: "positive",
          attendees: [
            {
              id: 5,
              email: "somebody@somewhere.com",
              displayName: "John Q. Public",
              organizer: false,
              self: false,
              resource: false,
            },
          ],
        },
        {
          id: 2,
          summary: "Test all-day event",
          description: "Some extra info goes here",
          start: {
            date: "2021-03-16", // A date variable indicates an all-day event
          },
          end: {
            date: "2021-03-19",
          },
        },
        {
          id: 3,
          summary: "Some other test event",
          description: "Some extra info goes here",
          start: {
            dateTime: "2021-03-17T10:00:00+0500", // timezone embedded in dateTime
          },
          end: {
            dateTime: "2021-03-17T12:30:00+0500",
          },
        },
      ],
    };
  },

  //Cor da Barra Inicial
  mounted() {
    this.$q.addressbarColor.set("#1976D2");
    this.date = date.formatDate(Date.now(), "YYYY/MM/DD"); 
    this.getDespesas();
  },


  methods: {

    getDespesas() {
      // this.filtro.inicio = Number(this.primeiroDiaMes());
      // this.filtro.fim = Number(this.ultimoDiaMes());
      // this.filtro.campo = "data";
      // this.filtro.tipo = "asc";

      firebaseDb
        .collection("eventos")
        // .orderBy(this.filtro.campo, this.filtro.tipo)
        // .startAt(this.filtro.inicio)
        // .endAt(this.filtro.fim)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let itenAlterado = change.doc.data();
            itenAlterado.id = change.doc.id;

            if (change.type === "added") {
              this.eventos.unshift(itenAlterado);
              this.events.push(date.formatDate(itenAlterado.data, "YYYY/MM/DD"));
              console.log(this.events)
            }
            if (change.type === "modified") {
              let index = this.eventos.findIndex(
                (item) => item.id === itenAlterado.id
              );
              Object.assign(this.eventos[index], itenAlterado);
            }
            if (change.type === "removed") {
              let index = this.eventos.findIndex(
                (item) => item.id === itenAlterado.id
              );
              this.eventos.splice(index, 1);
            }
          });
        });
    },

    addDespesa(value) {
      //  console.log(value);
      //  this.dialogAdd = ""
      // this.alert = true;

      let info = {
        alerta: true,
        value: value,
      };
      this.dialogAdd = Object.assign({}, info);
      this.date = "";
    },
    valor(nome) {
      console.log(nome);
    },
  },
};
</script>
