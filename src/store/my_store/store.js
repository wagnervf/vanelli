// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
import { uid } from 'quasar'
// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// }


import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'


const state = {
  //   userDetails: {},
  //   users: {},
  listaDespesas: [
    // {
    //   id: 1,
    //   data: "21/10/2021",
    //   modalidade: "Obra",
    //   categoria: "Google",
    //   valor: 2125,
    //   observacao: "observacao",
    // }

  ]

}

const mutations = {
  ADD_TASK (state, payload) {
    //  Vue.set(state.tasks, payload.task)

    state.listaDespesas.push(payload)
  },
  // // altera o state
  // setUserDetails (state, payload) {
  //   state.userDetails = payload
  // },
  // addUser (state, payload) {
  //   // console.log('payload: ', payload)
  //   //state.users[payload.userId] = payload.setUserDetails
  //   Vue.set(state.users, payload.userId, payload.userDetails)
  // },
  // updateUser (state, payload) {
  //   Object.assign(state.users[payload.userId], payload.userDetails)
  // },
  // addMessage (state, payload) {
  //   Vue.set(state.messages, payload.messageId, payload.messageDetails)
  // },
  // clearMessages (state) {
  //   state.messages = {}
  // }
}
const actions = {

  getAllDespesas ({ commit, dispatch }) {
    //let result = dispatch('getUsersDespesa', "UID1", snap => console.log(snap.val()))

    const despesas = firebaseDb.ref('ev_db/DESPESAS_USER_CATEGORIA');
    const users = firebaseDb.ref('ev_db/USERS');

    despesas.on('child_added', snap => {
      // let userRef = users.child(snap.user)
      // console.log(snap.val().user)
      //users.child(snap.val().user).once('value', snapshot => {
      //console.log(snap.val())
      // let users = snapshot.val();

      let payload = snap.val()
      //user: users





      commit('ADD_TASK', payload)
      console.log(payload)
      // })


    })




    // despesas.on('child_added', snapshot => {

    //   let despesasValue = snapshot.val()
    //   let despesasId = snapshot.key

    //   const users = firebaseDb.ref('ev_db/USERS');

    //   let despesaUser = users.on('child_added', despesasValue.user)

    //   let payload = {
    //     id: despesasId,
    //     values: despesasValue,
    //     user: despesaUser
    //   }
    //   console.log(payload.values)

    //   // commit('ADD_TASK', payload)
    //   // chama mutations
    //   // commit('addUser', {
    //   //   userId,
    //   //   userDetails
    //   // })
    //})


  }

  // registerUser ({ }, payload) {
  //   //console.log('payload : ', payload)
  //   firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(response => {
  //       //console.log(response)
  //       let userId = firebaseAuth.currentUser.uid;
  //       firebaseDb.ref('users/' + userId).set({
  //         name: payload.name,
  //         email: payload.email,
  //         online: true
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error.message)
  //     })
  //},

  // loginUser ({ }, payload) {
  //   firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
  //     .then(response => {
  //       console.log(response)
  //       this.$router.push('/index')
  //     })
  //     .catch(error => {
  //       console.log(error.message)
  //     })
  // },

  // logoutUser () {
  //   firebaseAuth.signOut()
  // },


  // handleAuthStateChanged ({ commit, dispatch, state }) {
  //   firebaseAuth.onAuthStateChanged(user => {
  //     if (user) {
  //       // User logado.
  //       let userId = firebaseAuth.currentUser.uid;
  //       firebaseDb.ref('users/' + userId).once('value', snapshot => {
  //         let userLogado = snapshot.val()
  //         //chama o mutations
  //         commit('setUserDetails', {
  //           name: userLogado.name,
  //           email: userLogado.email,
  //           userId: userId
  //         })
  //       })
  //       // alterará o banco firebase
  //       dispatch('firebaseUpdateUser', {
  //         userId: userId,
  //         updates: {
  //           //nome
  //           //email
  //           online: true
  //         }
  //       })
  //       dispatch('firebaseGetUsers')
  //       this.$router.push('/users')
  //     } else {
  //       // user deslogado
  //       // alterará o banco firebase
  //       dispatch('firebaseUpdateUser', {
  //         userId: state.userDetails.userId,
  //         updates: {
  //           //nome
  //           //email
  //           online: false
  //         }
  //       })
  //       // limpa o state
  //       commit('setUserDetails', {})
  //       this.$router.replace('/login')

  //     }
  //   });
  // },

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

  // firebaseSendMessage ({ }, payload) {
  //   firebaseDb.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)

  //   payload.message.from = 'them'
  //   firebaseDb.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
  // }
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
