<template>
  <v-footer absolute color="grey lighten-5" class="font-weight-medium">
    <v-col class="text-center" cols="12">
      &copy; {{ new Date().getFullYear() }} —
      <strong>競技かるた配置めも</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="scss">
.o-header {
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: teal;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 24px;
  }
}
</style>
