<template>
  <div>
    <Header />

    <v-content>
      <v-container>
        <v-card flat class="pb-12">
          <h2 class="mb-2 text-center">{{ title }}</h2>
          <p class="subtitle-1 mb-4">{{ lead }}</p>

          <template v-if="effectiveDate">
            <SubList v-for="(text, index) in textList" :key="index" :text="text" />
            <p>{{ effectiveDate }}</p>
          </template>

          <template v-else>
            <SubAccordionList v-for="(text, index) in textList" :key="index" :text="text" />
          </template>

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
import SubList from "./SubList";
import SubAccordionList from "./SubAccordionList";
import BtnWindowClose from "./BtnWindowClose";

export default {
  name: "SubBase",
  components: {
    Header,
    Footer,
    SubList,
    SubAccordionList,
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
      return this.textData.effectiveDate || null;
    }
  }
};
</script>