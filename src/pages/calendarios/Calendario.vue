<template>
  <div class="q-pa-none row justify-center">
     <div class="row fit justify-center q-pa-sm bg-primary text-white">
        <h5 class="text-h5 q-ma-none">Agenda</h5>
      </div> 
    
   <q-date
      v-model="date"
      :events="events"
      @click="alert = true"
      event-color="orange"
    />

    <q-dialog v-model="alert" full-width>
      <q-card>
        <q-card-section class="q-pt-none">
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="2021/01/12">
              <div class="text-h4 q-mb-md text-center">2019/02/01</div>
              <q-list bordered separator>
                <q-item clickable v-ripple>
                  <q-item-section>Nome: </q-item-section>
                  <q-item-section> Wagner Freiria</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Celular: </q-item-section>
                  <q-item-section> 9-9901-2221</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Adiantamento Pago: </q-item-section>
                  <q-item-section>SIM</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Valor Total Pago: </q-item-section>
                  <q-item-section>SIM</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>Chaves Retiradas: </q-item-section>
                  <q-item-section>SIM</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="2019/02/05">
              <div class="text-h4 q-mb-md">2019/02/05</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>

            <q-tab-panel name="2019/02/06">
              <div class="text-h4 q-mb-md">2019/02/06</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>

            <q-tab-panel name="2021/01/05">
              <formCalendario />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog> 
 
 
  
  <daykeep-calendar-agenda
    :event-array="someEventObject"
    :sunday-first-day-of-week="true"
    :allow-editing="true"
    :render-html="true"    
  />
  </div>
</template>

<style>
.q-date__view {
  padding-top: 0px;
}
.q-date__calendar-weekdays {
  height: 5px;
  font-size: 16px;
  font-weight: 600;
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
  font-size: 16px;
  font-weight: 600;
}
.q-date--portrait-standard .q-date__header {
  height: auto;
}

.q-date__event {
  position: absolute;
  top: 0.1px;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background-color: #f443369e !important;
  color: #fff;
}
</style>

<script>
import { date } from "quasar";
import formCalendario from "../../components/formCalendario";
//import { DaykeepCalendar } from '@daykeep/calendar-quasar'
import {
  DaykeepCalendarMonth,
  DaykeepCalendarAgenda,
  DaykeepCalendarMultiDay
} from '@daykeep/calendar-quasar'

//let timeStamp = Date.now()
//let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

export default {
  name: "CalendariosIndex",

  components: {
    formCalendario,
     DaykeepCalendarMonth,
  DaykeepCalendarAgenda,
  DaykeepCalendarMultiDay
  },

  //Cor da Barra Inicial
  // created () {
  //   this.$q.addressbarColor.set('#1976D2')
  // },


  data() {
    return {
      alert: false,
      splitterModel: 50,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),
      events: ["2021/01/12", "2021/01/05"],
      now: date.formatDate(Date.now(), "YYYY-DD-MM"),

     someEventObject: [
  {
    id: 1,
    summary: 'Test event',
    description: 'Some extra info goes here',
    location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
    start: {
      dateTime: '2021-03-16T14:00:00', // ISO 8601 formatted
      timeZone: 'America/New_York' // Timezone listed as a separate IANA code
    },
    end: {
      dateTime: '2021-03-16T16:30:00',
      timeZone: 'American/New_York'
    },
    color: 'positive',
    attendees: [
      {
        id: 5,
        email: 'somebody@somewhere.com',
        displayName: 'John Q. Public',
        organizer: false,
        self: false,
        resource: false
      }
    ]
  },
  {
    id: 2,
    summary: 'Test all-day event',
    description: 'Some extra info goes here',
    start: {
      date: '2021-03-16' // A date variable indicates an all-day event
    },
    end: {
      date: '2021-03-19'
    }
  },
    {
      id: 3,
      summary: 'Some other test event',
      description: 'Some extra info goes here',
      start: {
        dateTime: '2021-03-17T10:00:00+0500', // timezone embedded in dateTime
      },
      end: {
        dateTime: '2021-03-17T12:30:00+0500',
      },
    },
]
    };
  },

  methods: {
    valor(nome) {
      console.log(nome);
    },
  },
};
</script>
