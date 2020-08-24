<template>
  <div id="list">
    <ListHeader :drawer="drawer" @change-drawer="changeDrawer" />
    <ListDrawer :drawer="drawer" @change-drawer="changeDrawer" />
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
  },
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    changeDrawer(value) {
      this.drawer = value;
    },
    changeFormat(value) {
      this.format = value;
    }
  }
};
</script>
