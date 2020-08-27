export default {
  computed: {
    mx_player() {
      return ["player1", "player2", "other"];
    },
    mx_position() {
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
    mx_convertCards(placement = null) {
      return this.mx_player.reduce((object, player) => {
        object[player] = {}
        this.mx_position.filter(position => {
          if (this.mx_isCreate(player, position)) {
            object[player][position] = {};
            object[player][position].isSpread = this.mx_isTop(position);
            const items = placement ? this.mx_convertCardsItems(placement[player][position].items) : []
            object[player][position].items = items;
          }
        })
        return object;
      }, {});
    },
    mx_convertCardsItems(items) {
      return items.flatMap((item) =>
        this.mx_cardList
          .filter((card) => item.no === card.no)
          .map((card) => {
            card.isMarking = item.isMarking;
            return card;
          })
      );
    },
    mx_convertPlacementCards(placementCards) {
      return this.mx_player.reduce((object, player) => {
        object[player] = {}
        this.mx_position.filter(position => {
          if (this.mx_isCreate(player, position)) {
            object[player][position] = {};
            object[player][position].isSpread = placementCards[player][position].isSpread;
            object[player][position].items = this.mx_convertPlacementCardsItems(placementCards[player][position].items);
          }
        })
        return object;
      }, {});
    },
    mx_convertPlacementCardsItems(placementCards) {
      if (placementCards.length === 0) return [];
      return placementCards.map((item) => {
        return {
          no: item.no,
          isMarking: item.isMarking,
        };
      });
    },
    mx_isCreate(player, position) {
      return (
        (player !== "other" && position !== "remaining") ||
        (player === "other" && position === "remaining")
      );
    },
    mx_isTop(position) {
      return (
        position === "centerLeftTop" ||
        position === "centerTop" ||
        position === "centerRightTop"
      );
    }
  }
};
