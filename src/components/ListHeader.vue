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
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import initialCards from "./../mixins/initialCards";
import fireFunctions from "./../mixins/fireFunctions";

export default {
  name: "ListHeader",
  data() {
    return {
      formatList: [
        {
          name: "定位置",
          icon: "mdi-view-grid-plus-outline",
        },
        {
          name: "試合",
          icon: "mdi-account-multiple-plus",
        },
      ],
      inputCodeDialog: false,
      inputCode: "",
    };
  },
  created() {
    this.setFormat(0);
  },
  mixins: [initialCards, fireFunctions],
  computed: {
    ...mapState(["format", "isListDrawer"]),
    formatValue: {
      get() {
        return this.format;
      },
      set(value) {
        this.setFormat(value);
      },
    },
    drawerValue: {
      get() {
        return this.isListDrawer;
      },
      set(value) {
        this.setIsListDrawer(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setFormat",
      "setTitle",
      "setPlayers",
      "setPlacementCards",
      "setIsListDrawer",
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
        const doc = await this.fsAction("get", [formatList, id]);
        this.inputCode = "";
        this.setFormat(this.format);
        this.setTitle(doc.data().title + " のコピー");
        this.setPlayers(doc.data().players);
        this.setPlacementCards(this.convertCards(doc.data().placement));
        this.$router.push("/edit");
      } catch (err) {
        alert("一致するデータがありません");
      }
    },
  },
};
</script>
