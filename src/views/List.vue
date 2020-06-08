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
                <v-btn color="teal darken-1" text @click="cancelCodeAction"
                  >キャンセル</v-btn
                >
                <v-btn
                  color="teal darken-1"
                  text
                  @click="createFromCodeAction(inputCode)"
                  >作成</v-btn
                >
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
          <v-list-item-title class="o-drawer__title"
            >競技かるた配置めも</v-list-item-title
          >
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
              <v-checkbox
                color="teal"
                label="旧仮名遣い表記"
                v-model="isOldNotation"
              ></v-checkbox>
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
            <v-btn color="teal darken-1" text @click="signOutDialog = false"
              >いいえ</v-btn
            >
            <v-btn color="teal darken-1" text @click="signOut">はい</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <v-alert v-model="copySuccess" type="success" text dense dismissible
          >コードをコピーしました：{{ copyText }}</v-alert
        >
        <v-alert v-model="copyError" type="error" text dense dismissible
          >コピーに失敗しました</v-alert
        >
        <v-tabs-items v-model="format">
          <v-tab-item>
            <v-text-field
              placeholder="定位置を検索 / タイトル・日付"
              dense
              outlined
              single-line
              color="teal"
              hide-details="auto"
              prepend-inner-icon="mdi-magnify"
              clearable
              maxlength="20"
              v-model="teiichiKeyword"
            ></v-text-field>

            <v-list two-line>
              <div
                v-if="!dataListGetflag && filteredTeiichiList.length === 0"
                class="mt-12 text-center"
              >
                <v-progress-circular
                  indeterminate
                  color="teal"
                ></v-progress-circular>
              </div>
              <v-list-item
                v-else-if="dataListGetflag && filteredTeiichiList.length === 0"
                >定位置のデータはありません</v-list-item
              >
              <template v-else v-for="(item, index) in filteredTeiichiList">
                <v-list-item :key="'list' + index">
                  <v-list-item-content
                    @click="editAction(item.id, 'teiichiList')"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn text icon small v-on="on">
                          <v-icon dark>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          @click="copyAction(item.id, 'teiichiList')"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-content-copy</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>複製</v-list-item-content>
                        </v-list-item>
                        <v-list-item
                          @click="deleteAction(item.id, 'teiichiList')"
                        >
                          <v-list-item-icon>
                            <v-icon>mdi-delete</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>削除</v-list-item-content>
                        </v-list-item>
                        <v-list-item
                          v-clipboard:copy="item.id + '_' + format"
                          v-clipboard:success="onCopySuccess"
                          v-clipboard:error="onCopyError"
                        >
                          <v-list-item-icon>
                            <v-icon
                              >mdi-numeric-9-plus-box-multiple-outline</v-icon
                            >
                          </v-list-item-icon>
                          <v-list-item-content
                            >コードをコピー</v-list-item-content
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="'divider' + index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-text-field
              placeholder="試合を検索 / タイトル・選手名・日付"
              dense
              outlined
              single-line
              hide-details="auto"
              prepend-inner-icon="mdi-magnify"
              clearable
              maxlength="20"
              v-model="gameKeyword"
            ></v-text-field>

            <v-list two-line>
              <div
                v-if="!dataListGetflag && filteredGameList.length === 0"
                class="mt-12 text-center"
              >
                <v-progress-circular
                  indeterminate
                  color="teal"
                ></v-progress-circular>
              </div>
              <v-list-item
                v-else-if="dataListGetflag && filteredGameList.length === 0"
                >試合のデータはありません</v-list-item
              >
              <template v-else v-for="(item, index) in filteredGameList">
                <v-list-item :key="'list' + index">
                  <v-list-item-content @click="editAction(item.id, 'gameList')">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.players.name1 }} 対
                      {{ item.players.name2 }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn text icon small v-on="on">
                          <v-icon dark>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item @click="copyAction(item.id, 'gameList')">
                          <v-list-item-icon>
                            <v-icon>mdi-content-copy</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>複製</v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="deleteAction(item.id, 'gameList')">
                          <v-list-item-icon>
                            <v-icon>mdi-delete</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>削除</v-list-item-content>
                        </v-list-item>
                        <v-list-item
                          v-clipboard:copy="item.id + '_' + format"
                          v-clipboard:success="onCopySuccess"
                          v-clipboard:error="onCopyError"
                        >
                          <v-list-item-icon>
                            <v-icon
                              >mdi-numeric-9-plus-box-multiple-outline</v-icon
                            >
                          </v-list-item-icon>
                          <v-list-item-content
                            >コードをコピー</v-list-item-content
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="'divider' + index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>
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

export default {
  data() {
    return {
      db: null,
      drawer: null,
      signOutDialog: false,
      inputCodeDialog: false,
      inputCode: "",
      format: 0,
      teiichiList: [],
      teiichiKeyword: "",
      gameList: [],
      gameKeyword: "",
      dataListGetflag: false,
      copyText: "",
      copySuccess: false,
      copyError: false,
      isOldNotation: false,
    };
  },
  created() {
    this.db = firebase.firestore();
    this.getAction("teiichiList");
    this.getAction("gameList");
    this.getOldNotation();
  },
  computed: {
    ...mapState(["userId", "oldNotation"]),
    filteredTeiichiList: function() {
      return this.sortList(this.filterList("teiichi"));
    },
    filteredGameList: function() {
      return this.sortList(this.filterList("game"));
    },
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    },
  },
  mixins: [Cards],
  methods: {
    ...mapMutations([
      "setUserId",
      "deleteUserId",
      "setFormat",
      "setId",
      "setTitle",
      "setPlayers",
      "setPlacementCards",
      "setOldNotation",
    ]),
    signOut: function() {
      const _this = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          _this.deleteUserId();
          _this.$router.push("/");
        });
    },
    filterList: function(format) {
      const _this = this;
      let filtered = [];
      for (let item of this[format + "List"]) {
        if (
          item.date.indexOf(_this[format + "Keyword"]) !== -1 ||
          item.title.indexOf(_this[format + "Keyword"]) !== -1 ||
          (format == "game" &&
            item.players.name1.indexOf(_this[format + "Keyword"]) !== -1) ||
          (format == "game" &&
            item.players.name2.indexOf(_this[format + "Keyword"]) !== -1)
        ) {
          filtered.push(item);
        }
      }
      // clearした際のnull問題を解消
      if (this[format + "Keyword"] === null) {
        filtered = this[format + "List"];
      }
      return filtered;
    },
    sortList: function(list) {
      return list.sort((a, b) => {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      });
    },
    createAction: function(format) {
      this.setFormat(format);
      this.$router.push("/edit");
    },
    createFromCodeAction: function(code) {
      const codeArray = code.split("_");
      const id = codeArray[0];
      const formatList = codeArray[1] === "0" ? "teiichiList" : "gameList";
      const _this = this;
      this.db
        .collection(formatList)
        .doc(id)
        .get()
        .then((doc) => {
          _this.inputCode = "";
          _this.setFormat(_this.format);
          _this.setTitle(doc.data().title + " のコピー");
          _this.setPlayers(doc.data().players);
          _this.setPlacementCards(_this.convertPlacement(doc.data().placement));
          _this.$router.push("/edit");
        })
        .catch((err) => {
          console.log(err);
          alert("入力内容をご確認ください");
        });
    },
    cancelCodeAction: function() {
      this.inputCode = "";
      this.inputCodeDialog = false;
    },
    copyAction: function(id, formatList) {
      const _this = this;
      this.db
        .collection("users")
        .doc(_this.userId)
        .collection(formatList)
        .doc(id)
        .get()
        .then((doc) => {
          _this.setFormat(_this.format);
          _this.setTitle(doc.data().title + " のコピー");
          _this.setPlayers(doc.data().players);
          _this.setPlacementCards(_this.convertPlacement(doc.data().placement));
          _this.$router.push("/edit");
        })
        .catch(() => {
          alert("ネットワーク状況をご確認ください");
        });
    },
    editAction: function(id, formatList) {
      const _this = this;
      this.db
        .collection("users")
        .doc(_this.userId)
        .collection(formatList)
        .doc(id)
        .get()
        .then((doc) => {
          _this.setFormat(_this.format);
          _this.setId(doc.id);
          _this.setTitle(doc.data().title);
          _this.setPlayers(doc.data().players);
          _this.setPlacementCards(_this.convertPlacement(doc.data().placement));
          _this.$router.push("/edit");
        })
        .catch((err) => {
          console.log(err);
          alert("ネットワーク状況をご確認ください");
        });
    },
    convertPlacement: function(placement) {
      // placementをthis.cardListの内容に変換
      const _this = this;
      const placementCards = {
        player1: {
          centerTop: {
            isSpread: placement.player1.centerTop.isSpread,
            items: _this.matchCards(placement.player1.centerTop.items),
          },
          leftTop: {
            isSpread: placement.player1.leftTop.isSpread,
            items: _this.matchCards(placement.player1.leftTop.items),
          },
          leftMiddle: {
            isSpread: placement.player1.leftMiddle.isSpread,
            items: _this.matchCards(placement.player1.leftMiddle.items),
          },
          leftBottom: {
            isSpread: placement.player1.leftBottom.isSpread,
            items: _this.matchCards(placement.player1.leftBottom.items),
          },
          rightTop: {
            isSpread: placement.player1.rightTop.isSpread,
            items: _this.matchCards(placement.player1.rightTop.items),
          },
          rightMiddle: {
            isSpread: placement.player1.rightMiddle.isSpread,
            items: _this.matchCards(placement.player1.rightMiddle.items),
          },
          rightBottom: {
            isSpread: placement.player1.rightBottom.isSpread,
            items: _this.matchCards(placement.player1.rightBottom.items),
          },
        },
        player2: {
          centerTop: {
            isSpread: placement.player2.centerTop.isSpread,
            items: _this.matchCards(placement.player2.centerTop.items),
          },
          leftTop: {
            isSpread: placement.player2.leftTop.isSpread,
            items: _this.matchCards(placement.player2.leftTop.items),
          },
          leftMiddle: {
            isSpread: placement.player2.leftMiddle.isSpread,
            items: _this.matchCards(placement.player2.leftMiddle.items),
          },
          leftBottom: {
            isSpread: placement.player2.leftBottom.isSpread,
            items: _this.matchCards(placement.player2.leftBottom.items),
          },
          rightTop: {
            isSpread: placement.player2.rightTop.isSpread,
            items: _this.matchCards(placement.player2.rightTop.items),
          },
          rightMiddle: {
            isSpread: placement.player2.rightMiddle.isSpread,
            items: _this.matchCards(placement.player2.rightMiddle.items),
          },
          rightBottom: {
            isSpread: placement.player2.rightBottom.isSpread,
            items: _this.matchCards(placement.player2.rightBottom.items),
          },
        },
        other: {
          remaining: {
            isSpread: placement.other.remaining.isSpread,
            items: _this.matchCards(placement.other.remaining.items),
          },
        },
      };
      return placementCards;
    },
    matchCards: function(items) {
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
    deleteAction: function(id, formatList) {
      const _this = this;
      this.db
        .collection("users")
        .doc(_this.userId)
        .collection(formatList)
        .doc(id)
        .delete()
        .then(() => {
          this.db
            .collection(formatList)
            .doc(id)
            .delete()
            .then(() => {
              _this[formatList] = [];
              _this.getAction(formatList);
            })
            .catch(() => {
              alert("ネットワーク状況をご確認ください");
            });
        })
        .catch(() => {
          alert("ネットワーク状況をご確認ください");
        });
    },
    getAction: function(formatList) {
      const _this = this;
      this.dataListGetflag = false;
      this.db
        .collection("users")
        .doc(_this.userId)
        .collection(formatList)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              date: doc.data().date,
              title: doc.data().title,
              players: doc.data().players,
              placement: doc.data().placement,
            };
            _this[formatList].push(data);
          });
          _this.dataListGetflag = true;
        });
    },
    getOldNotation: function() {
      const _this = this;
      this.db
        .collection("users")
        .doc(_this.userId)
        .get()
        .then((doc) => {
          _this.isOldNotation = doc.data() ? doc.data().oldNotation : false;
        });
    },
    onCopySuccess: function(e) {
      this.copySuccess = true;
      this.copyError = false;
      this.copyText = e.text;
    },
    onCopyError: function() {
      this.copyError = true;
      this.copySuccess = false;
    },
  },
  watch: {
    drawer: function() {
      const _this = this;
      if (!this.drawer) {
        _this.db
          .collection("users")
          .doc(_this.userId)
          .set({ oldNotation: _this.isOldNotation })
          .then(() => {
            _this.setOldNotation(_this.isOldNotation);
          });
      }
    },
  },
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
