import mutations from "../mutations";

const { SEARCH_TITLE, TOGGLE_SEARCH } = mutations;

const searchStore = {
  state: {
    isSearch: false,
    searchTitle: "",
  },
  getters: {
    isSearch: ({ isSearch }) => isSearch,
    searchTitle: ({ searchTitle }) => searchTitle,
  },
  mutations: {
    [SEARCH_TITLE](state, value) {
      state.searchTitle = value;
    },
    [TOGGLE_SEARCH](state, value) {
      state.isSearch = value;
    },
  },
  actions: {
    toggleSearch({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
    changeSearchTitle({ commit }, value) {
      commit(SEARCH_TITLE, value);
    },
  },
};

export default searchStore;
