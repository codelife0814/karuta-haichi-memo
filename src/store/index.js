import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const initialPlayers = {
  name1: "",
  name2: "",
};

const initialPlacementCards = {
  player1: {
    centerTop: {
      isSpread: true,
      items: [],
    },
    leftTop: {
      isSpread: false,
      items: [],
    },
    leftMiddle: {
      isSpread: false,
      items: [],
    },
    leftBottom: {
      isSpread: false,
      items: [],
    },
    rightTop: {
      isSpread: false,
      items: [],
    },
    rightMiddle: {
      isSpread: false,
      items: [],
    },
    rightBottom: {
      isSpread: false,
      items: [],
    },
  },
  player2: {
    centerTop: {
      isSpread: true,
      items: [],
    },
    leftTop: {
      isSpread: false,
      items: [],
    },
    leftMiddle: {
      isSpread: false,
      items: [],
    },
    leftBottom: {
      isSpread: false,
      items: [],
    },
    rightTop: {
      isSpread: false,
      items: [],
    },
    rightMiddle: {
      isSpread: false,
      items: [],
    },
    rightBottom: {
      isSpread: false,
      items: [],
    },
  },
  other: {
    remaining: {
      isSpread: false,
      items: [],
    },
  },
};

export default new Vuex.Store({
  state: {
    userId: "",
    format: "",
    id: "",
    title: "",
    players: Vue.util.extend({}, initialPlayers),
    placementCards: Vue.util.extend({}, initialPlacementCards),
    oldNotation: false,
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    deleteUserId(state) {
      state.userId = "";
    },
    setFormat(state, payload) {
      state.format = payload;
    },
    deleteFormat(state) {
      state.format = "";
    },
    setId(state, payload) {
      state.id = payload;
    },
    deleteId(state) {
      state.id = "";
    },
    setTitle(state, payload) {
      state.title = payload;
    },
    deleteTitle(state) {
      state.title = "";
    },
    setPlayers(state, payload) {
      state.players = payload;
    },
    deletePlayers(state) {
      state.players = Vue.util.extend({}, initialPlayers);
    },
    setPlacementCards(state, payload) {
      state.placementCards = payload;
    },
    deletePlacementCards(state) {
      state.placementCards = Vue.util.extend({}, initialPlacementCards);
    },
    setOldNotation(state, payload) {
      state.oldNotation = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: "karutaHaichiMemo",
    }),
  ],
});
