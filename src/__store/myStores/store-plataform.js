import Vue from 'vue'
import { Platform } from 'quasar'
import { Screen } from 'quasar'

const state = {
  mobile: false,
  desktop: false,
}

const mutations = {
  SET_TIPO_PLATAFORM_MOBILE (state, value) {
    state.mobile = value
  },

  SET_TIPO_PLATAFORM_DESKTOP (state, value) {
    state.desktop = value
  }

}

const actions = {
  alterTipoPlataform ({ commit, ssrContext }) {
    const tipoPlataforma = process.env.SERVER
      ? Platform.parseSSR(ssrContext)
      : Platform

    if (tipoPlataforma.is.mobile) {
      commit('SET_TIPO_PLATAFORM_MOBILE', true)
    } else {
      commit('SET_TIPO_PLATAFORM_DESKTOP', true)
    }

  },


}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}