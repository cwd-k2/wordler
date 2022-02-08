import { display, fetchWordList, WordleGame } from "./mod.ts";

const [wordles, dict] = await fetchWordList();
// console.log(wordles, dict);
const game = new WordleGame(wordles, dict);

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
