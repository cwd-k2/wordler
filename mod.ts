export * from "./game.ts";
export * from "./disp.ts";

export const WORDLE_URL = "https://www.nytimes.com/games/wordle";

// fetch wordles and the valid words for the game
export async function fetchWordList(): Promise<[string[], Set<string>]> {
  let res = await fetch(WORDLE_URL);
  let txt = await res.text();

  const f = txt.match(/src="(main\.\w+\.js)"/)![1];

  res = await fetch(`${WORDLE_URL}/${f}`);
  txt = await res.text();

  const m = [...txt.matchAll(/\w=(\[("[a-z]{5}",?)+\])/g)!];

  const wordles: string[] = JSON.parse(m[0][1]);
  const dict: string[] = JSON.parse(m[1][1]);

  return [wordles, new Set(dict.concat(wordles))];
}
