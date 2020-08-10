<template>
  <span class="o-itemCount" @click="spreadItem">
    {{ name }}
    <span class="o-itemCount__number">{{ itemCount }}</span>
  </span>
</template>

<script>
export default {
  name: "ItemCount",
  props: {
    name: String,
    length: Number,
    player: String,
    position: String
  },
  computed: {
    itemCount: {
      get() {
        return this.length === 100 ? "百" : this.length;
      }
    }
  },
  methods: {
    spreadItem() {
      this.$emit("child-event");
    }
  }
};
</script>

<style scoped lang="scss">
$redDarken1: #ef5350;
$redDarken4: #b71c1c;
$lightBlueDarken1: #039be5;
$lightBlueDarken4: #01579b;
$tealLighten1: #26a69a;
$tealDarken4: #004d40;

.o-itemCount {
  width: 14px;
  min-height: 60px;
  padding: 4px 0;
  background-color: $tealLighten1;
  font-size: 10px;
  color: #fff;
  writing-mode: vertical-lr;
  transition: background-color 0.25s;

  .o-column.isLeft & {
    margin-right: 4px;
  }
  .o-column.isRight & {
    margin-left: 4px;
  }
  .o-column.isFloat & {
    margin-right: 4px;
    margin-left: 4px;
  }
  .o-column.isRemaining & {
    background-color: lightgray;
    color: inherit;
  }
  .o-column.isSpread & {
    background-color: $tealDarken4;
  }
  #placement.isGame .o-playerTabItem.isPlayer1 .o-column & {
    background-color: $redDarken1;
  }
  #placement.isGame .o-playerTabItem.isPlayer1 .o-column.isSpread & {
    background-color: $redDarken4;
  }
  #placement.isGame .o-playerTabItem.isPlayer2 .o-column & {
    background-color: $lightBlueDarken1;
  }
  #placement.isGame .o-playerTabItem.isPlayer2 .o-column.isSpread & {
    background-color: $lightBlueDarken4;
  }
  &__number {
    font-weight: bold;
    writing-mode: horizontal-tb;
  }
}
</style>
