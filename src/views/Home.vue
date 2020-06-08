<template>
  <div id="home">
    <Header />

    <v-content>
      <v-container>
        <v-card flat class="mt-2">
          <div class="text-center">
            <div class="o-logo">
              <img src="./../assets/logo.png" alt="競技かるた配置めも" />
            </div>
            <v-card-text class="subtitle-1">
              競技かるたの定位置や試合中の配置を
              <br />手軽に記録できるスマホ向けアプリ
            </v-card-text>
            <v-btn color="warning" @click="$vuetify.goTo('#login')">
              <v-icon left small>mdi-login</v-icon>ログイン
            </v-btn>
          </div>
        </v-card>

        <v-divider class="mt-6 mb-6"></v-divider>

        <v-card flat>
          <template v-for="item in featureList">
            <v-card-title :key="item.title" v-html="item.title"></v-card-title>
            <v-card-text :key="item.text" v-html="item.text"></v-card-text>
          </template>
          <div class="text-center">
            <v-btn color="primary" to="/guide" target="_blank">
              <v-icon left small>mdi-tools</v-icon>機能一覧
            </v-btn>
          </div>
        </v-card>

        <v-divider class="mt-6 mb-6"></v-divider>

        <v-card flat id="login" class="mb-8 pb-8">
          <div class="text-center">
            <p>ログインしてお使いください</p>
          </div>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
        </v-card>
      </v-container>
    </v-content>

    <Footer />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import firebaseui from "firebaseui-ja";
import "firebaseui-ja/dist/firebaseui.css";
import { mapMutations } from "vuex";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      featureList: [
        {
          title: "定位置／試合中の配置を記録",
          text: "ドラッグ&ドロップで手軽に配置を記録できます。"
        },
        {
          title: "配置の画像保存",
          text: "作成した配置を端末に画像保存できます。"
        },
        {
          title: "配置コードを使った複製",
          text:
            "他のユーザーが作成した配置を<br>配置コードで簡単に複製できます。"
        },
        {
          title: "その他の機能",
          text: "機能一覧よりご確認ください。"
        }
      ]
    };
  },
  mounted() {
    const _this = this;
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          _this.setUserId(authResult.user.uid);
          _this.$router.push("/list");
        },
        uiShown: function() {
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
  methods: {
    ...mapMutations(["setUserId"])
  }
};
</script>

<style lang="scss">
#firebaseui-auth-container ul {
  padding-left: 0;
}
.o-logo {
  width: 200px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
}
</style>
