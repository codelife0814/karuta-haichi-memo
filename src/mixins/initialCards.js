import cardList from "./../mixins/cardList";

export default {
  mixins: [cardList],
  computed: {
    players() {
      return ["player1", "player2", "other"];
    },
    positions() {
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
      return this.players.reduce((object, player) => {
        object[player] = {}
        this.positions.filter(position => {
          if (this.isCreate(player, position)) {
            object[player][position] = {};
            object[player][position].isSpread = this.isTop(position);
            const items = placement ? this.matchCards(placement[player][position].items) : []
            object[player][position].items = items;
          }
        })
        return object;
      }, {});
    },
    matchCards(items) {
      return items.flatMap((item) =>
        this.cardList
          .filter((card) => item.no === card.no)
          .map((card) => {
            card.isMarking = item.isMarking;
            return card;
          })
      );
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
