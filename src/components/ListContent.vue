<template>
  <v-content>
    <v-container>
      <v-alert
        v-model="copySuccess"
        type="success"
        text
        dense
        dismissible
      >コードをコピーしました：{{ copyText }}</v-alert>
      <v-alert v-model="copyError" type="error" text dense dismissible>コピーに失敗しました</v-alert>
      <v-tabs-items v-model="formatValue">
        <ListTabItem
          v-for="(item, index) in tabList"
          :format="format"
          :formatName="item"
          :key="index"
          @copy-success-event="onCopySuccess"
          @copy-error-event="onCopyError"
        />
      </v-tabs-items>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import ListTabItem from "./../components/ListTabItem";

export default {
  name: "ListContent",
  components: {
    ListTabItem
  },
  data() {
    return {
      tabList: ["teiichi", "game"],
      copyText: "",
      copySuccess: false,
      copyError: false
    };
  },
  computed: {
    ...mapState(["format"]),
    formatValue: {
      get() {
        return this.format;
      },
      set(value) {
        this.setFormat(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setFormat"]),
    onCopySuccess(value) {
      this.copySuccess = true;
      this.copyError = false;
      this.copyText = value.text;
    },
    onCopyError() {
      this.copyError = true;
      this.copySuccess = false;
    }
  }
};
</script>
