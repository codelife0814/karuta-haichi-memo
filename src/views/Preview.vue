<template>
  <div id="preview">
    <v-toolbar flat dense color="teal">
      <v-btn text icon small dark @click="backAction">
        <v-icon dark>mdi-chevron-left</v-icon>
      </v-btn>

      <v-text-field
        class="ma-2"
        placeholder="タイトルを入力"
        dense
        filled
        rounded
        dark
        single-line
        color="teal"
        hide-details="auto"
        maxlength="20"
        clearable
        prepend-inner-icon="mdi-format-text"
        v-model="placementTitle"
      ></v-text-field>

      <v-btn class="ma-2" text icon small dark depressed @click="imageDownload()">
        <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
      </v-btn>

      <v-btn small depressed @click="saveAction">保存</v-btn>
    </v-toolbar>

    <v-content>
      <v-container class="o-placementWrap">
        <div
          id="placement"
          :class="{ isGame: format === 1 }"
          :style="{ minWidth: placementMinWidth }"
        >
          <!-- player2 -->
          <div v-if="format === 1" class="o-playerWrap isPlayer2">
            <div class="o-playerName isPlayer2">{{ player2Name }}</div>

            <div
              v-for="(row, rowIndex) in reverseItemList"
              class="o-row"
              :key="rowIndex"
              :style="{ minWidth: placementMinWidth }"
            >
              <ItemList
                v-for="(item, itemIndex) in row"
                player="player2"
                :key="itemIndex"
                :class="item.className"
                :position="item.position"
              />
            </div>
          </div>

          <!-- player1 -->
          <div class="o-playerWrap isPlayer1">
            <div
              v-for="(row, rowIndex) in itemList"
              class="o-row"
              :key="rowIndex"
              :style="{ minWidth: placementMinWidth }"
            >
              <ItemList
                v-for="(item, itemIndex) in row"
                player="player1"
                :key="itemIndex"
                :class="item.className"
                :position="item.position"
              />
            </div>

            <div v-if="format === 1" class="o-playerName isPlayer1">{{ player1Name }}</div>
          </div>
        </div>

        <div class="o-canvas">
          <p class="o-canvas__text">{{ canvasText }}</p>
          <div class="o-canvas__img" :class="{ isDownload }">
            <img id="canvasImage" />
          </div>
          <a id="canvasLink"></a>
        </div>
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
import ItemList from "./../components/ItemList";
import html2canvas from "html2canvas";
import moment from "moment";

