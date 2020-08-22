<template>
  <div id="list">
    <ListHeader
      :drawer="drawer"
      :format="format"
      @change-drawer="changeDrawer"
      @change-format="changeFormat"
    />

    <ListDrawer :drawer="drawer" @change-drawer="changeDrawer" />

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
        <v-tabs-items v-model="format">
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
  </div>
</template>

<script>
import ListHeader from "./../components/ListHeader";
import ListDrawer from "./../components/ListDrawer";
import ListTabItem from "./../components/ListTabItem";

export default {
  components: {
    ListHeader,
    ListDrawer,
    ListTabItem
  },
  data() {
    return {
      drawer: null,
      format: 0,
      tabList: ["teiichi", "game"],
      copyText: "",
      copySuccess: false,
      copyError: false
    };
  },
  methods: {
    changeDrawer(value) {
      this.drawer = value;
    },
    changeFormat(value) {
      this.format = value;
    },
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
