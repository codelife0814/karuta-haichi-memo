<template>
  <v-tab-item>
    <v-text-field
      :placeholder="placeholder"
      color="teal"
      dense
      outlined
      single-line
      hide-details="auto"
      prepend-inner-icon="mdi-magnify"
      clearable
      maxlength="20"
      v-model="keyword"
    ></v-text-field>

    <v-list two-line>
      <div v-if="!dataListGetflag && filteredList.length === 0" class="mt-12 text-center">
        <v-progress-circular indeterminate color="teal"></v-progress-circular>
      </div>
      <v-list-item v-else-if="dataListGetflag && filteredList.length === 0">{{ noDataText }}</v-list-item>
      <template v-else v-for="(item, index) in filteredList">
        <v-list-item :key="'list' + index">
          <v-list-item-content @click="editAction(item.id, listName)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="isGame">{{ item.players.name1 }} -{{ item.players.name2 }}</v-list-item-subtitle>
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
                <v-list-item @click="copyAction(item.id, listName)">
                  <v-list-item-icon>
                    <v-icon>mdi-content-copy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>複製</v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteAction(item.id, listName)">
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
                    <v-icon>mdi-numeric-9-plus-box-multiple-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>コードをコピー</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="'divider' + index"></v-divider>
      </template>
    </v-list>
  </v-tab-item>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import initialCards from "./../mixins/initialCards";
import fireFunctions from "./../mixins/fireFunctions";

export default {
  name: "ListTabItem",
  props: {
    format: Number,
    formatName: String,
  },
  data() {
    return {
      teiichiList: [],
      gameList: [],
      keyword: "",
      teiichiKeyword: "",
      gameKeyword: "",
      dataListGetflag: false,
    };
  },
  created() {
    this.getAction("teiichiList");
    this.getAction("gameList");
  },
  mixins: [initialCards, fireFunctions],
  computed: {
    ...mapState(["userId"]),
    isTeiichi() {
      return this.formatName === "teiichi";
    },
    placeholder() {
      return this.isTeiichi
        ? "定位置を検索 / タイトル・日付"
        : "試合を検索 / タイトル・選手名・日付";
    },
    noDataText() {
      return this.isTeiichi
        ? "定位置のデータはありません"
        : "試合のデータはありません";
    },
    listName() {
      return this.formatName + "List";
    },
    filteredList() {
      return this.sortList(this.filterList(this.formatName));
    },
    isGame() {
      return this.format === 1;
    },
  },
  methods: {
    ...mapMutations([
      "setFormat",
      "setId",
      "setTitle",
      "setPlayers",
      "setPlacementCards",
    ]),
    filterList(formatName) {
      const list = this[formatName + "List"];
      const keyword = this.keyword;
      let filtered = list.filter((item) => {
        if (
          item.date.indexOf(keyword) !== -1 ||
          item.title.indexOf(keyword) !== -1 ||
          (formatName == "game" &&
            item.players.name1.indexOf(keyword) !== -1) ||
          (formatName == "game" && item.players.name2.indexOf(keyword) !== -1)
        )
          return item;
      });
      // clearした際のnull問題を解消
      if (keyword === null) filtered = list;
      return filtered;
    },
    sortList(list) {
      return list.sort((a, b) => {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      });
    },
    async getAction(formatList) {
      this.dataListGetflag = false;
      try {
        const querySnapshot = await this.fsAction("get", [
          "users",
          this.userId,
          formatList,
        ]);
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            date: doc.data().date,
            title: doc.data().title,
            players: doc.data().players,
            placement: doc.data().placement,
          };
          this[formatList].push(data);
        });
      } catch (err) {
        alert("データ取得に失敗しました");
      } finally {
        this.dataListGetflag = true;
      }
    },
    async editAction(id, formatList) {
      try {
        const doc = await this.fsAction("get", [
          "users",
          this.userId,
          formatList,
          id,
        ]);
        this.setFormat(this.format);
        this.setId(doc.id);
        this.setTitle(doc.data().title);
        this.setPlayers(doc.data().players);
        this.setPlacementCards(this.convertCards(doc.data().placement));
        this.$router.push("/edit");
      } catch (err) {
        alert("編集データ取得に失敗しました");
      }
    },
    async copyAction(id, formatList) {
      try {
        const doc = await this.fsAction("get", [
          "users",
          this.userId,
          formatList,
          id,
        ]);
        this.setFormat(this.format);
        this.setTitle(doc.data().title + " のコピー");
        this.setPlayers(doc.data().players);
        this.setPlacementCards(this.convertCards(doc.data().placement));
        this.$router.push("/edit");
      } catch (err) {
        alert("複製データ取得に失敗しました");
      }
    },
    async deleteAction(id, formatList) {
      try {
        await this.fsAction("delete", ["users", this.userId, formatList, id]);
        await this.fsAction("delete", [formatList, id]);
        this[formatList] = [];
        this.getAction(formatList);
      } catch (err) {
        alert("削除に失敗しました");
      }
    },
    onCopySuccess(e) {
      this.$emit("copy-success-event", e);
    },
    onCopyError() {
      this.$emit("copy-error-event");
    },
  },
};
</script>
