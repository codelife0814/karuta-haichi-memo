<template>
  <div id="list">
    <v-toolbar flat dense color="teal">
      <v-btn class="ma-2" text icon small dark @click.stop="drawer = !drawer">
        <v-icon dark>mdi-menu</v-icon>
      </v-btn>

      <v-tabs class="ma-2" dark fixed-tabs v-model="format">
        <v-tab>定位置</v-tab>
        <v-tab>試合</v-tab>
      </v-tabs>

      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn depressed small v-on="on">作成</v-btn>
        </template>

        <v-list>
          <v-list-item @click="createAction(0)">
            <v-list-item-icon>
              <v-icon>mdi-view-grid-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>定位置</v-list-item-content>
          </v-list-item>
          <v-list-item @click="createAction(1)">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>試合</v-list-item-content>
          </v-list-item>
          <v-dialog v-model="inputCodeDialog" max-width="290">
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon>
                  <v-icon>mdi-numeric-9-plus-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>コード入力</v-list-item-content>
              </v-list-item>
            </template>
            <v-card>
              <v-card-title class="title">コードからコピーを作成</v-card-title>
              <v-card-text>
                <v-text-field
                  placeholder="コードを入力"
                  dense
                  filled
                  rounded
                  single-line
                  color="teal"
                  hide-details="auto"
                  prepend-inner-icon="mdi-numeric-9-plus-box-outline"
                  clearable
                  maxlength="50"
                  v-model="inputCode"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal darken-1" text @click="cancelCodeAction">キャンセル</v-btn>
                <v-btn color="teal darken-1" text @click="createFromCodeAction(inputCode)">作成</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-navigation-drawer absolute temporary class="o-drawer" v-model="drawer">
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

    <v-content>
      <v-container>
        <v-alert
          v-model="copySuccess"
          type="success"
          text
          dense
          dismissible
        >コードをコピーしました：{{ copyText }}</v-alert>
        <v-alert v-model="copyError" type="error" text dense dismissible>コピーに失敗しました</v-alert>
        <v-tabs-items v-model="format">
          <ListTabItem
            v-for="(item, index) in tabList"
            :format="format"
            :formatName="item"
            :key="index"
            @copy-success-event="onCopySuccess"
            @copy-error-event="onCopyError"
          />
        </v-tabs-items>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Cards from "./../mixins/cardList";
import ListTabItem from "./../components/ListTabItem";

export default {
  components: {
    ListTabItem
  },
  data() {
    return {
      drawer: null,
      signOutDialog: false,
      inputCodeDialog: false,
      inputCode: "",
      format: 0,
      tabList: ["teiichi", "game"],
      copyText: "",
      copySuccess: false,
      copyError: false,
      isOldNotation: false
    };
  },
  created() {
    this.getOldNotation();
  },
  computed: {
    ...mapState(["userId", "oldNotation"]),
    db() {
      return firebase.firestore();
    }
  },
  mixins: [Cards],
  methods: {
    ...mapMutations([
      "deleteUserId",
      "setFormat",
      "setTitle",
      "setPlayers",
      "setPlacementCards",
      "setOldNotation"
    ]),
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.deleteUserId();
          this.$router.push("/");
        });
    },
    createAction(format) {
      this.setFormat(format);
      this.$router.push("/edit");
    },
    async createFromCodeAction(code) {
      const codeArray = code.split("_");
      const id = codeArray[0];
      const formatList = codeArray[1] === "0" ? "teiichiList" : "gameList";
      try {
        const doc = await this.db
          .collection(formatList)
          .doc(id)
          .get();
        this.inputCode = "";
        this.setFormat(this.format);
        this.setTitle(doc.data().title + " のコピー");
        this.setPlayers(doc.data().players);
        this.setPlacementCards(this.convertPlacement(doc.data().placement));
        this.$router.push("/edit");
      } catch (err) {
        alert("一致するデータがありません");
      }
    },
    cancelCodeAction() {
      this.inputCode = "";
      this.inputCodeDialog = false;
    },
    convertPlacement(placement) {
      // placementをthis.cardListの内容に変換
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
        "remaining"
      ];

      let placementCards = {};
      for (const player of players) {
        placementCards[player] = {};
        for (const position of positions) {
          if (
            (player === "other" && position !== "remaining") ||
            (player !== "other" && position === "remaining")
          ) {
            continue;
          }
          // 既存データにプロパティが存在しない場合の対応
          if (!placement[player][position]) {
            placement[player][position] = {};
          }
          placementCards[player][position] = {};
          placementCards[player][position].isSpread =
            placement[player][position].isSpread ||
            position === "centerLeftTop" ||
            position === "centerTop" ||
            position === "centerRightTop";
          placementCards[player][position].items = this.matchCards(
            placement[player][position].items || []
          );
        }
      }
      return placementCards;
    },
    matchCards(items) {
      const array = [];
      for (const item of items) {
        for (const card of this.cardList) {
          if (item.no === card.no) {
            let object = JSON.parse(JSON.stringify(card));
            object.isMarking = item.isMarking;
            array.push(object);
            break;
          }
        }
      }
      return array;
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
    },
    onCopySuccess(value) {
      this.copySuccess = true;
      this.copyError = false;
      this.copyText = value.text;
    },
    onCopyError() {
      this.copyError = true;
      this.copySuccess = false;
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
