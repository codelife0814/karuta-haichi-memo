<template>
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
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import fireFunctions from "./../mixins/fireFunctions";
import html2canvas from "html2canvas";
import moment from "moment";

export default {
  name: "PreviewHeader",
  data() {
    return {
      placementTitle: ""
    };
  },
  created() {
    this.placementTitle = this.title;
  },
  mixins: [fireFunctions],
  computed: {
    ...mapState([
      "userId",
      "format",
      "id",
      "players",
      "title",
      "placementCards",
      "isDownload"
    ]),
    player1Name() {
      return this.players.name1;
    },
    player2Name() {
      return this.players.name2;
    },
    isDownloadValue: {
      get() {
        return this.isDownload;
      },
      set(value) {
        this.setIsDownload(value);
      }
    },
    isTeiichi() {
      return this.format === 0;
    }
  },
  methods: {
    ...mapMutations([
      "deleteId",
      "setTitle",
      "deleteTitle",
      "deletePlayers",
      "deletePlacementCards",
      "setIsDownload",
      "deleteIsDownload"
    ]),
    backAction() {
      this.setTitle(this.placementTitle);
      this.deleteIsDownload();
      this.$router.push("/edit");
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
      this.isDownloadValue = true;
    },
    async saveAction() {
      const listName = this.isTeiichi ? "teiichiList" : "gameList";
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
        await this.fsAction(
          "set",
          ["users", this.userId, listName, this.id],
          param
        );
        await this.fsAction("set", [listName, this.id], param);
      } else {
        const ref = await this.fsAction(
          "add",
          ["users", this.userId, listName],
          param
        );
        await this.fsAction("set", [listName, ref.id], param);
      }
      this.deleteId();
      this.deleteTitle();
      this.deletePlayers();
      this.deletePlacementCards();
      this.deleteIsDownload();
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
