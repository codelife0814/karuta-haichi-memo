<template>
  <header class="o-header">
    <h1>競技かるた配置めも</h1>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
$teal: #009688;

.o-header {
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: $teal;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 24px;
    font-family: "Hannari";
    color: #fff;
    text-decoration: none;
  }
}
</style>
