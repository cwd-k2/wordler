import {
  bgBlack,
  bgBrightGreen,
  bgBrightYellow,
  bgWhite,
  black,
  bold,
  white,
} from "https://deno.land/std@0.125.0/fmt/colors.ts";
import { availableKeys, CharHit } from "./game.ts";
import type { WordleGame } from "./game.ts";

function colorize([s, c]: [string, CharHit]): string {
  s = ` ${s} `;
  switch (c) {
    case "not yet":
      return bgBlack(white(s));
    case "not included":
      return bgWhite(black(s));
    case "included":
      return bgBrightYellow(black(bold(s)));
    case "exact":
      return bgBrightGreen(black(bold(s)));
  }
}

export function display(s: ReturnType<WordleGame["status"]>): string {
  const history = s.hist.map((l) => l.map(colorize).join("")).join("\n");
  const keyboard = availableKeys.map((k) =>
    colorize([k, s.chrs.get(k) || "not yet"]) + ("plm".includes(k) ? "\n" : "")
  ).join("");

  return `
guesses: ${s.guesses}
───────────────
${history}
───────────────
${keyboard}`;
}
