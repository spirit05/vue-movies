import mutations from "../mutations";

const { SHOW_TOAST_NOTIFY } = mutations;

const notificationStore = {
  state: {
    messagesPool: [],
  },
  getters: {
    messagesPool: ({ messagesPool }) => messagesPool[messagesPool.length - 1],
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, msg) {
      state.messagesPool.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_TOAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
