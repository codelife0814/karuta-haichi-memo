<template>
  <div id="edit">
    <EditDialog />

    <EditHeader :playerTab="playerTab" />

    <v-content>
      <v-container>
        <v-tabs v-if="isGame" color="white" fixed-tabs v-model="playerTab">
          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :id="tab.id"
            :class="['o-playerTab', tab.className]"
            style="text-transform: none"
          >{{ tab.playerName || tab.defaultName }}</v-tab>
        </v-tabs>
        <div id="placement" :class="{ isGame }">
          <v-tabs-items v-model="playerTab" :touchless="true">
            <EditTabItem
              v-for="(item, index) in tabItems"
              :player="item.player"
              :playerName="item.playerName"
              :key="index"
              @input-event="updateName"
            />
          </v-tabs-items>

          <EditRow :row="remainingRow" player="other" />
        </div>

        <FixedScrollButton />

        <!-- <v-btn fab fixed right bottom dark color="teal" @click.stop="bottomMenu = !bottomMenu">
          <v-icon dark>mdi-menu</v-icon>
        </v-btn>-->
      </v-container>
    </v-content>

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
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import EditDialog from "./../components/EditDialog";
import EditHeader from "./../components/EditHeader";
import EditTabItem from "./../components/EditTabItem";
import EditRow from "./../components/EditRow";
import FixedScrollButton from "./../components/FixedScrollButton";

export default {
  name: "Edit",
  components: {
    EditDialog,
    EditHeader,
    EditTabItem,
    EditRow,
    FixedScrollButton
  },
  data() {
    return {
      playerTab: 0
      // bottomMenu: false
    };
  },
  computed: {
    ...mapState(["format", "players"]),
    tabs() {
      const tabsLength = 2;
      let tabsArray = [];
      for (let i = 1; i <= tabsLength; i++) {
        const object = {
          id: `player${i}Tab`,
          className: `isPlayer${i}`,
          playerName: this[`player${i}Name`],
          defaultName: `選手${i}`
        };
        tabsArray.push(object);
      }
      return tabsArray;
    },
    player1Name: {
      get() {
        return this.players.name1 || "";
      },
      set(value) {
        this.setPlayers({ name1: value, name2: this.players.name2 });
      }
    },
    player2Name: {
      get() {
        return this.players.name2 || "";
      },
      set(value) {
        this.setPlayers({ name1: this.players.name1, name2: value });
      }
    },
    tabItems() {
      return [
        { player: "player1", playerName: this.player1Name },
        { player: "player2", playerName: this.player2Name }
      ];
    },
    remainingRow() {
      return [{ name: "余り", position: "remaining" }];
    },
    isGame() {
      return this.format === 1;
    }
  },
  methods: {
    ...mapMutations(["setPlayers"]),
    updateName(value, player) {
      this[player + "Name"] = value;
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$redDarken1: #ef5350;
$lightBlueDarken1: #039be5;

#placement {
  width: 100%;
}

.o-playerTab {
  background-color: lightgray;
  line-height: 1.2;
  text-transform: none;
}
</style>

<style lang="scss">
#edit .v-tabs-bar {
  height: 40px;
}
</style>
