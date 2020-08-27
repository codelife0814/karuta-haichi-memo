import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import cardList from "./mixins/cardList";
import fireFunctions from "./mixins/fireFunctions";
import initialCards from "./mixins/initialCards";
import VueClipboard from "vue-clipboard2";
import VueShepherd from "vue-shepherd";
Vue.mixin(cardList);
Vue.mixin(fireFunctions);
Vue.mixin(initialCards);
Vue.use(VueClipboard);
Vue.use(VueShepherd);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbp6gY_5Jwbx5fIPzuz6YKFmnfl9y-CV0",
  authDomain: "karuta-haichi-memo.firebaseapp.com",
  databaseURL: "https://karuta-haichi-memo.firebaseio.com",
  projectId: "karuta-haichi-memo",
  storageBucket: "karuta-haichi-memo.appspot.com",
  messagingSenderId: "441870676786",
  appId: "1:441870676786:web:98689356a4cfa3eef61d2b",
  measurementId: "G-HM2K6HL6D8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.analytics();

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
