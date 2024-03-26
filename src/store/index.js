import Vue from "vue";
import Vuex from "vuex";
import movies from "@/store/modules/movies";
import loader from "@/store/modules/loader";
import notification from "@/store/modules/notification";
import search from "@/store/modules/search";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loader,
    notification,
    search,
  },
});

export default store;
