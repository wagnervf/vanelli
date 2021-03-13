// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
import { uid } from 'quasar'
import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
const table_despesas_user_categoria = "ev_db/DESPESAS_USER_CATEGORIA"
import mixinUtils from '../../mixins/mixin-utils'

const state = {
  listaDespesas: {},
  datasMesAtual: {},
  datasDoFiltro: {},
  possuiFiltro: false
}

const mutations = {
  ADD_DESPESA (state, payload) {
    state.listaDespesas = {}
    Object.assign(state.listaDespesas, payload)
  },

  UPDATE_DESPESA (state, payload) {
    state.listaDespesas[payload.id] = {}
    Object.assign(state.listaDespesas[payload.id], payload)
  },

  DELETE_DESPESA (state, payload) {
    // forma de deletar que exclui em tempo real
    Vue.delete(state.listaDespesas, payload.id)
  },

  ADD_FILTRO_MES_ATUAL (state, payload) {
    state.datasMesAtual = {}
    Object.assign(state.datasMesAtual, payload)
  },

  ADD_DATA_FILTRADA (state, payload) {
    state.datasDoFiltro = {}
    Object.assign(state.datasDoFiltro, payload)
  }


}
const actions = {



  getAllDespesas ({ commit }, filtro) {
    const despesas = firebaseDb.ref(table_despesas_user_categoria);

    despesas.orderByChild("data")
      .startAt(filtro.inicio)
      .endAt(filtro.fim)
      .once('value', snap => {

        let payload = snap.val()

        console.log(payload)

        commit('ADD_DESPESA', payload)


      });




    //console.log(value.val())
    //Ler dados do banco
    // despesas.once('value', snap => {
    //   let payload = snap.val()
    //   commit('ADD_DESPESA', payload)
    // })

    // despesas.on("child_changed", snapshot => {
    //   let payload = snapshot.val()
    //   commit('UPDATE_DESPESA', payload)
    // })

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
    let userId = {
      "id": "UID2",
      "name": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }

    let despesa = firebaseDb.ref(table_despesas_user_categoria + '/' + payload.id)


    despesa.update(payload, error => {
      if (error) {
        console.log('Erro ao atualizar')
        return false
      } else {
        console.log('Atualizou com sucesso')
        return dispatch('getAllDespesas')

      }
    })
  },

  deleteDespesaUserCategoria ({ commit }, payload) {
    // let userId = firebaseAuth.currentUser.uid
    let userId = {
      "id": "UID2",
      "name": "Vanelli",
      "email": "vanelli@teste.com",
      "created": "2019/05/12",
      "update": "2019/05/12",
      "active": true,
      "admin": true
    }

    let despesa = firebaseDb.ref(table_despesas_user_categoria + '/' + payload.id)

    despesa.remove(error => {
      if (error) {
        console.log('Erro ao deletar')
        return false
      } else {
        console.log('Deletou com sucesso')
        commit('DELETE_DESPESA', payload)

      }
    })
  },



  setInicioFimMesAtual ({ commit }, filtro) {
    commit('ADD_FILTRO_MES_ATUAL', filtro)
  },

  setDataFiltrada ({ commit }, filtro) {
    commit('ADD_DATA_FILTRADA', filtro)
  },

  // setDataFiltros ({ commit }, payload) {
  //   commit('ADD_FILTRO_MES_ATUAL', payload)
  // }





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
  },

  mesAtual: state => {
    return state.datasMesAtual
  },

  dataSetadaNoFiltro: state => {
    return state.datasDoFiltro
  }



}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
