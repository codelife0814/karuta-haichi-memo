<template>
  <v-tab-item :class="['o-playerTabItem', className]">
    <v-text-field
      v-if="format === 1"
      :placeholder="placeholder"
      :color="textFieldColor"
      dense
      filled
      single-line
      maxlength="15"
      clearable
      hide-details="auto"
      prepend-inner-icon="mdi-account"
      v-model="playerNameValue"
      :value="playerName"
      @input="$emit('input', $event)"
    ></v-text-field>

    <EditRow v-for="(row, rowIndex) in itemList" :row="row" :key="rowIndex" :player="player" />
  </v-tab-item>
</template>

<script>
import { mapState } from "vuex";
import EditRow from "./../components/EditRow";

export default {
  name: "EditTabItem",
  components: {
    EditRow
  },
  props: {
    player: String,
    playerName: String
  },
  computed: {
    ...mapState(["format", "players"]),
    isPlayer1() {
      return this.player === "player1";
    },
    className() {
      return this.isPlayer1 ? "isPlayer1" : "isPlayer2";
    },
    placeholder() {
      return this.isPlayer1 ? "選手1の名前を入力" : "選手2の名前を入力";
    },
    textFieldColor() {
      return this.isPlayer1 ? "red darken-3" : "light-blue darken-4";
    },
    playerNameValue: {
      get() {
        return this.playerName;
      },
      set(value) {
        this.$emit("input-event", value, this.player);
      }
    },
    itemList() {
      return [
        [
          { name: "左上", position: "leftTop" },
          { name: "浮左", position: "centerLeftTop" },
          { name: "浮中", position: "centerTop" },
          { name: "浮右", position: "centerRightTop" },
          { name: "右上", position: "rightTop" }
        ],
        [
          { name: "左中", position: "leftMiddle" },
          { name: "右中", position: "rightMiddle" }
        ],
        [
          { name: "左下", position: "leftBottom" },
          { name: "右下", position: "rightBottom" }
        ]
      ];
    }
  }
};
</script>

<style lang="scss">
$redDarken1: #ef5350;
$lightBlueDarken1: #039be5;

.o-playerTab {
  &.v-tab--active {
    &.isPlayer1 {
      background-color: $redDarken1;
    }
    &.isPlayer2 {
      background-color: $lightBlueDarken1;
    }
  }
}
</style>