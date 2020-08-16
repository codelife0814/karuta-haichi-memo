<template>
  <div class="o-row">
    <ItemCountWithItemListDraggable
      v-for="(item, itemIndex) in row"
      :key="itemIndex"
      :player="player"
      :name="item.name"
      :position="item.position"
      @count-event="spreadCards"
      @list-event="updateCards"
    />
  </div>
</template>

<script>
import ItemCountWithItemListDraggable from "./../components/ItemCountWithItemListDraggable";

export default {
  name: "EditRow",
  components: {
    ItemCountWithItemListDraggable
  },
  props: {
    row: Array,
    player: String
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
