import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { LocalStorage, Loading, Notify } from 'quasar'
import { notifyGenericPositive, notifyGenericNegative } from 'src/functions/functions-notify'

//gerador de ID
import { uid } from 'quasar'

const state = {
  users: {},
}

const mutations = {

}

const actions = {
  // Action é tulizada lá no @click e o Action Chama o Mutations que irá atualizar o states
  // addUserProfileFB ({ }, payload) {
  //   let taskRef = firebaseDb.ref('olc_db/users/' + payload.uid)
  //   taskRef.set(payload)
  // },

  addImovelFB ({ }, payload) {

  }

  // updateProfileLogin ({ }, payload) {
  //   if (payload != null) {
  //     const update = {
  //       displayName: payload.displayName,
  //       email: payload.email,
  //       photoURL: payload.photoUrl,
  //       emailVerified: payload.emailVerified,
  //     }
  //     firebaseAuth.currentUser.updateProfile(update)
  //       .then(response => {
  //         console.log(response)
  //         notifyGenericPositive('Perfil Atualizado!')
  //       }).catch(error => {
  //         console.log(error)
  //         notifyGenericNegative('Erro ao atualizar o perfil!')
  //       });
  //   }
  // },

  // deleteLoginUser ({ }, userUid) {
  //   admin.auth().deleteUser(userUid)
  //     .then(response => {
  //       notifyGenericPositive('Login Excluído!')
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       notifyGenericNegative('Erro ao atualizar o Login!')
  //     });
  // },

  // deleteDataFirebase ({ dispatch }, user) {
  //   // Excluir do Banco e Exclui o login do autenticador
  //   //let userId = firebaseAuth.currentUser.uid   
  //   let taskRef = firebaseDb.ref('olc_db/users/' + user.id)
  //   taskRef.remove().then(response => {
  //     dispatch('deleteLoginUser', user.id)
  //     notifyGenericPositive('Perfil Excluído!')
  //   }).catch(error => {
  //     console.log(error)
  //     notifyGenericNegative('Erro ao excluir o perfil!')
  //   });

  // },



}

// const getters = {
//   // Ordenacao das tarefas

//   //Filtrando o objeto


//   //Recebendo os valores filtrados



// }

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  //getters
}