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
  "centerLeftTop",
  "centerTop",
  "centerRightTop",
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
    initialPlacementCards[player][position].isSpread =
      position === "centerLeftTop" ||
      position === "centerTop" ||
      position === "centerRightTop";
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
    playerTab: 0,
    placementCards: Vue.util.extend({}, initialPlacementCards),
    oldNotation: false,
    isListDrawer: false,
    isDownload: false,
    searchText: ""
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
    setPlayerTab(state, payload) {
      state.playerTab = payload;
    },
    deletePlayerTab(state) {
      state.playerTab = 0;
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
    setIsListDrawer(state, payload) {
      state.isListDrawer = payload;
    },
    deleteIsListDrawer(state) {
      state.isListDrawer = false;
    },
    setIsDownload(state, payload) {
      state.isDownload = payload;
    },
    deleteIsDownload(state) {
      state.isDownload = false;
    },
    setSearchText(state, payload) {
      state.searchText = payload;
    },
    deleteSearchText(state) {
      state.searchText = "";
    }
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
