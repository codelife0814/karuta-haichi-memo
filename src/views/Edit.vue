<template>
  <div id="edit">
    <v-dialog v-model="screenDialog" max-width="290">
      <v-card>
        <v-card-title class="title">画面を横向けにして使うことをおすすめします</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" text @click="screenAction">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

    <v-content>
      <v-container>
        <v-tabs v-if="format === 1" color="white" fixed-tabs v-model="playerTab">
          <v-tab
            style="text-transform: none"
            class="o-playerTab isPlayer1"
            id="playerTabPlayer1"
          >{{ player1Name || "選手1" }}</v-tab>
          <v-tab style="text-transform: none" class="o-playerTab isPlayer2">
            {{
            player2Name || "選手2"
            }}
          </v-tab>
        </v-tabs>
        <div id="placement" :class="{ isGame: format === 1 }">
          <v-tabs-items v-model="playerTab" :touchless="true">
            <!-- player1 -->
            <v-tab-item class="o-playerTabItem isPlayer1">
              <v-text-field
                v-if="format === 1"
                placeholder="選手1の名前を入力"
                dense
                filled
                single-line
                color="red darken-3"
                maxlength="15"
                clearable
                hide-details="auto"
                prepend-inner-icon="mdi-account"
                id="player1Name"
                v-model="player1Name"
              ></v-text-field>

              <!-- 上段 -->
              <div class="o-row">
                <div class="o-column isLeft" :class="{ isSpread: cards.player1.leftTop.isSpread }">
                  <ItemCount
                    name="左上"
                    player="player1"
                    position="leftTop"
                    :length="cards.player1.leftTop.items.length"
                    id="counter-leftTop"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.leftTop.items"
                    :items="cards.player1.leftTop.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="leftTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player1.centerLeftTop.isSpread }"
                >
                  <ItemCount
                    name="浮左"
                    player="player1"
                    position="centerLeftTop"
                    :length="cards.player1.centerLeftTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.centerLeftTop.items"
                    :items="cards.player1.centerLeftTop.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="centerLeftTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player1.centerTop.isSpread }"
                >
                  <ItemCount
                    name="浮中"
                    player="player1"
                    position="centerTop"
                    :length="cards.player1.centerTop.items.length"
                    id="counter-centerTop"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.centerTop.items"
                    :items="cards.player1.centerTop.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="centerTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player1.centerRightTop.isSpread }"
                >
                  <ItemCount
                    name="浮右"
                    player="player1"
                    position="centerRightTop"
                    :length="cards.player1.centerRightTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.centerRightTop.items"
                    :items="cards.player1.centerRightTop.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="centerRightTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player1.rightTop.isSpread }"
                >
                  <ItemCount
                    name="右上"
                    player="player1"
                    position="rightTop"
                    :length="cards.player1.rightTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.rightTop.items"
                    :items="cards.player1.rightTop.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="rightTop"
                    @update="updateCards"
                  />
                </div>
              </div>

              <!-- 中段 -->
              <div class="o-row">
                <div
                  class="o-column isLeft"
                  :class="{ isSpread: cards.player1.leftMiddle.isSpread }"
                >
                  <ItemCount
                    name="左中"
                    player="player1"
                    position="leftMiddle"
                    :length="cards.player1.leftMiddle.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.leftMiddle.items"
                    :items="cards.player1.leftMiddle.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="leftMiddle"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player1.rightMiddle.isSpread }"
                >
                  <ItemCount
                    name="右中"
                    player="player1"
                    position="rightMiddle"
                    :length="cards.player1.rightMiddle.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.rightMiddle.items"
                    :items="cards.player1.rightMiddle.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="rightMiddle"
                    @update="updateCards"
                  />
                </div>
              </div>

              <!-- 下段 -->
              <div class="o-row">
                <div
                  class="o-column isLeft"
                  :class="{ isSpread: cards.player1.leftBottom.isSpread }"
                >
                  <ItemCount
                    name="左下"
                    player="player1"
                    position="leftBottom"
                    :length="cards.player1.leftBottom.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.leftBottom.items"
                    :items="cards.player1.leftBottom.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="leftBottom"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player1.rightBottom.isSpread }"
                >
                  <ItemCount
                    name="右下"
                    player="player1"
                    position="rightBottom"
                    :length="cards.player1.rightBottom.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player1.rightBottom.items"
                    :items="cards.player1.rightBottom.items"
                    :isOldNotation="isOldNotation"
                    player="player1"
                    position="rightBottom"
                    @update="updateCards"
                  />
                </div>
              </div>
            </v-tab-item>

            <!-- player2 -->
            <v-tab-item class="o-playerTabItem isPlayer2">
              <v-text-field
                v-if="format === 1"
                placeholder="選手2の名前を入力"
                dense
                filled
                single-line
                color="light-blue darken-4"
                maxlength="15"
                clearable
                hide-details="auto"
                prepend-inner-icon="mdi-account"
                v-model="player2Name"
              ></v-text-field>

              <!-- 上段 -->
              <div class="o-row">
                <div class="o-column isLeft" :class="{ isSpread: cards.player2.leftTop.isSpread }">
                  <ItemCount
                    name="左上"
                    player="player2"
                    position="leftTop"
                    :length="cards.player2.leftTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.leftTop.items"
                    :items="cards.player2.leftTop.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="leftTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player2.centerLeftTop.isSpread }"
                >
                  <ItemCount
                    name="浮左"
                    player="player2"
                    position="centerLeftTop"
                    :length="cards.player2.centerLeftTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.centerLeftTop.items"
                    :items="cards.player2.centerLeftTop.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="centerLeftTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player2.centerTop.isSpread }"
                >
                  <ItemCount
                    name="浮中"
                    player="player2"
                    position="centerTop"
                    :length="cards.player2.centerTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.centerTop.items"
                    :items="cards.player2.centerTop.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="centerTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isFloat"
                  :class="{ isSpread: cards.player2.centerRightTop.isSpread }"
                >
                  <ItemCount
                    name="浮右"
                    player="player2"
                    position="centerRightTop"
                    :length="cards.player2.centerRightTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.centerRightTop.items"
                    :items="cards.player2.centerRightTop.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="centerRightTop"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player2.rightTop.isSpread }"
                >
                  <ItemCount
                    name="右上"
                    player="player2"
                    position="rightTop"
                    :length="cards.player2.rightTop.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.rightTop.items"
                    :items="cards.player2.rightTop.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="rightTop"
                    @update="updateCards"
                  />
                </div>
              </div>

              <!-- 中段 -->
              <div class="o-row">
                <div
                  class="o-column isLeft"
                  :class="{ isSpread: cards.player2.leftMiddle.isSpread }"
                >
                  <ItemCount
                    name="左中"
                    player="player2"
                    position="leftMiddle"
                    :length="cards.player2.leftMiddle.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.leftMiddle.items"
                    :items="cards.player2.leftMiddle.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="leftMiddle"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player2.rightMiddle.isSpread }"
                >
                  <ItemCount
                    name="右中"
                    player="player2"
                    position="rightMiddle"
                    :length="cards.player2.rightMiddle.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.rightMiddle.items"
                    :items="cards.player2.rightMiddle.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="rightMiddle"
                    @update="updateCards"
                  />
                </div>
              </div>

              <!-- 下段 -->
              <div class="o-row">
                <div
                  class="o-column isLeft"
                  :class="{ isSpread: cards.player2.leftBottom.isSpread }"
                >
                  <ItemCount
                    name="左下"
                    player="player2"
                    position="leftBottom"
                    :length="cards.player2.leftBottom.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.leftBottom.items"
                    :items="cards.player2.leftBottom.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="leftBottom"
                    @update="updateCards"
                  />
                </div>
                <div
                  class="o-column isRight"
                  :class="{ isSpread: cards.player2.rightBottom.isSpread }"
                >
                  <ItemCount
                    name="右下"
                    player="player2"
                    position="rightBottom"
                    :length="cards.player2.rightBottom.items.length"
                    @spread="spreadCards"
                  />
                  <ItemListDraggable
                    v-model="cards.player2.rightBottom.items"
                    :items="cards.player2.rightBottom.items"
                    :isOldNotation="isOldNotation"
                    player="player2"
                    position="rightBottom"
                    @update="updateCards"
                  />
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>

          <!-- 余り -->
          <div class="o-row">
            <div class="o-column isLeft">
              <ItemCount
                name="余り"
                player="other"
                position="remaining"
                :length="cards.other.remaining.items.length"
                class="isRemaining"
              />
              <ItemListDraggable
                v-model="cards.other.remaining.items"
                :items="cards.other.remaining.items"
                :isOldNotation="isOldNotation"
                player="other"
                position="remaining"
                @update="updateCards"
              />
            </div>
          </div>
        </div>

        <v-btn
          small
          fixed
          right
          bottom
          dark
          color="teal"
          class="o-fixedButton"
          :class="{ isFixedScroll }"
          id="fixedScrollButton"
          @click="fixedScroll"
        >{{ fixedScrollText }}</v-btn>

        <!-- <v-btn fab fixed right bottom dark color="teal" @click.stop="bottomMenu = !bottomMenu">
          <v-icon dark>mdi-menu</v-icon>
        </v-btn>-->
      </v-container>
    </v-content>

    <!-- <v-navigation-drawer v-model="bottomMenu" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item>
          <v-switch color="teal" v-model="isFixedScroll" label="スクロール固定"></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Cards from "./../mixins/cardList";
