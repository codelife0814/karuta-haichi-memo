export default {
  computed: {
    initialCards() {
      const players = ["player1", "player2", "other"];
      const positions = [
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
          object[player][position].isSpread =
            position === "centerLeftTop" ||
            position === "centerTop" ||
            position === "centerRightTop";
          object[player][position].items = [];
        }
      }
      return object;
    },
  },
};
