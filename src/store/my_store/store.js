// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
import { uid } from 'quasar'
import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
const table_despesas_user_categoria = "ev_db/DESPESAS_USER_CATEGORIA"
import mixinUtils from '../../mixins/mixin-utils'
import { date } from "quasar";

const state = {
  listaDespesas: [],
  datasMesAtual: {},
  datasDoFiltro: {},
  diaAtual: '',
  possuiFiltro: false
}

const mutations = {
  ADD_DESPESA (state, payload) {
    console.log(payload)
    //state.listaDespesas =
    // Object.assign(state.listaDespesas, payload)
    state.listaDespesas.unshift(payload)
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
  },

  SET_DIA_ATUAL (state, payload) {
    state.diaAtual = payload
  }




}
const actions = {

  getFiltradas ({ commit }, filtro) {

    firebaseDb.collection("despesas_categoria_user")
      .where('data', '>', filtro.inicio)
      .where('data', '<', filtro.fim)
      .orderBy(filtro.campo, filtro.tipo)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          commit('ADD_DESPESA', doc.data())
        });
      })
  },

  getAllDespesas ({ commit }, filtro) {
    console.log(filtro)

    //commit('ADD_DESPESA', payload)asc

    firebaseDb.collection('despesas_categoria_user')
      .orderBy(filtro.campo, filtro.tipo)
      .startAt(filtro.inicio)
      .endAt(filtro.fim)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let itenAlterado = change.doc.data()
          itenAlterado.id = change.doc.id

          if (change.type === 'added') {
            console.log(itenAlterado)
            console.log(date.formatDate(itenAlterado.data, 'YYYY-MM-DD'))
            commit('ADD_DESPESA', itenAlterado)

          }
          if (change.type === 'modified') {
            // let index = this.itens.findIndex(item => item.id === itenAlterado.id)
            //  Object.assign(this.itens[index], itenAlterado)
          }
          if (change.type === 'removed') {
            //  let index = this.itens.findIndex(item => item.id === itenAlterado.id)
            // this.itens.splice(index, 1)
          }
        })
      })




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

  setDiaAtual ({ commit }, filtro) {
    commit('SET_DIA_ATUAL', filtro)
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
  },

  diaAtualStore: state => {
    return state.diaAtual
  }



}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