import initialCards from "./../mixins/initialCards";
import ItemCount from "./../components/ItemCount";
import ItemListDraggable from "./../components/ItemListDraggable";

export default {
  name: "Edit",
  components: {
    ItemCount,
    ItemListDraggable
  },
  data() {
    return {
      screenDialog: false,
      backDialog: false,
      cards: {},
      playerTab: 0,
      player1Name: "",
      player2Name: "",
      searchText: "",
      bottomMenu: false,
      isFixedScroll: false,
      fixedScrollText: "スクロール固定"
    };
  },
  created() {
    const _this = this;
    this.player1Name = this.players.name1 || "";
    this.player2Name = this.players.name2 || "";
    this.isOldNotation = this.oldNotation || false;

    if (
      JSON.stringify(this.initialCards) === JSON.stringify(this.placementCards)
    ) {
      let cardList = JSON.parse(JSON.stringify(_this.cardList));
      cardList.sort((a, b) => (a.no > b.no ? 1 : -1));
      _this.cards = _this.initialCards;
      _this.cards.other.remaining.items = cardList;
    } else {
      _this.cards = _this.placementCards;
    }

    // 定位置の場合は横画面で表示してもらうように案内ダイアログ表示
    if (
      this.format === 0 &&
      navigator.userAgent.match(/iPhone|Android.+Mobile/) &&
      !(window.orientation === -90 || window.orientation === 90) &&
      !window.sessionStorage.getItem(["orientation"])
    ) {
      _this.screenDialog = true;
    }
  },
  computed: {
    ...mapState(["format", "id", "players", "placementCards", "oldNotation"])
  },
  mixins: [Cards, initialCards],
  methods: {
    ...mapMutations([
      "setFormat",
      "deleteFormat",
      "deleteId",
      "deleteTitle",
      "setPlayers",
      "deletePlayers",
      "setPlacementCards",
      "deletePlacementCards"
    ]),
    screenAction: function() {
      window.sessionStorage.setItem(["orientation"], [true]);
      this.screenDialog = false;
    },
    helpAction() {
      const tour = this.$shepherd({
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          },
          classes: "o-tourStep"
        },
        useModalOverlay: true
      });

      tour.addStep({
        attachTo: { element: "#counter-leftTop", on: "bottom" },
        title: "配置移動",
        text:
          "決まり字を移動させたい段の端に<br>くっつけるようにドラッグします。",
        buttons: [
          {
            text: "次へ",
            action: tour.next
          }
        ]
      });

      tour.addStep({
        attachTo: { element: "#counter-centerTop", on: "bottom" },
        title: "表示間隔の変更",
        text:
          "各段の個数表示箇所をタップすると、表示間隔を変更できます。<br />通常、決まり字同士の間は詰まって表示されますが、タップすると色が濃くなり、札間隔を広げることができます。<br />もう一度、タップすることで元に戻ります。<br />浮札（浮左、浮中、浮右）のみデフォルトで間隔が広がるように設定されています。",
        buttons: [
          {
            text: "次へ",
            action: tour.next
          }
        ]
      });

      tour.addStep({
        attachTo: { element: ".o-item", on: "bottom" },
        title: "決まり字の色付け",
        text:
          "決まり字をタップすると、<br>色付け（文字が赤色に変化）できます。",
        buttons: [
          {
            text: "次へ",
            action: tour.next
          }
        ]
      });

      if (this.format === 1) {
        tour.addStep({
          attachTo: { element: "#playerTabPlayer1", on: "bottom" },
          title: "入力選手切り替え",
          text:
            "選手名のタブを切り替えると、入力する選手を切り替えることができます。",
          buttons: [
            {
              text: "次へ",
              action: tour.next
            }
          ]
        });

        tour.addStep({
          attachTo: { element: "#player1Name", on: "bottom" },
          title: "選手名入力",
          text: "選手名を入力できます。",
          buttons: [
            {
              text: "次へ",
              action: tour.next
            }
          ]
        });
      }

      tour.addStep({
        attachTo: { element: "#toolbar", on: "bottom" },
        title: "検索",
        text:
          "決まり字を入力すると、決まり字が黄色く表示されます。<br />検索方法は3通りあり、「ひらがな」「ローマ字（訓令式・ヘボン式）」「数字」が使用できます。<br />検索ワードの間に全角・半角スペースを挟むことで、一度に複数検索できます。",
        buttons: [
          {
            text: "次へ",
            action: tour.next
          }
        ]
      });

      tour.addStep({
        attachTo: { element: "#fixedScrollButton", on: "top" },
        title: "スクロール固定",
        text:
          "タップすると、スクロールが固定されます。<br>もう一度タップすると元に戻ります。<br>決まり字を動かす時にスクロールを防止できます。",
        buttons: [
          {
            text: "終了",
            action: tour.complete
          }
        ]
      });

      tour.start();
    },
    backAction: function() {
      const _this = this;
      if (this.isFixedScroll) {
        _this.fixedScroll();
      }
      this.deleteFormat();
      this.deleteId();
      this.deleteTitle();
      this.deletePlayers();
      this.deletePlacementCards();
      this.$router.push("/list");
    },
    previewAction: function() {
      const _this = this;
      if (this.isFixedScroll) {
        _this.fixedScroll();
      }
      this.setPlacementCards(this.cards);
      const players = {
        name1: _this.player1Name || "選手1",
        name2: _this.player2Name || "選手2"
      };
      this.setPlayers(players);
      this.$router.push("/preview");
    },
    scrollOff: function(e) {
      e.preventDefault();
    },
    search: function(text) {
      const _this = this;

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
              ((_this.isOldNotation &&
                card.nameOld &&
                card.nameOld.match(pattern)) ||
                (_this.isOldNotation &&
                  !card.nameOld &&
                  card.name.match(pattern)) ||
                (!_this.isOldNotation && card.name.match(pattern)) ||
                card.yomi.match(pattern) ||
                card.yomiRoman1.match(pattern) ||
                (card.yomiRoman2 && card.yomiRoman2.match(pattern)) ||
                card.kimariji.match(pattern)) &&
              text !== "";
          }
        }
      }
    },
    searchReset: function() {
      this.searchText = "";
      this.search("");
    },
    updateCards: function(value, player, position) {
      this.cards[player][position].items = value;
    },
    spreadCards: function(value, player, position) {
      this.cards[player][position].isSpread = !this.cards[player][position]
        .isSpread;
    },
    fixedScroll: function() {
      const _this = this;
      const html = document.querySelector("html");
      const body = document.querySelector("body");

      if (this.isFixedScroll) {
        _this.fixedScrollText = "スクロール固定";
        _this.isFixedScroll = false;
        html.style.overflow = "";
        body.style.overflow = "";
        document.removeEventListener("touchmove", _this.scrollOff, {
          passive: false
        });
      } else {
        _this.fixedScrollText = "固定解除";
        _this.isFixedScroll = true;
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        document.addEventListener("touchmove", _this.scrollOff, {
          passive: false
        });
      }
    }
    // watch: {
    //   isFixedScroll: function(isFixed) {
    //     const _this = this;
    //     const html = document.querySelector("html");
    //     const body = document.querySelector("body");

    //     if (isFixed) {
    //       html.style.overflow = "hidden";
    //       body.style.overflow = "hidden";
    //       document.addEventListener("touchmove", _this.scrollOff, {
    //         passive: false
    //       });
    //     } else {
    //       html.style.overflow = "";
    //       body.style.overflow = "";
    //       document.removeEventListener("touchmove", _this.scrollOff, {
    //         passive: false
    //       });
    //     }
    //   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~shepherd.js/dist/css/shepherd.css";

$redDarken1: #ef5350;
$lightBlueDarken1: #039be5;
$tealDarken4: #004d40;

#placement {
  width: 100%;
}

.o-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
}

.o-column {
  display: flex;

  &.isRight {
    flex-direction: row-reverse;
  }
}

.o-playerTab {
  background-color: lightgray;
  line-height: 1.2;
  text-transform: none;

  &.v-tab--active {
    &.isPlayer1 {
      background-color: $redDarken1;
    }
    &.isPlayer2 {
      background-color: $lightBlueDarken1;
    }
  }
}

.o-fixedButton {
  transition: background-color 0.25s;

  &.isFixedScroll {
    background-color: $tealDarken4 !important;
  }
}
</style>

<style lang="scss">
$primary: #1976d2;

#edit header .v-input__slot {
  height: 28px !important;
  min-height: 28px !important;
}
#edit header .v-input__prepend-inner,
#edit header .v-input__append-inner {
  margin-top: 3px !important;
}
#edit .v-tabs-bar {
  height: 40px;
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
