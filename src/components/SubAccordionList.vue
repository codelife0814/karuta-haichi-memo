<template>
  <v-expansion-panels accordion focusable flat class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-header>{{ header }}</v-expansion-panel-header>
      <v-expansion-panel-content v-for="(item, index) in body" :key="index" eager>
        <dl>
          <dt class="mt-4">
            <b>{{ item.term }}</b>
          </dt>
          <dd>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <span v-html="item.description"></span>
          </dd>
        </dl>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "SubAccordionList",
  props: {
    text: Object
  },
  computed: {
    header() {
      return this.text.header;
    },
    body() {
      return this.text.body;
    }
  }
};
</script>