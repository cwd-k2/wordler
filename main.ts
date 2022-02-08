import { display, fetchWordList, WordleGame } from "./mod.ts";

const [wordles, dict] = await fetchWordList();
// console.log(wordles, dict);
const l = wordles.length - 1;
const n = parseInt(
  prompt(`Input wordle id (0~${l}) or just Enter (random):`) || "NaN",
);
const game = new WordleGame(wordles, dict, n);

while (!game.isDone()) {
  const word = prompt("guess>");
  if (word === null) break;
  try {
    game.guess(word);
    console.log(display(game.status()));
  } catch (e) {
    console.log(e);
  }
}
