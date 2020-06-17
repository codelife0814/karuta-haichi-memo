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
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
import VueShepherd from "vue-shepherd";
Vue.use(VueShepherd);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {};
if (process.env.ENV == "production") {
  // 本番環境の設定値
  firebaseConfig = {
    apiKey: "AIzaSyDbp6gY_5Jwbx5fIPzuz6YKFmnfl9y-CV0",
    authDomain: "karuta-haichi-memo.firebaseapp.com",
    databaseURL: "https://karuta-haichi-memo.firebaseio.com",
    projectId: "karuta-haichi-memo",
    storageBucket: "karuta-haichi-memo.appspot.com",
    messagingSenderId: "441870676786",
    appId: "1:441870676786:web:98689356a4cfa3eef61d2b",
    measurementId: "G-HM2K6HL6D8",
  };
} else {
  // 開発環境の設定値
  firebaseConfig = {
    apiKey: "AIzaSyDpGqY6MSImC93z0H6ZBENJ6Sj00KJw7U0",
    authDomain: "karuta-haichi-memo-dev.firebaseapp.com",
    databaseURL: "https://karuta-haichi-memo-dev.firebaseio.com",
    projectId: "karuta-haichi-memo-dev",
    storageBucket: "karuta-haichi-memo-dev.appspot.com",
    messagingSenderId: "560525403015",
    appId: "1:560525403015:web:85779d824a62276cda6922",
    measurementId: "G-7L54TL9N8J",
  };
}
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
