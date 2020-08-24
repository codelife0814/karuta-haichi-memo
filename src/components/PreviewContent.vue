<template>
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

      <div v-show="isDownload" class="o-canvas">
        <p class="o-canvas__text">ダウンロードが失敗する場合は、下記を画像として保存できます。</p>
        <div class="o-canvas__img">
          <img id="canvasImage" />
        </div>
        <a id="canvasLink"></a>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from "vuex";
import ItemList from "./../components/ItemList";

export default {
  name: "PreviewContent",
  components: {
    ItemList
  },
  props: {
    isDownload: Boolean
  },
  data() {
    return {
      placementMinWidth: ""
    };
  },
  created() {
    this.placementMinWidth = this.getPlacementMinWidth();
  },
  computed: {
    ...mapState(["format", "players", "placementCards"]),
    player1Name() {
      return this.players.name1;
    },
    player2Name() {
      return this.players.name2;
    },
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
    }
  }
};
</script>

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
    padding: 8px;
    border: 2px solid $teal;

    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
}
</style>
