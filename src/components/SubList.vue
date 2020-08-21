<template>
  <section>
    <h3 class="mb-2">{{ header }}</h3>
    <p v-if="description">{{ description }}</p>
    <ul class="mb-4">
      <li v-for="(item, index) in hasItemList(text)" :key="index" v-html="item"></li>
    </ul>
    <ol class="mb-4">
      <li v-for="(item, index) in hasNumList(text)" :key="index" v-html="item"></li>
    </ol>
  </section>
</template>

<script>
export default {
  name: "SubList",
  props: {
    text: Object
  },
  computed: {
    header() {
      return this.text.header;
    },
    description() {
      return this.text.description;
    }
  },
  methods: {
    hasItemList(text) {
      return Object.prototype.hasOwnProperty.call(text, "itemList")
        ? text.itemList
        : [];
    },
    hasNumList(text) {
      return Object.prototype.hasOwnProperty.call(text, "numList")
        ? text.numList
        : [];
    }
  }
};
</script>