import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const initialPlayers = {
  name1: "",
  name2: "",
};

const players = ["player1", "player2", "other"];
const positions = [
  "leftTop",
  "centerTop",
  "rightTop",
  "leftMiddle",
  "rightMiddle",
  "leftBottom",
  "rightBottom",
  "remaining",
];
let initialPlacementCards = {};
for (const player of players) {
  initialPlacementCards[player] = {};
  for (const position of positions) {
    if (
      (player === "other" && position !== "remaining") ||
      (player !== "other" && position === "remaining")
    ) {
      continue;
    }
    initialPlacementCards[player][position] = {};
    initialPlacementCards[player][position].isSpread = position === "centerTop";
    initialPlacementCards[player][position].items = [];
  }
}

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
