<template>
  <div class="mb-6 text-center">
    <v-btn @click="windowClose">
      <v-icon left>mdi-close</v-icon>閉じる
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "BtnWindowClose",
  methods: {
    windowClose: function() {
      window.close();
    }
  }
};
</script>