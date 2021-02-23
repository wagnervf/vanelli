import Vue from 'vue'
import * as firebase from "firebase/app";
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { LocalStorage, Loading, Notify } from 'quasar'
import { showErrorPasswordMessage, showErrorTooManyMessage, showErrorEmailUsed } from 'src/functions/functions-show-messages'
import { notifyEmailVerification, notifyUserCreated, notifyEmailNotExist, notifyVerificationEnviado, notifyGenericPositive, notifyGenericNegative } from 'src/functions/functions-notify'
import { alertEmailVerification, actionCodeSettings } from 'src/functions/functions-email-public'


const state = {
  loggedIn: false,
  userLogado: {
    uid: '',
    name: '',
    email: '',
    photoUrl: '',
    emailVerified: '',
    created: null,
    ultimoLogin: null,
    logado: '',

  }
}

const mutations = {
  SET_LOGGED_IN (state, value) {
    state.userLogado.logado = value
    state.loggedIn = value
  },

  SET_USER_LOGADO (state, payload) {
    if (payload) {
      //console.log(payload)
      state.userLogado.uid = payload.uid
      state.userLogado.name = payload.displayName
      state.userLogado.email = payload.email
      state.userLogado.photoUrl = payload.photoURL
      state.userLogado.emailVerified = payload.emailVerified
      state.userLogado.created = payload.metadata.creationTime
      state.userLogado.ultimoLogin = payload.metadata.lastSignInTime

      state.loggedIn = true;
      LocalStorage.set('loggedIn', true)

    }
  },

  CLEAR_USER (state) {
    state.userLogado = {}
    state.loggedIn = false;
    LocalStorage.set('loggedIn', false)
  }
}

const actions = {
  registrarLoginUsuario ({ dispatch }, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        firebaseAuth.currentUser.updateProfile({ displayName: payload.displayName })
        dispatch('sendEmailVerification', payload)

        setTimeout(() => {
          dispatch('loginUsuario', payload)
        }, 1000)

      })
      .catch(error => {
        Loading.hide()
        console.log('error: ', error)
        notifyEmailVerification()
        // if (error.code == 'auth/email-already-in-use') showErrorEmailUsed()
      })
  },

  loginUsuario ({ commit, dispatch }, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {

        //Comentar esas trê linhas depois
        //Loading.hide()
        //this.$router.push('/index').catch(err => { })
        //commit('SET_USER_LOGADO', response.user)

        dispatch('verificationUserValidation', response.user)

      })
      .catch(error => {
        console.log(error)
        Loading.hide()
        if (error.code == 'auth/wrong-password') notifyGenericNegative('Usuário ou senha incorreto!')
        if (error.code == 'auth/too-many-requests') showErrorTooManyMessage()
        if (error.code == 'auth/user-not-found') notifyEmailNotExist()
      })
  },

  logoutUser () {
    Loading.hide()
    firebaseAuth.signOut()
    this.$router.push('/index').catch(err => { })
  },

  onAuthStateChanged ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(function (user) {
      Loading.hide()
      if (user) {
        if (user.emailVerified == true) {
          commit('SET_USER_LOGADO', user)
        } else {
          commit('CLEAR_USER')
        }
        //Buscar dados de outro store-tasks
        //Adicionar o Root
        // dispatch('verificationUserValidation', user)
        dispatch('store_db_firebase/ReadDataFirebase', null, { root: true })

      } else {
        console.log(user)
        commit('CLEAR_USER')
      }
    });
  },

  addUserProfileFB ({ }, payload) {
    let taskRef = firebaseDb.ref('olc_db/users/' + payload.uid)
    taskRef.set(payload)
  },

  updateProfileLogin ({ }, payload) {
    if (payload != null) {
      const update = {
        displayName: payload.displayName,
        email: payload.email,
        photoURL: payload.photoUrl,
        emailVerified: payload.emailVerified,
      }
      firebaseAuth.currentUser.updateProfile(update)
        .then(response => {
          console.log(response)
          notifyGenericPositive('Perfil Atualizado!')
        }).catch(error => {
          console.log(error)
          notifyGenericNegative('Erro ao atualizar o perfil!')
        });
    }
  },

  deleteLoginUser ({ }, userUid) {
    admin.auth().deleteUser(userUid)
      .then(response => {
        notifyGenericPositive('Login Excluído!')
      })
      .catch(function (error) {
        console.log(error);
        notifyGenericNegative('Erro ao atualizar o Login!')
      });
  },

  deleteDataFirebase ({ dispatch }, user) {
    // Excluir do Banco e Exclui o login do autenticador
    //let userId = firebaseAuth.currentUser.uid   
    let taskRef = firebaseDb.ref('olc_db/users/' + user.id)
    taskRef.remove().then(response => {
      dispatch('deleteLoginUser', user.id)
      notifyGenericPositive('Perfil Excluído!')
    }).catch(error => {
      console.log(error)
      notifyGenericNegative('Erro ao excluir o perfil!')
    });

  },

  sendEmailVerification ({ dispatch }, payload) {
    let user = firebaseAuth.currentUser
    user.sendEmailVerification(actionCodeSettings)
      .then(function (user) {
        notifyVerificationEnviado(payload.email)
      })
      .catch(function (error) {
        let result = {
          erro: error,
          mensagem: "Erro ao enviar e-mail de validação! Verifque o seu endereço de e-mail está correto!"
        }
        dispatch('redirectError', result)
      });
  },

  verificationUserValidation ({ commit, dispatch }, payload) {
    Loading.hide()
    let user = firebaseAuth.currentUser

    console.log(user)

    if (user.emailVerified == false) {
      alertEmailVerification(user.displayName, user.email)
      firebaseAuth.signOut()
      commit('CLEAR_USER')
    } else {
      dispatch('redirectSucess', payload)
    }
  },

  loginInWithGoogle ({ commit, dispatch }) {
    Loading.show()
    firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        dispatch('redirectSucess', response.user)
      })
      .catch(error => {
        let result = {
          erro: error,
          mensagem: "Erro ao conectar com o Google"
        }
        dispatch('redirectError', result)
      })
  },

  loginInWithFacebook ({ commit, dispatch }) {
    Loading.show()
    firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(response => {
        dispatch('redirectSucess', response.user)
      })
      .catch(error => {
        let result = {
          erro: error,
          mensagem: "Erro ao conectar com o Facebook"
        }
        dispatch('redirectError', result)
      })
  },


  //actionCodeSettings --> Link para voltar após redefinir senha
  redifirSenhaUsuario ({ }, email) {
    console.log(email)
    if (email) {
      firebaseAuth.sendPasswordResetEmail(email, actionCodeSettings).then(function (user) {
        notifyGenericPositive('E-mail de redefinição de senha enviado para ' + email + '.')
      })
        .catch(function (error) {
          notifyGenericNegative('Erro ao enviar e-mail de redefinição de senha! Verifque o seu endereço de e-mail está correto!')
          console.log(error)
        });
    }
  },


  redirectSucess ({ commit }, payload) {
    Loading.hide()
    // commit('SET_USER_LOGADO', payload)
    commit('SET_USER_LOGADO', payload)
    this.$router.push('/index').catch(err => { })
  },

  redirectError ({ commit }, payload) {
    console.log(payload.erro)
    Loading.hide()
    commit('CLEAR_USER')
    notifyGenericNegative(payload.mensagem)
  }







}






const getters = {
  getUserLogged: (state) => {
    return state.userLogado
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}