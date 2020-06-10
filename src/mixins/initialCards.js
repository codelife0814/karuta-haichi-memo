export default {
  computed: {
    initialCards: function() {
      const players = ["player1", "player2", "other"];
      const positions = [
        "leftTop",
        "centerTop",
        "rightTop",
        "leftMiddle",
        "rightMiddle",
        "leftBottom",
        "rightBottom",
        "remaining",
      ];
      let object = {};
      for (const player of players) {
        object[player] = {};
        for (const position of positions) {
          if (
            (player === "other" && position !== "remaining") ||
            (player !== "other" && position === "remaining")
          ) {
            continue;
          }
          object[player][position] = {};
          object[player][position].isSpread = position === "centerTop";
          object[player][position].items = [];
        }
      }
      return object;
    },
  },
};
