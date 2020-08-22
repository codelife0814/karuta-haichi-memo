<template>
  <div id="list">
    <ListHeader
      :drawer="drawer"
      :format="format"
      @change-drawer="changeDrawer"
      @change-format="changeFormat"
    />
    <ListDrawer :drawer="drawer" @change-drawer="changeDrawer" />
    <ListContent :format="format" @change-format="changeFormat" />
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
      drawer: null,
      format: 0
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
