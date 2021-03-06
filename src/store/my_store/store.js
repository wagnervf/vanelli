// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
import { uid } from 'quasar'
import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
const table_despesas_user_categoria = "ev_db/DESPESAS_USER_CATEGORIA"

const state = {
  listaDespesas: {}
}

const mutations = {
  ADD_DESPESA (state, payload) {
    state.listaDespesas = {}
    Object.assign(state.listaDespesas, payload)
    // console.log(state.listaDespesas)
  },

  UPDATE_DESPESA (state, payload) {
    state.listaDespesas.push(payload)
    Object.assign(state.listaDespesas[id], payload)
  },


}
const actions = {

  getAllDespesas ({ commit }) {
    const despesas = firebaseDb.ref(table_despesas_user_categoria);

    //Ler dados do banco
    despesas.once('value', snap => {
      let payload = snap.val()
      // console.log(payload)
      commit('ADD_DESPESA', payload)
    })


    // despesas.once('child_added', snap => {
    //   let payload = snap.val()
    //   // console.log(payload)
    //   commit('ADD_DESPESA', payload)
    // })


    //Ler dados que atualizarem
    // despesas.once('child_changed', snapshot => {
    //   let payload = snapshot.val()

    //   commit('ADD_DESPESA', payload)

    // })

    //Capturar dados deletados
    // userTasks.on('child_removed', snapshot => {
    //   let taskId = snapshot.key

    //   commit('DELETE_TASK', taskId)

    // })

  },



  getAllDespesasChanged ({ commit }) {
    console.log('Atualizouuuuu')
    const despesas = firebaseDb.ref(table_despesas_user_categoria);

    despesas.on('child_changed', snap => {
      let payload = snap.val()
      commit('UPDATE_DESPESA', payload)
    })

  },


  addDespesaUserCategoria ({ dispatch }, payload) {
    console.log(payload)
    let despesa_id = uid()
    // let userId = uid()
    //let userId = firebaseAuth.currentUser.uid

    let userId = {
      "id": "UID2",
      "name": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }

    payload.id = despesa_id
    payload.user = userId


    let taskRef = firebaseDb.ref(table_despesas_user_categoria + '/' + despesa_id)

    taskRef.set(payload).then(resposta => {

      return dispatch('getAllDespesas')

    }).catch(error => {
      console.log(error)
    });

  },

  updateDespesaUserCategoria ({ dispatch }, payload) {
    // let userId = firebaseAuth.currentUser.uid
    console.log(payload)

    let userId = {
      "id": "UID2",
      "name": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }
    let despesa_id = payload.id
    let taskRef = firebaseDb.ref(table_despesas_user_categoria + '/' + despesa_id)


    taskRef.update(payload, error => {
      if (error) {
        console.log('Atualizado')
        return true
      } else {

        return dispatch('getAllDespesasChanged')

      }
    })
  },





  // firebaseUpdateUser ({ }, payload) {
  //   if (payload.userId) {
  //     firebaseDb.ref('users/' + payload.userId).update(payload.updates)
  //   }
  // },



  //   firebaseDb.ref('users').on('child_changed', snapshot => {
  //     let userDetails = snapshot.val()
  //     let userId = snapshot.key
  //     commit('updateUser', {
  //       userId,
  //       userDetails
  //     })
  //   })
  // },

  // firebaseGetMessages ({ commit, state }, otherUserId) {
  //   let userid = state.userDetails.userId
  //   messagesRef = firebaseDb.ref('chats/' + userid + '/' + otherUserId)
  //   //buscar mensagen no firebase, passando as colunas
  //   messagesRef.on('child_added', snapshot => {
  //     let messageDetails = snapshot.val()
  //     let messageId = snapshot.key
  //     commit('addMessage', {
  //       messageId,
  //       messageDetails
  //     })
  //   })
  // },

  // //limpando store ao sair da página de chat
  // firebaseStopGettingMessages ({ commit }) {
  //   if (messagesRef) {
  //     messagesRef.off('child_added')
  //     commit('clearMessages')
  //   }
  // },


}
const getters = {
  // users: state => {
  //   let usersFiltered = {}

  //   // Mostrar apenas os usuários ativos diferentes de mim
  //   Object.keys(state.users).forEach(key => {
  //     if (key !== state.userDetails.userId) {
  //       usersFiltered[key] = state.users[key]

  //     }
  //   })
  //   return usersFiltered
  // }
  // allDespesas: (state) => {
  //   let tasksSorted = {}
  //   let keysOrdered = Object.keys(state.listaDespesas)

  //   keysOrdered.sort((a, b) => {

  //     let taskA = state.listaDespesas[a][state.sort]
  //     let taskB = state.listaDespesas[b][state.sort]

  //     if (taskA > taskB) return 1
  //     else if (taskA < taskB) return -1
  //     else return 0
  //   })

  //   keysOrdered.forEach((key) => {
  //     tasksSorted[key] = state.listaDespesas[key]
  //   })

  //   return tasksSorted
  // },


  allDespesas: state => {
    return state.listaDespesas
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
