<template>
  <div class="o-itemList" :class="{isSpread}">
    <div
      :class="['o-item', {isMarking: card.isMarking}]"
      v-for="card in cards"
      :key="card.id"
    >{{ displayName(card) }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ItemList",
  props: {
    player: String,
    position: String
  },
  computed: {
    ...mapState(["placementCards", "oldNotation"]),
    cards() {
      return this.placementCards[this.player][this.position].items;
    },
    isSpread() {
      return this.placementCards[this.player][this.position].isSpread;
    }
  },
  methods: {
    displayName(card) {
      return this.oldNotation && card.yomiOld ? card.yomiOld : card.yomi;
    }
  }
};
</script>

<style scoped lang="scss">
$red: #ea5532;
$yellow: #fff55f;
$tealDarken4: #004d40;

.o-itemList {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: 60px;

  .o-playerWrap.isPlayer2 & {
    flex-direction: row-reverse;
  }
}

.o-item {
  display: inline-block;
  width: 14px;
  height: 68px;
  padding: 4px 0;
  background-color: #ffffff;
  font-size: 10px;
  text-align: left;
  writing-mode: vertical-rl;

  &.isMarking {
    color: $red;
    font-weight: bold;
  }
  .isFloat & {
    &:last-child {
      margin-right: 8px;
    }
  }
  .isRight.isSpread & {
    margin-left: 8px;
  }
  .isLeft.isSpread &,
  .isFloat.isSpread & {
    margin-right: 8px;
  }
}

#placement.isGame {
  .o-item {
    width: 24px;
    height: 70px;
    padding-right: 4px;
    padding-left: 4px;
    border: 1px solid $tealDarken4;
    font-family: serif;
    font-weight: bold;
    text-align: center;
  }
}
</style>
