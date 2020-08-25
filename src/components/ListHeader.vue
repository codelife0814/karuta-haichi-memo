<template>
  <v-toolbar flat dense color="teal">
    <v-btn class="ma-2" text icon small dark @click.stop="drawerValue = !drawerValue">
      <v-icon dark>mdi-menu</v-icon>
    </v-btn>

    <v-tabs class="ma-2" dark fixed-tabs v-model="formatValue">
      <v-tab v-for="(formatItem, index) in formatList" :key="index">{{ formatItem.name }}</v-tab>
    </v-tabs>

    <v-menu bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn depressed small v-on="on">作成</v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(formatItem, index) in formatList"
          :key="index"
          @click="createAction(index)"
        >
          <v-list-item-icon>
            <v-icon>{{ formatItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ formatItem.name }}</v-list-item-content>
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
</template>

<script>
import firebase from "firebase/app";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Cards from "./../mixins/cardList";

export default {
  name: "ListHeader",
  data() {
    return {
      formatList: [
        {
          name: "定位置",
          icon: "mdi-view-grid-plus-outline"
        },
        {
          name: "試合",
          icon: "mdi-account-multiple-plus"
        }
      ],
      inputCodeDialog: false,
      inputCode: ""
    };
  },
  created() {
    this.setFormat(0);
  },
  computed: {
    ...mapState(["format", "listDrawer"]),
    db() {
      return firebase.firestore();
    },
    formatValue: {
      get() {
        return this.format;
      },
      set(value) {
        this.setFormat(value);
      }
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
  mixins: [Cards],
  methods: {
    ...mapMutations([
      "setFormat",
      "setTitle",
      "setPlayers",
      "setPlacementCards",
      "setListDrawer"
    ]),
    createAction(format) {
      this.setFormat(format);
      this.$router.push("/edit");
    },
    cancelCodeAction() {
      this.inputCode = "";
      this.inputCodeDialog = false;
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
    }
  }
};
</script>
