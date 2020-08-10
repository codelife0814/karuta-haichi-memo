<template>
  <draggable
    :class="['o-itemList', {isSpread}]"
    group="myGroup"
    animation="200"
    v-model="cards"
    @start="drag = true"
    @end="drag = false"
  >
    <div
      class="o-item"
      :class="{
        isActive: item.isActive,
        isMarking: item.isMarking,
      }"
      v-for="item in items"
      :key="item.id"
      @click="marking(item)"
    >{{ displayName(item) }}</div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ItemDraggableList",
  components: {
    draggable
  },
  props: {
    items: Array,
    isSpread: Boolean,
    isOldNotation: Boolean,
    player: String,
    position: String
  },
  computed: {
    cards: {
      get() {
        return this.items;
      },
      set(value) {
        this.$emit("list-event", value);
      }
    }
  },
  methods: {
    displayName(item) {
      return this.isOldNotation && item.nameOld ? item.nameOld : item.name;
    },
    marking(item) {
      item.isMarking = !item.isMarking;
    }
  }
};
</script>

<style scoped lang="scss">
$red: #ea5532;
$tealLighten3: #80cbc4;
$yellow: #fff55f;

.o-itemList {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  .o-column.isRight & {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}

.o-item {
  display: inline-block;
  width: 14px;
  height: 60px;
  padding: 4px 0;
  background-color: #ffffff;
  font-size: 10px;
  text-align: left;
  writing-mode: vertical-rl;
  transition: background-color 0.25s, margin 0.25s;

  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
  &.isActive,
  &.isActive.isMarking {
    background-color: $yellow;
    font-weight: bold;
  }
  &.isMarking {
    background-color: #f9d5cd;
    color: $red;
    font-weight: bold;
  }
  &.sortable-chosen {
    background-color: $tealLighten3;
    font-weight: bold;
  }
  .o-column.isFloat & {
    &:last-child {
      margin-right: 8px;
    }
  }
  .o-column.isRight.isSpread .o-itemList & {
    margin-left: 8px;
  }
  .o-column.isLeft.isSpread .o-itemList &,
  .o-column.isFloat.isSpread .o-itemList & {
    margin-right: 8px;
  }
}
</style>
