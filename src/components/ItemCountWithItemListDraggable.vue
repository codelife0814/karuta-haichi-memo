<template>
  <div :class="['o-column', className, { isSpread }]">
    <ItemCount :player="player" :name="name" :position="position" @count-event="spreadItem" />
    <ItemListDraggable :player="player" :position="position" @list-event="updateCards" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemCount from "./../components/ItemCount";
import ItemListDraggable from "./../components/ItemListDraggable";

export default {
  name: "ItemCountWithItemListDraggable",
  components: {
    ItemCount,
    ItemListDraggable
  },
  props: {
    player: String,
    name: String,
    position: String
  },
  computed: {
    ...mapState(["placementCards"]),
    isSpread() {
      return this.placementCards[this.player][this.position].isSpread;
    },
    className() {
      let className = "";
      const name = this.name.charAt(0);
      switch (name) {
        case "右":
          className = "isRight";
          break;
        case "左":
          className = "isLeft";
          break;
        case "浮":
          className = "isFloat";
          break;
        case "余":
          className = "isRemaining";
      }
      return className;
    }
  },
  methods: {
    spreadItem(value) {
      this.$emit("count-event", value, this.player, this.position);
    },
    updateCards(value) {
      this.$emit("list-event", value, this.player, this.position);
    }
  }
};
</script>

<style scoped lang="scss">
.o-column {
  display: flex;

  &.isRight {
    flex-direction: row-reverse;
  }
}
</style>