<template>
  <v-toolbar flat dense color="teal" id="toolbar">
    <v-dialog v-model="backDialog" max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn text icon small dark v-on="on">
          <v-icon dark>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="title">
          内容が消去されますが
          <br />よろしいですか？
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" text @click="backDialog = false">いいえ</v-btn>
          <v-btn color="teal darken-1" text @click="backAction">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-text-field
      class="ma-2"
      placeholder="決まり字を検索"
      dense
      filled
      rounded
      dark
      single-line
      color="teal"
      hide-details="auto"
      prepend-inner-icon="mdi-magnify"
      clearable
      maxlength="20"
      v-model="searchText"
      @input="search(searchText)"
      @click:clear="searchReset"
    ></v-text-field>

    <v-btn class="ma-2" text icon small dark depressed @click="helpAction()">
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>

    <v-btn small depressed @click="previewAction()">確認</v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "EditHeader",
  props: {
    cards: Object,
    playerTab: Number
  },
  data() {
    return {
      isOldNotation: false,
      backDialog: false,
      searchText: ""
    };
  },
  created() {
    this.isOldNotation = this.oldNotation || false;
  },
  computed: {
    ...mapState(["format", "players", "oldNotation"])
  },
  methods: {
    ...mapMutations([
      "deleteFormat",
      "deleteId",
      "deleteTitle",
      "setPlayers",
      "deletePlayers",
      "setPlacementCards",
      "deletePlacementCards"
    ]),
    backAction() {
      this.deleteFormat();
      this.deleteId();
      this.deleteTitle();
      this.deletePlayers();
      this.deletePlacementCards();
      this.$router.push("/list");
    },
    searchReset() {
      this.searchText = "";
      this.search("");
    },
    search(text) {
      // 空白で区切って配列化
      const array = text
        .trim()
        .split(/[\x20\u3000]/)
        .filter(Boolean);
      // 各要素の先頭に＾を付け、| で区切って文字列化
      const patternText = array.map(item => "^" + item).join("|");

      const pattern = new RegExp(patternText, "i");

      const playerCards = Object.values(this.cards);

      for (const playerCard of playerCards) {
        const cardGroups = Object.values(playerCard);
        for (const cardGroup of cardGroups) {
          for (const card of cardGroup.items) {
            card.isActive =
              ((this.isOldNotation &&
                card.nameOld &&
                card.nameOld.match(pattern)) ||
                (this.isOldNotation &&
                  !card.nameOld &&
                  card.name.match(pattern)) ||
                (!this.isOldNotation && card.name.match(pattern)) ||
                card.yomi.match(pattern) ||
                card.yomiRoman1.match(pattern) ||
                (card.yomiRoman2 && card.yomiRoman2.match(pattern)) ||
                card.kimariji.match(pattern)) &&
              text !== "";
          }
        }
      }
    },
    helpAction() {
      const playerNumber = this.playerTab === 0 ? "1" : "2";
      const counterLeftTop = `#player${playerNumber}-counter-leftTop`;
      const counterCenterTop = `#player${playerNumber}-counter-centerTop`;
      const playerTab = `#player${playerNumber}Tab`;
      const playerName = `.isPlayer${playerNumber} input`;

      const tour = this.$shepherd({
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          },
          classes: "o-tourStep"
        },
        useModalOverlay: true
      });

      const stepList = [
        {
          playerTab: null,
          format: null,
          element: counterLeftTop,
          on: "bottom",
          title: "配置移動",
          text:
            "決まり字を移動させたい段の端に<br>くっつけるようにドラッグします。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: null,
          format: null,
          element: counterCenterTop,
          on: "bottom",
          title: "表示間隔の変更",
          text:
            "各段の個数表示箇所をタップすると、表示間隔を変更できます。<br>通常、決まり字同士の間は詰まって表示されますが、タップすると色が濃くなり、札間隔を広げることができます。<br>もう一度、タップすることで元に戻ります。<br>浮札（浮左、浮中、浮右）のみデフォルトで間隔が広がるように設定されています。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: 0,
          format: null,
          element: ".o-item",
          on: "bottom",
          title: "決まり字の色付け",
          text:
            "決まり字をタップすると、<br>色付け（文字が赤色に変化）できます。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: null,
          format: 1,
          element: playerTab,
          on: "bottom",
          title: "入力選手切り替え",
          text:
            "選手名のタブを切り替えると、入力する選手を切り替えることができます。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: null,
          format: 1,
          element: playerName,
          on: "bottom",
          title: "選手名入力",
          text: "選手名を入力できます。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: null,
          format: null,
          element: "#toolbar",
          on: "bottom",
          title: "検索",
          text:
            "決まり字を入力すると、決まり字が黄色く表示されます。<br>検索方法は3通りあり、「ひらがな」「ローマ字（訓令式・ヘボン式）」「数字」が使用できます。<br>検索ワードの間に全角・半角スペースを挟むことで、一度に複数検索できます。",
          buttonsText: "次へ",
          action: tour.next
        },
        {
          playerTab: null,
          format: null,
          element: "#fixedScrollButton",
          on: "top",
          title: "スクロール固定",
          text:
            "タップすると、スクロールが固定されます。<br>もう一度タップすると元に戻ります。<br>決まり字を動かす時にスクロールを防止できます。",
          buttonsText: "終了",
          action: tour.complete
        }
      ];

      for (const step of stepList) {
        const {
          playerTab,
          format,
          element,
          on,
          title,
          text,
          buttonsText,
          action
        } = step;

        if (playerTab !== null && this.playerTab !== playerTab) continue;
        if (format !== null && this.format !== format) continue;

        tour.addStep({
          attachTo: { element, on },
          title,
          text,
          buttons: [
            {
              text: buttonsText,
              action
            }
          ]
        });
      }

      tour.start();
    },
    previewAction() {
      this.setPlacementCards(this.cards);
      const players = {
        name1: this.players.name1 || "選手1",
        name2: this.players.name2 || "選手2"
      };
      this.setPlayers(players);
      this.$router.push("/preview");
    }
  }
};
</script>

<style lang="scss">
@import "~shepherd.js/dist/css/shepherd.css";

#edit header .v-input__slot {
  height: 28px !important;
  min-height: 28px !important;
}
#edit header .v-input__prepend-inner,
#edit header .v-input__append-inner {
  margin-top: 3px !important;
}

.o-tourStep {
  .shepherd-title,
  .shepherd-text,
  .shepherd-button {
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
  }
  .shepherd-title,
  .shepherd-text {
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
