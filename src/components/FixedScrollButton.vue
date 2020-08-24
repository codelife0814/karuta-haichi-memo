<template>
  <v-btn
    small
    fixed
    right
    bottom
    dark
    color="teal"
    :class="['o-fixedButton', { isFixedScroll }]"
    id="fixedScrollButton"
    @click="fixedScroll"
  >{{ fixedScrollText }}</v-btn>
</template>

<script>
export default {
  name: "FixedScrollButton",
  data() {
    return {
      isFixedScroll: false,
      fixedScrollText: "スクロール固定"
    };
  },
  destroyed() {
    this.fixedScroll();
  },
  methods: {
    fixedScroll() {
      const actions = {
        fix: {
          text: "スクロール固定",
          isFixedScroll: false,
          overflow: "",
          eventLister: "removeEventListener"
        },
        clear: {
          text: "固定解除",
          isFixedScroll: true,
          overflow: "hidden",
          eventLister: "addEventListener"
        }
      };
      const action = this.isFixedScroll ? actions.fix : actions.clear;
      const { text, isFixedScroll, overflow, eventLister } = action;

      this.fixedScrollText = text;
      this.isFixedScroll = isFixedScroll;
      document.querySelector("html").style.overflow = overflow;
      document.querySelector("body").style.overflow = overflow;
      document[eventLister]("touchmove", this.scrollOff, {
        passive: false
      });
    },
    scrollOff(e) {
      e.preventDefault();
    }
  }
};
</script>

<style scoped lang="scss">
$tealDarken4: #004d40;

.o-fixedButton {
  transition: background-color 0.25s;

  &.isFixedScroll {
    background-color: $tealDarken4 !important;
  }
}
</style>
