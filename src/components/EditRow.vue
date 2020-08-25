<template>
  <div class="o-row">
    <ItemCountWithItemListDraggable
      v-for="(item, itemIndex) in row"
      :key="itemIndex"
      :player="player"
      :name="item.name"
      :position="item.position"
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
