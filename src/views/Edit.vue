<template>
  <div id="edit">
    <EditDialog />

    <EditHeader
      :cards="cards"
      :playerTab="playerTab"
      :player1Name="player1Name"
      :player2Name="player2Name"
    />

    <v-content>
      <v-container>
        <v-tabs v-if="format === 1" color="white" fixed-tabs v-model="playerTab">
          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :id="tab.id"
            :class="['o-playerTab', tab.className]"
            style="text-transform: none"
          >{{ tab.playerName || tab.defaultName }}</v-tab>
        </v-tabs>
        <div id="placement" :class="{ isGame: format === 1 }">
          <v-tabs-items v-model="playerTab" :touchless="true">
            <EditTabItem
              v-for="(item, index) in tabItems"
              :player="item.player"
              :playerName="item.playerName"
              :key="index"
              @input-event="updateName"
              @count-event="spreadCards"
              @list-event="updateCards"
            />
          </v-tabs-items>

          <EditRow
            :row="remainingRow"
            player="other"
            @count-event="spreadCards"
            @list-event="updateCards"
          />
        </div>

        <v-btn
          small
          fixed
          right
          bottom
          dark
          color="teal"
          class="o-fixedButton"
          :class="{ isFixedScroll }"
          id="fixedScrollButton"
          @click="fixedScroll"
        >{{ fixedScrollText }}</v-btn>

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
import Cards from "./../mixins/cardList";
import initialCards from "./../mixins/initialCards";
import EditDialog from "./../components/EditDialog";
import EditHeader from "./../components/EditHeader";
import EditTabItem from "./../components/EditTabItem";
import EditRow from "./../components/EditRow";

export default {
  name: "Edit",
  components: {
    EditDialog,
    EditHeader,
    EditTabItem,
    EditRow
  },
  data() {
    return {
      cards: {},
      playerTab: 0,
      player1Name: "",
      player2Name: "",
      tabItems: [],
      bottomMenu: false,
      isFixedScroll: false,
      fixedScrollText: "スクロール固定"
    };
  },
  created() {
    this.player1Name = this.players.name1 || "";
    this.player2Name = this.players.name2 || "";
    this.tabItems = [
      { player: "player1", playerName: this.player1Name },
      { player: "player2", playerName: this.player2Name }
    ];

    if (
      JSON.stringify(this.initialCards) === JSON.stringify(this.placementCards)
    ) {
      let cardList = JSON.parse(JSON.stringify(this.cardList));
      cardList.sort((a, b) => (a.no > b.no ? 1 : -1));
      this.cards = this.initialCards;
      this.cards.other.remaining.items = cardList;
      this.setPlacementCards(this.cards);
    } else {
      this.cards = this.placementCards;
    }
  },
  destroyed() {
    this.fixedScroll();
  },
  computed: {
    ...mapState(["format", "id", "players", "placementCards", "oldNotation"]),
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
    remainingRow() {
      return [{ name: "余り", position: "remaining" }];
    }
  },
  mixins: [Cards, initialCards],
  methods: {
    ...mapMutations([
      "setFormat",
      "deleteFormat",
      "deleteId",
      "deleteTitle",
      "setPlayers",
      "deletePlayers",
      "setPlacementCards",
      "deletePlacementCards"
    ]),
    scrollOff(e) {
      e.preventDefault();
    },
    updateName(value, player) {
      this[player + "Name"] = value;
    },
    updateCards(value, player, position) {
      this.cards[player][position].items = value;
    },
    spreadCards(value, player, position) {
      this.cards[player][position].isSpread = !this.cards[player][position]
        .isSpread;
    },
    fixedScroll() {
      const actions = {
        fix: {
          text: "スクロール固定",
          isFixedScroll: false,
          overflow: "",
          eventLister: "removeEventListener"
        },
        clear: {
          text: "固定解除",
          isFixedScroll: true,
          overflow: "hidden",
          eventLister: "addEventListener"
        }
      };
      const action = this.isFixedScroll ? actions.fix : actions.clear;
      const { text, isFixedScroll, overflow, eventLister } = action;

      this.fixedScrollText = text;
      this.isFixedScroll = isFixedScroll;
      document.querySelector("html").style.overflow = overflow;
      document.querySelector("body").style.overflow = overflow;
      document[eventLister]("touchmove", this.scrollOff, {
        passive: false
      });
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
$tealDarken4: #004d40;

#placement {
  width: 100%;
}

.o-playerTab {
  background-color: lightgray;
  line-height: 1.2;
  text-transform: none;
}

.o-fixedButton {
  transition: background-color 0.25s;

  &.isFixedScroll {
    background-color: $tealDarken4 !important;
  }
}
</style>

<style lang="scss">
#edit .v-tabs-bar {
  height: 40px;
}
</style>
