<template>
  <div id="list">
    <ListHeader />
    <ListDrawer />
    <ListContent />
  </div>
</template>

<script>
import ListHeader from "./../components/ListHeader";
import ListDrawer from "./../components/ListDrawer";
import ListContent from "./../components/ListContent";

export default {
  name: "List",
  components: {
    ListHeader,
    ListDrawer,
    ListContent
  }
};
</script>
