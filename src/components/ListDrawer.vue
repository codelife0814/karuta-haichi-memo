<template>
  <v-navigation-drawer absolute temporary class="o-drawer" v-model="drawerValue">
    <v-list-item>
      <v-list-item-avatar class="o-drawer__img">
        <img src="./../assets/logo.png" alt="配置めも" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="o-drawer__title">競技かるた配置めも</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-group prepend-icon="mdi-cog" value="true" color="teal" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>設定</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title>
            <v-checkbox color="teal" label="旧仮名遣い表記" v-model="isOldNotation"></v-checkbox>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <v-list-item to="/guide" target="_blank">
      <v-list-item-icon>
        <v-icon>mdi-tools</v-icon>
      </v-list-item-icon>
      <v-list-item-content>機能一覧</v-list-item-content>
    </v-list-item>
    <v-dialog v-model="signOutDialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-list-item v-on="on">
          <v-list-item-icon>
            <v-icon style="transform: scale(-1, 1);">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>ログアウト</v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title class="title">ログアウトしますか？</v-card-title>
        <v-card-text>
          <div class="o-logoutNotice">
            ※ゲストでログインしている場合は
            <br />作成したデータが消去されます
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" text @click="signOutDialog = false">いいえ</v-btn>
          <v-btn color="teal darken-1" text @click="signOut">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase/app";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "ListDrawer",
  data() {
    return {
      signOutDialog: false,
      isOldNotation: false
    };
  },
  created() {
    this.getOldNotation();
  },
  computed: {
    ...mapState(["userId", "listDrawer"]),
    db() {
      return firebase.firestore();
    },
    drawerValue: {
      get() {
        return this.listDrawer;
      },
      set(value) {
        this.setListDrawer(value);
      }
    }
  },
  methods: {
    ...mapMutations([
      "deleteUserId",
      "setOldNotation",
      "setListDrawer",
      "deleteListDrawer"
    ]),
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.deleteUserId();
          this.deleteListDrawer();
          this.$router.push("/");
        });
    },
    async getOldNotation() {
      try {
        const doc = await this.db
          .collection("users")
          .doc(this.userId)
          .get();
        this.isOldNotation = doc.data() ? doc.data().oldNotation : false;
      } catch (err) {
        alert("データ取得に失敗しました");
      }
    }
  },
  watch: {
    async drawer() {
      if (!this.drawer) {
        try {
          await this.db
            .collection("users")
            .doc(this.userId)
            .set({ oldNotation: this.isOldNotation });
          this.setOldNotation(this.isOldNotation);
        } catch (err) {
          alert("設定の保存に失敗しました");
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
$teal: #009688;

#list .o-drawer {
  &__img {
    border-radius: 0;
  }
  &__title {
    font-weight: normal;
    font-family: "hannari" !important;
  }
}

.o-logoutNotice {
  padding-left: 1em;
  text-indent: -1em;
}
</style>

<style lang="scss">
#list .v-input--selection-controls__ripple {
  display: none;
}
</style>
