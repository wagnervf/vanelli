// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
//
// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// }


import Vue from 'vue'
// import { firebaseAuth, firebaseDb } from 'boot/firebase'


const state = {
  //   userDetails: {},
  //   users: {},
  itensTable: [
    {
      despesa: "Piscina",
      categoria: "piscina",
      valor: 10
    },
    {
      despesa: "Energia",
      categoria: "Energia",
      valor: 100
    },
    {
      despesa: "Água",
      categoria: "agua",
      valor: 65
    },
    {
      despesa: "Net",
      categoria: "net",
      valor: 145
    },
    {
      despesa: "Gás",
      categoria: "gaz",
      valor: 85
    }
  ]

}

const mutations = {
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

  // firebaseGetUsers ({ commit }) {
  //   //buscar todos os usuários
  //   //ref é o id no banco
  //   //vhil primeiro elemento do banco
  //   firebaseDb.ref('users').on('child_added', snapshot => {
  //     //console.log('snapshot: ', snapshot.key)
  //     let userDetails = snapshot.val()
  //     let userId = snapshot.key
  //     //console.log('userDetails: ', userDetails)
  //     // chama mutations
  //     commit('addUser', {
  //       userId,
  //       userDetails
  //     })
  //   })

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
