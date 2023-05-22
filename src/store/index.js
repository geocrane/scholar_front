import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    variant: {},
  },

  getters: {
    VARIANT: state => {
      return state.variant;
    },
  },

  mutations: {
    SET_VARIANT: (state, payload) => {
      state.variant = payload;
    },
  },

  actions: {
    GET_VARIANT: async (context, payload, session_id) => {
      let {data} = await Axios.post('http://194.87.111.115:8000/api/' + session_id + '/variants/');
      context.commit('SET_VARIANT', data);
    },


    SAVE_VARIANT: async (context, payload) => {
      // let {data} = await Axios.post('http://yourwebsite.com/api/todo');
      context.commit('SET_VARIANT', payload);
    },
  },
});