
<template>
    <div class="q-pa-md row justify-center">
    
        <q-date v-model="date"  :events="events" @click="alert = true" event-color="orange"  />
     
       
    
      <q-dialog v-model="alert"  full-width>
            <q-card>
    
                <q-card-section class="q-pt-none">
                    <q-tab-panels v-model="date" animated transition-prev="jump-up" transition-next="jump-up">
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>
    
                        <q-tab-panel name="2019/02/06">
                            <div class="text-h4 q-mb-md">2019/02/06</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
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
    
    </div>
</template>

<style>
.q-date__view{
  padding-top: 0px;
}
.q-date__calendar-weekdays{
  height: 5px;
      font-size: 16px;
    font-weight: 600;
}
.q-date.q-date--portrait.q-date--portrait-standard{
  height: 500px!important;
  width: 500px!important;
}

.q-date__header{
  padding: 4px;
  text-align: center;
}

.q-date__content .q-btn {
  font-size: 16px;
  font-weight: 600;
}
.q-date--portrait-standard .q-date__header{
  height: auto;
}

.q-date__event {
    position: absolute;
    top: 0.1px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    background-color: #f443369e!important;
    color: #fff;
    
}
</style>

<script>
import { date } from 'quasar'
import formCalendario from '../../components/formCalendario'

//let timeStamp = Date.now()
//let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

export default {
    name: 'CalendariosIndex',

    components: {
      formCalendario
    },

    data() {
        return {
            alert: false,
            splitterModel: 50,
            date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            events: ['2021/01/12', '2021/01/05']
        }
    },

    methods:{
      valor(nome){
        console.log(nome)

      

      }
    }
}
</script>