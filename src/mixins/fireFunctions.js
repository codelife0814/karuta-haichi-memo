import firebase from "firebase/app";
import firebaseui from "firebaseui-ja";
import { mapMutations } from "vuex";

export default {
  computed: {
    mx_db() {
      return firebase.firestore();
    }
  },
  methods: {
    ...mapMutations(["setUserId"]),
    mx_fbAuth() {
      const root = this;
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: authResult => {
            root.setUserId(authResult.user.uid);
            root.$router.push("/list");
          },
          uiShown: () => {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // 利用規約へリンク
        tosUrl: "/terms",
        // プライバシーポリシーリンク
        privacyPolicyUrl: "/privacy"
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
    mx_fbSignOut() {
      return firebase.auth().signOut();
    },
    mx_fsAction(action, name, data = null) {
      const [collection, doc, subCollection = null, subDoc = null] = name;
      const dbDoc = this.mx_db.collection(collection).doc(doc);
      if (subDoc) {
        const dbSubDoc = dbDoc.collection(subCollection).doc(subDoc);
        return data ? dbSubDoc[action](data) : dbSubDoc[action]();
      } else if (subCollection) {
        const dbSubCollection = dbDoc.collection(subCollection);
        return data ? dbSubCollection[action](data) : dbSubCollection[action]();
      } else {
        return data ? dbDoc[action](data) : dbDoc[action]();
      }
    }
  }
}