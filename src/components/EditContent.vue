<template>
  <v-content>
    <v-container>
      <v-tabs v-if="isGame" color="white" fixed-tabs v-model="playerTabValue">
        <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :id="tab.id"
          :class="['o-playerTab', tab.className]"
          style="text-transform: none"
        >{{ tab.playerName || tab.defaultName }}</v-tab>
      </v-tabs>
      <div id="placement" :class="{ isGame }">
        <v-tabs-items v-model="playerTabValue" :touchless="true">
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
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import EditTabItem from "./../components/EditTabItem";
import EditRow from "./../components/EditRow";
import FixedScrollButton from "./../components/FixedScrollButton";

export default {
  name: "EditContent",
  components: {
    EditTabItem,
    EditRow,
    FixedScrollButton
  },
  computed: {
    ...mapState(["format", "players", "playerTab"]),
    isGame() {
      return this.format === 1;
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
    playerTabValue: {
      get() {
        return this.playerTab;
      },
      set(value) {
        this.setPlayerTab(value);
      }
    },
    remainingRow() {
      return [{ name: "余り", position: "remaining" }];
    },
    tabItems() {
      return [
        { player: "player1", playerName: this.player1Name },
        { player: "player2", playerName: this.player2Name }
      ];
    },
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
    }
  },
  methods: {
    ...mapMutations(["setPlayers", "setPlayerTab"]),
    updateName(value, player) {
      this[player + "Name"] = value;
    }
  }
};
</script>

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
