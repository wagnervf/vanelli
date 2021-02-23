import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'

//gerador de ID
import { uid } from 'quasar'

const state = {
  users: {},
}

const mutations = {}

const actions = {
  // Action é tulizada lá no @click e o Action Chama o Mutations que irá atualizar o states


  ReadDataFirebase () {
    console.log('ReadDataFirebase.......')
  },


}

const getters = {
  // Ordenacao das tarefas

  //Filtrando o objeto


  //Recebendo os valores filtrados



}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}