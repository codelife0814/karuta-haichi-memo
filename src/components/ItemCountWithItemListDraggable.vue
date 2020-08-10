<template>
  <div :class="['o-column', className, { isSpread }]">
    <ItemCount
      :name="name"
      :player="player"
      :position="position"
      :id="id"
      :length="length"
      @count-event="spreadItem"
    />
    <ItemListDraggable
      v-model="items"
      :items="items"
      :player="player"
      :position="position"
      :isOldNotation="isOldNotation"
      @list-event="updateCards"
    />
  </div>
</template>

<script>
import ItemCount from "./../components/ItemCount";
import ItemListDraggable from "./../components/ItemListDraggable";

export default {
  name: "ItemCountWithItemListDraggable",
  components: {
    ItemCount,
    ItemListDraggable
  },
  props: {
    name: String,
    player: String,
    position: String,
    cards: Object,
    isOldNotation: Boolean
  },
  computed: {
    id() {
      return `${this.player}-counter-${this.position}`;
    },
    items() {
      return this.cards[this.player][this.position].items;
    },
    length() {
      return this.items.length;
    },
    isSpread() {
      return this.cards[this.player][this.position].isSpread;
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
