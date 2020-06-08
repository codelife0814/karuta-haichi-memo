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
          :class="{ isGame: format === 1 }"
          id="placement"
          :style="{ minWidth: placementMinWidth }"
        >
          <!-- player2 -->
          <template v-if="format === 1">
            <div class="o-playerName isPlayer2">{{ player2Name }}</div>
            <!-- 下段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player2.rightBottom.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.rightBottom.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player2.leftBottom.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.leftBottom.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>

            <!-- 中段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player2.rightMiddle.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.rightMiddle.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player2.leftMiddle.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.leftMiddle.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>

            <!-- 上段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player2.rightTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.rightTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isFloat"
                :class="{isSpread: placementCards.player2.centerTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.centerTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player2.leftTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player2.leftTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>
          </template>

          <!-- player1 -->
          <template>
            <!-- 上段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player1.leftTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.leftTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isFloat"
                :class="{isSpread: placementCards.player1.centerTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.centerTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player1.rightTop.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.rightTop.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>

            <!-- 中段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player1.leftMiddle.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.leftMiddle.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player1.rightMiddle.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.rightMiddle.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>

            <!-- 下段 -->
            <div class="o-row" :style="{ minWidth: placementMinWidth }">
              <div
                class="o-column isLeft"
                :class="{isSpread: placementCards.player1.leftBottom.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.leftBottom.items"
                  :isOldNotation="oldNotation"
                />
              </div>
              <div
                class="o-column isRight"
                :class="{isSpread: placementCards.player1.rightBottom.isSpread}"
              >
                <ItemList
                  :items="placementCards.player1.rightBottom.items"
                  :isOldNotation="oldNotation"
                />
              </div>
            </div>
            <div v-if="format === 1" class="o-playerName isPlayer1">{{ player1Name }}</div>
          </template>
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
  created: function() {
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
    ])
  },
  methods: {
    ...mapMutations([
      "deleteId",
      "setTitle",
      "deleteTitle",
      "deletePlayers",
      "deletePlacementCards"
    ]),
    getPlacementMinWidth: function() {
      const _this = this;
      if (this.format === 0) {
        const spaceWidth = 14;
        const cards = {
          player1: {
            leftTop: _this.placementCards.player1.leftTop,
            centerTop: _this.placementCards.player1.centerTop,
            rightTop: _this.placementCards.player1.rightTop,
            leftMiddle: _this.placementCards.player1.leftMiddle,
            rightMiddle: _this.placementCards.player1.rightMiddle,
            leftBottom: _this.placementCards.player1.leftBottom,
            rightBottom: _this.placementCards.player1.rightBottom
          }
        };
        const player1TopWidth =
          cards.player1.leftTop.items.length *
            this.displayItemWidth(cards.player1.leftTop.isSpread, this.format) +
          cards.player1.centerTop.items.length *
            this.displayItemWidth(
              cards.player1.centerTop.isSpread,
              this.format
            ) +
          cards.player1.rightTop.items.length *
            this.displayItemWidth(
              cards.player1.rightTop.isSpread,
              this.format
            ) +
          spaceWidth * 2;
        const player1MiddleWidth =
          cards.player1.leftMiddle.items.length *
            this.displayItemWidth(
              cards.player1.leftMiddle.isSpread,
              this.format
            ) +
          cards.player1.rightMiddle.items.length *
            this.displayItemWidth(
              cards.player1.rightMiddle.isSpread,
              this.format
            ) +
          spaceWidth;
        const player1BottomWidth =
          cards.player1.leftBottom.items.length *
            this.displayItemWidth(
              cards.player1.leftBottom.isSpread,
              this.format
            ) +
          cards.player1.rightBottom.items.length *
            this.displayItemWidth(
              cards.player1.rightBottom.isSpread,
              this.format
            ) +
          spaceWidth;
        const maxWidth = Math.max(
          player1TopWidth,
          player1MiddleWidth,
          player1BottomWidth
        );
        const placementMinWidth = maxWidth + spaceWidth + "px";
        return placementMinWidth;
      } else {
        const spaceWidth = 24;
        const cards = {
          player1: {
            leftTop: _this.placementCards.player1.leftTop,
            centerTop: _this.placementCards.player1.centerTop,
            rightTop: _this.placementCards.player1.rightTop,
            leftMiddle: _this.placementCards.player1.leftMiddle,
            rightMiddle: _this.placementCards.player1.rightMiddle,
            leftBottom: _this.placementCards.player1.leftBottom,
            rightBottom: _this.placementCards.player1.rightBottom
          },
          player2: {
            leftTop: _this.placementCards.player2.leftTop,
            centerTop: _this.placementCards.player2.centerTop,
            rightTop: _this.placementCards.player2.rightTop,
            leftMiddle: _this.placementCards.player2.leftMiddle,
            rightMiddle: _this.placementCards.player2.rightMiddle,
            leftBottom: _this.placementCards.player2.leftBottom,
            rightBottom: _this.placementCards.player2.rightBottom
          }
        };
        const player1TopWidth =
          cards.player1.leftTop.items.length *
            this.displayItemWidth(cards.player1.leftTop.isSpread) +
          cards.player1.centerTop.items.length *
            this.displayItemWidth(cards.player1.centerTop.isSpread) +
          cards.player1.rightTop.items.length *
            this.displayItemWidth(cards.player1.rightTop.isSpread) +
          spaceWidth * 2;
        const player1MiddleWidth =
          cards.player1.leftMiddle.items.length *
            this.displayItemWidth(cards.player1.leftMiddle.isSpread) +
          cards.player1.rightMiddle.items.length *
            this.displayItemWidth(cards.player1.rightMiddle.isSpread) +
          spaceWidth;
        const player1BottomWidth =
          cards.player1.leftBottom.items.length *
            this.displayItemWidth(cards.player1.leftBottom.isSpread) +
          cards.player1.rightBottom.items.length *
            this.displayItemWidth(cards.player1.rightBottom.isSpread) +
          spaceWidth;
        const player2TopWidth =
          cards.player2.leftTop.items.length *
            this.displayItemWidth(cards.player2.leftTop.isSpread) +
          cards.player2.centerTop.items.length *
            this.displayItemWidth(cards.player2.centerTop.isSpread) +
          cards.player2.rightTop.items.length *
            this.displayItemWidth(cards.player2.rightTop.isSpread) +
          spaceWidth * 2;
        const player2MiddleWidth =
          cards.player2.leftMiddle.items.length *
            this.displayItemWidth(cards.player2.leftMiddle.isSpread) +
          cards.player2.rightMiddle.items.length *
            this.displayItemWidth(cards.player2.rightMiddle.isSpread) +
          spaceWidth;
        const player2BottomWidth =
          cards.player2.leftBottom.items.length *
            this.displayItemWidth(cards.player2.leftBottom.isSpread) +
          cards.player2.rightBottom.items.length *
            this.displayItemWidth(cards.player2.rightBottom.isSpread) +
          spaceWidth;
        const maxWidth = Math.max(
          player1TopWidth,
          player1MiddleWidth,
          player1BottomWidth,
          player2TopWidth,
          player2MiddleWidth,
          player2BottomWidth
        );
        const placementMinWidth = maxWidth + spaceWidth + "px";
        return placementMinWidth;
      }
    },
    displayItemWidth: function(isSpread, format) {
      const itemWidth = format === 0 ? 14 : 24;
      const itemSpreadWidth = format === 0 ? 22 : 32;
      return isSpread ? itemSpreadWidth : itemWidth;
    },
    imageDownload: function() {
      const _this = this;
      const placement = document.querySelector("#placement");
      const canvasElement = document.querySelector("#canvasImage");
      const linkElement = document.querySelector("#canvasLink");

      html2canvas(placement).then(canvas => {
        canvasElement.src = canvas.toDataURL();
        linkElement.href = canvas.toDataURL("image/png");
        linkElement.download = (this.placementTitle || "タイトルなし") + ".png";
        linkElement.click();
        _this.isDownload = true;
        _this.canvasText =
          "ダウンロードが失敗する場合は、下記を画像として保存できます。";
      });
    },
    backAction: function() {
      this.setTitle(this.placementTitle);
      this.$router.push("/edit");
    },
    saveAction: function() {
      const _this = this;
      const placement = {
        player1: {
          centerTop: {
            isSpread: _this.placementCards.player1.centerTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.centerTop.items
            )
          },
          leftTop: {
            isSpread: _this.placementCards.player1.leftTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.leftTop.items
            )
          },
          leftMiddle: {
            isSpread: _this.placementCards.player1.leftMiddle.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.leftMiddle.items
            )
          },
          leftBottom: {
            isSpread: _this.placementCards.player1.leftBottom.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.leftBottom.items
            )
          },
          rightTop: {
            isSpread: _this.placementCards.player1.rightTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.rightTop.items
            )
          },
          rightMiddle: {
            isSpread: _this.placementCards.player1.rightMiddle.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.rightMiddle.items
            )
          },
          rightBottom: {
            isSpread: _this.placementCards.player1.rightBottom.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player1.rightBottom.items
            )
          }
        },
        player2: {
          centerTop: {
            isSpread: _this.placementCards.player2.centerTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.centerTop.items
            )
          },
          leftTop: {
            isSpread: _this.placementCards.player2.leftTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.leftTop.items
            )
          },
          leftMiddle: {
            isSpread: _this.placementCards.player2.leftMiddle.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.leftMiddle.items
            )
          },
          leftBottom: {
            isSpread: _this.placementCards.player2.leftBottom.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.leftBottom.items
            )
          },
          rightTop: {
            isSpread: _this.placementCards.player2.rightTop.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.rightTop.items
            )
          },
          rightMiddle: {
            isSpread: _this.placementCards.player2.rightMiddle.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.rightMiddle.items
            )
          },
          rightBottom: {
            isSpread: _this.placementCards.player2.rightBottom.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.player2.rightBottom.items
            )
          }
        },
        other: {
          remaining: {
            isSpread: _this.placementCards.other.remaining.isSpread,
            items: _this.convertPlacement(
              _this.placementCards.other.remaining.items
            )
          }
        }
      };

      const listName = this.format === 0 ? "teiichiList" : "gameList";

      if (this.id) {
        _this.db
          .collection("users")
          .doc(_this.userId)
          .collection(listName)
          .doc(_this.id)
          .set({
            date: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
            title: _this.placementTitle || "タイトルなし",
            players: {
              name1: _this.player1Name,
              name2: _this.player2Name
            },
            placement
          })
          .then(() => {
            _this.db
              .collection(listName)
              .doc(_this.id)
              .set({
                date: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
                title: _this.placementTitle || "タイトルなし",
                players: {
                  name1: _this.player1Name,
                  name2: _this.player2Name
                },
                placement
              })
              .then(() => {
                _this.deleteId();
                _this.deleteTitle();
                _this.deletePlayers();
                _this.deletePlacementCards();
                _this.$router.push("/list");
              });
          });
      } else {
        _this.db
          .collection("users")
          .doc(_this.userId)
          .collection(listName)
          .add({
            date: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
            title: _this.placementTitle || "タイトルなし",
            players: {
              name1: _this.player1Name,
              name2: _this.player2Name
            },
            placement
          })
          .then(ref => {
            _this.db
              .collection(listName)
              .doc(ref.id)
              .set({
                date: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
                title: _this.placementTitle || "タイトルなし",
                players: {
                  name1: _this.player1Name,
                  name2: _this.player2Name
                },
                placement
              })
              .then(() => {
                _this.deleteId();
                _this.deleteTitle();
                _this.deletePlayers();
                _this.deletePlacementCards();
                _this.$router.push("/list");
              });
          });
      }
    },
    convertPlacement: function(placementCards) {
      let array = [];
      for (const item of placementCards) {
        let object = {
          no: item.no,
          isMarking: item.isMarking
        };
        array.push(object);
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

.o-row {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  border-top: 1px solid lightgray;

  &:last-child {
    border-bottom: 1px solid lightgray;
  }
}

.o-column {
  display: flex;

  &.isRight {
    flex-direction: row-reverse;
  }
}

#placement.isGame {
  // max-width: 480px;
  // margin: 0 auto;

  .o-row {
    margin-top: 8px;
    border-top: none;

    &:nth-child(5) {
      margin-top: 24px;
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
