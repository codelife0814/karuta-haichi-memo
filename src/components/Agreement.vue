<template>
  <div>
    <Header />

    <v-content>
      <v-container>
        <v-card flat class="pb-12">
          <h2 class="mb-2 text-center">{{ title }}</h2>
          <p>{{ lead }}</p>

          <template v-for="(text, textIndex) in textList">
            <h3 class="mb-2" :key="`header-${textIndex}`">{{ text.header }}</h3>
            <p v-if="text.description" :key="`description-${textIndex}`">{{ text.description }}</p>
            <ul class="mb-4" :key="`itemList-${textIndex}`">
              <li v-for="(item, itemIndex) in hasItemList(text)" :key="itemIndex" v-html="item"></li>
            </ul>
            <ol class="mb-4" :key="`numList-${textIndex}`">
              <li v-for="(item, itemIndex) in hasNumList(text)" :key="itemIndex" v-html="item"></li>
            </ol>
          </template>

          <p>{{ effectiveDate }}</p>

          <BtnWindowClose />
        </v-card>
      </v-container>
    </v-content>

    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import BtnWindowClose from "./BtnWindowClose";

export default {
  name: "Agreement",
  components: {
    Header,
    Footer,
    BtnWindowClose
  },
  props: {
    textData: Object
  },
  computed: {
    title() {
      return this.textData.title;
    },
    lead() {
      return this.textData.lead;
    },
    textList() {
      return this.textData.textList;
    },
    effectiveDate() {
      return this.textData.effectiveDate;
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