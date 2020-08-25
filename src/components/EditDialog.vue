<template>
  <v-dialog v-model="screenDialog" max-width="290">
    <v-card>
      <v-card-title class="title">画面を横向けにして使うことをおすすめします</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" text @click="screenAction">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EditDialog",
  data() {
    return {
      screenDialog: false
    };
  },
  created() {
    this.displayDialog();
  },
  computed: {
    ...mapState(["format"]),
    isTeiichi() {
      return this.format === 0;
    }
  },
  methods: {
    screenAction() {
      window.sessionStorage.setItem(["orientation"], [true]);
      this.screenDialog = false;
    },
    displayDialog() {
      const isSmartPhone = navigator.userAgent.match(/iPhone|Android.+Mobile/);
      const isPortrait = !(
        window.orientation === -90 || window.orientation === 90
      );
      const hasNotSession = !window.sessionStorage.getItem(["orientation"]);
      if (this.isTeiichi && isSmartPhone && isPortrait && hasNotSession) {
        this.screenDialog = true;
      }
    }
  }
};
</script>
