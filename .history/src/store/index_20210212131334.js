// import Vue from 'vue'
// import Vuex from 'vuex'

// // we first import the module
// import MyStore from './my_store/store'

// Vue.use(Vuex)

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       // then we reference it
//       MyStore
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEV
//   })

//   /*
//     if we want some HMR magic for it, we handle
//     the hot update like below. Notice we guard this
//     code with "process.env.DEV" -- so this doesn't
//     get into our production build (and it shouldn't).
//   */

//   if (process.env.DEV && module.hot) {
//     module.hot.accept(['./my_store'], () => {
//       const newShowcase = require('./my_store/store').default
      
//       Store.hotUpdate({ modules: { MyStore: newShowcase } })

//     })
//   }

//   return Store
// }


//import { store } from "quasar/wrappers"
import Vue from "vue"
import Vuex from "vuex"

import store from "./my_store/store"
// import store_auth from "./myStores/store-auth"
// import store_plataform from "./myStores/store-plataform"
// import store_db_firebase from "./myStores/store-db-firebase"
// import store_db_anuncios from "./myStores/store-db-anuncios"

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
Vue.use(Vuex);
// export interface StoreInterface {
//   // Define your own store structure, using submodules if needed
//   // example: ExampleStateInterface;
//   // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
//   example: unknown;
// }

export default (function () {
  const Store = new Vuex.Store({
    modules: {
      store,
      // store_auth,
      // store_plataform,
      // store_db_firebase,
      // store_db_anuncios
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  return Store;
})