export default {
  components: {
    ItemList
  },
  data() {
    return {
      db: null,
      player1Name: "",
      player2Name: "",
      placementMinWidth: "",
      isDownload: false,
      canvasText: ""
    };
  },
  created() {
    this.db = firebase.firestore();
    this.placementTitle = this.title;
    this.player1Name = this.players.name1;
    this.player2Name = this.players.name2;
    this.placementMinWidth = this.getPlacementMinWidth();
  },
  computed: {
    ...mapState([
      "userId",
      "format",
      "id",
      "title",
      "players",
      "placementCards",
      "oldNotation"
    ]),
    itemList() {
      return [
        [
          { className: "isRight", position: "leftTop" },
          { className: "isFloat", position: "centerLeftTop" },
          { className: "isFloat", position: "centerTop" },
          { className: "isFloat", position: "centerRightTop" },
          { className: "isLeft", position: "rightTop" }
        ],
        [
          { className: "isRight", position: "leftMiddle" },
          { className: "isLeft", position: "rightMiddle" }
        ],
        [
          { className: "isRight", position: "leftBottom" },
          { className: "isLeft", position: "rightBottom" }
        ]
      ];
    },
    reverseItemList() {
      const reverseElementList = this.itemList.map(item =>
        item.slice().reverse()
      );
      return reverseElementList.slice().reverse();
    }
  },
  methods: {
    ...mapMutations([
      "deleteId",
      "setTitle",
      "deleteTitle",
      "deletePlayers",
      "deletePlacementCards"
    ]),
    getPlacementMinWidth() {
      const positions = {
        top: [
          "leftTop",
          "centerLeftTop",
          "centerTop",
          "centerRightTop",
          "rightTop"
        ],
        middle: ["leftMiddle", "rightMiddle"],
        bottom: ["leftBottom", "rightBottom"]
      };
      const positionsValue = Object.values(positions);
      const spaceWidth = this.format === 0 ? 14 : 24;
      const players = this.format === 0 ? ["player1"] : ["player1", "player2"];

      let cardsWidthArray = [];
      let cardsWidthObject = {};
      for (const player of players) {
        cardsWidthObject[player] = [];
        positionsValue.forEach((position, key) => {
          cardsWidthObject[player][key] = this.getCardsWidth(
            player,
            position,
            spaceWidth
          );
        });
      }
      cardsWidthArray = Object.values(cardsWidthObject).flat();

      const maxWidth = Math.max.apply(null, cardsWidthArray);
      const placementMinWidth = maxWidth + spaceWidth + "px";
      return placementMinWidth;
    },
    getCardsWidth(player, positions, spaceWidth) {
      let cardsWidth = 0;
      for (const position of positions) {
        cardsWidth +=
          this.placementCards[player][position].items.length *
          this.displayItemWidth(
            this.placementCards[player][position].isSpread,
            this.format
          );
      }
      cardsWidth += spaceWidth * (positions.length - 1);
      return cardsWidth;
    },
    displayItemWidth(isSpread, format) {
      const itemWidth = format === 0 ? 14 : 24;
      const itemSpreadWidth = format === 0 ? 22 : 32;
      return isSpread ? itemSpreadWidth : itemWidth;
    },
    async imageDownload() {
      const placement = document.querySelector("#placement");
      const canvasElement = document.querySelector("#canvasImage");
      const linkElement = document.querySelector("#canvasLink");

      const canvas = await html2canvas(placement);
      canvasElement.src = canvas.toDataURL();
      linkElement.href = canvas.toDataURL("image/png");
      linkElement.download = (this.placementTitle || "タイトルなし") + ".png";
      linkElement.click();
      this.isDownload = true;
      this.canvasText =
        "ダウンロードが失敗する場合は、下記を画像として保存できます。";
    },
    backAction() {
      this.setTitle(this.placementTitle);
      this.$router.push("/edit");
    },
    async saveAction() {
      const listName = this.format === 0 ? "teiichiList" : "gameList";
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

      let placement = {};
      for (const player of players) {
        placement[player] = {};
        for (const position of positions) {
          if (
            (player === "other" && position !== "remaining") ||
            (player !== "other" && position === "remaining")
          ) {
            continue;
          }
          placement[player][position] = {};
          placement[player][position].isSpread = this.placementCards[player][
            position
          ].isSpread;
          placement[player][position].items = this.convertPlacement(
            this.placementCards[player][position].items
          );
        }
      }

      const param = {
        date: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        title: this.placementTitle || "タイトルなし",
        players: {
          name1: this.player1Name,
          name2: this.player2Name
        },
        placement
      };

      if (this.id) {
        await this.db
          .collection("users")
          .doc(this.userId)
          .collection(listName)
          .doc(this.id)
          .set(param);
        await this.db
          .collection(listName)
          .doc(this.id)
          .set(param);
      } else {
        const ref = await this.db
          .collection("users")
          .doc(this.userId)
          .collection(listName)
          .add(param);
        await this.db
          .collection(listName)
          .doc(ref.id)
          .set(param);
      }
      this.deleteId();
      this.deleteTitle();
      this.deletePlayers();
      this.deletePlacementCards();
      this.$router.push("/list");
    },
    convertPlacement(placementCards) {
      let array = [];
      if (placementCards.length !== 0) {
        for (const item of placementCards) {
          let object = {
            no: item.no,
            isMarking: item.isMarking
          };
          array.push(object);
        }
      }
      return array;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$teal: #009688;
$redDarken1: #ef5350;
$lightBlueDarken1: #039be5;

#placement {
  min-width: 320px;
  margin: 0 auto;
}

.o-placementWrap {
  overflow: auto;
}

.o-playerWrap {
  & + .o-playerWrap {
    margin-top: 24px;
  }
}

.o-row {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  border-top: 1px solid lightgray;

  &:last-child {
    border-bottom: 1px solid lightgray;
  }
}

#placement.isGame {
  // max-width: 480px;
  // margin: 0 auto;

  .o-row {
    margin-top: 8px;
    border-top: none;

    &:last-child {
      border-bottom: none;
    }
  }
  .o-playerName {
    color: #fff;
    text-align: center;

    &.isPlayer1 {
      margin-top: 8px;
      background-color: $redDarken1;
    }
    &.isPlayer2 {
      background-color: $lightBlueDarken1;
    }
  }
}

.o-canvas {
  margin-top: 16px;

  &__text {
    color: red;
  }
  &__img {
    &.isDownload {
      padding: 8px;
      border: 2px solid $teal;
    }

    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
}
</style>

<style lang="scss">
#preview .v-input__slot {
  height: 28px !important;
  min-height: 28px !important;
}
#preview .v-input__prepend-inner,
#preview .v-input__append-inner {
  margin-top: 3px !important;
}
</style>
