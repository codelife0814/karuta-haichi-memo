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

    <div v-for="(row, rowIndex) in itemList" :key="rowIndex" class="o-row">
      <ItemCountWithItemListDraggable
        v-for="(item, itemIndex) in row"
        :player="player"
        :key="itemIndex"
        :name="item.name"
        :position="item.position"
        @count-event="spreadCards"
        @list-event="updateCards"
      />
    </div>
  </v-tab-item>
</template>

<script>
import { mapState } from "vuex";
import ItemCountWithItemListDraggable from "./../components/ItemCountWithItemListDraggable";

export default {
  name: "EditTabItem",
  components: {
    ItemCountWithItemListDraggable
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
  },
  methods: {
    spreadCards(value, player, position) {
      this.$emit("count-event", value, player, position);
    },
    updateCards(value, player, position) {
      this.$emit("list-event", value, player, position);
    }
  }
};
</script>

<style scoped lang="scss">
$redDarken1: #ef5350;
$lightBlueDarken1: #039be5;

.o-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid lightgray;
}
</style>

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