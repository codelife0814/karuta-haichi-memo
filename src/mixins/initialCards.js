import cardList from "./../mixins/cardList";

export default {
  mixins: [cardList],
  computed: {
    playerArray() {
      return ["player1", "player2", "other"];
    },
    positionArray() {
      return [
        "leftTop",
        "centerLeftTop",
        "centerTop",
        "centerRightTop",
        "rightTop",
        "leftMiddle",
        "rightMiddle",
        "leftBottom",
        "rightBottom",
        "remaining",
      ];
    }
  },
  methods: {
    convertCards(placement = null) {
      return this.playerArray.reduce((object, player) => {
        object[player] = {}
        this.positionArray.filter(position => {
          if (this.isCreate(player, position)) {
            object[player][position] = {};
            object[player][position].isSpread = this.isTop(position);
            const items = placement ? this.convertCardsItems(placement[player][position].items) : []
            object[player][position].items = items;
          }
        })
        return object;
      }, {});
    },
    convertCardsItems(items) {
      return items.flatMap((item) =>
        this.cardList
          .filter((card) => item.no === card.no)
          .map((card) => {
            card.isMarking = item.isMarking;
            return card;
          })
      );
    },
    convertPlacementCards(placementCards) {
      return this.playerArray.reduce((object, player) => {
        object[player] = {}
        this.positionArray.filter(position => {
          if (this.isCreate(player, position)) {
            object[player][position] = {};
            object[player][position].isSpread = placementCards[player][position].isSpread;
            object[player][position].items = this.convertPlacementCardsItems(placementCards[player][position].items);
          }
        })
        return object;
      }, {});
    },
    convertPlacementCardsItems(placementCards) {
      if (placementCards.length === 0) return [];
      return placementCards.map((item) => {
        return {
          no: item.no,
          isMarking: item.isMarking,
        };
      });
    },
    isCreate(player, position) {
      return (
        (player !== "other" && position !== "remaining") ||
        (player === "other" && position === "remaining")
      );
    },
    isTop(position) {
      return (
        position === "centerLeftTop" ||
        position === "centerTop" ||
        position === "centerRightTop"
      );
    }
  }
};
