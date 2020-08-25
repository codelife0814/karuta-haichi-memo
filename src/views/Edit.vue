<template>
  <div id="edit">
    <EditDialog />
    <EditHeader />
    <EditContent />

    <!-- <v-navigation-drawer v-model="bottomMenu" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item>
          <v-switch color="teal" v-model="isFixedScroll" label="スクロール固定"></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
  </div>
</template>

<script>
import EditDialog from "./../components/EditDialog";
import EditHeader from "./../components/EditHeader";
import EditContent from "./../components/EditContent";

export default {
  name: "Edit",
  components: {
    EditDialog,
    EditHeader,
    EditContent
  },
  data() {
    return {
      // bottomMenu: false
    };
  },
  methods: {
    // watch: {
    //   isFixedScroll(isFixed) {
    //     const html = document.querySelector("html");
    //     const body = document.querySelector("body");
    //     if (isFixed) {
    //       html.style.overflow = "hidden";
    //       body.style.overflow = "hidden";
    //       document.addEventListener("touchmove", this.scrollOff, {
    //         passive: false
    //       });
    //     } else {
    //       html.style.overflow = "";
    //       body.style.overflow = "";
    //       document.removeEventListener("touchmove", this.scrollOff, {
    //         passive: false
    //       });
    //     }
    //   }
  }
};
</script>
