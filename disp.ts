import {
  bgBrightGreen,
  bgBrightYellow,
  bgWhite,
  black,
  bold,
} from "https://deno.land/std@0.125.0/fmt/colors.ts";
import { availableKeys, CharHit } from "./game.ts";
import type { WordleGame } from "./game.ts";

function colorize(c: CharHit): string {
  switch (c) {
    case "not yet":
      return "⬛";
    case "not included":
      return "⬜";
    case "included":
      return "🟨";
    case "exact":
      return "🟩";
  }
}

function colorizeWithEscape([s, c]: [string, CharHit]): string {
  s = ` ${s} `
  switch (c) {
    case "not yet":
    case "not included":
      return bgWhite(black(s));
    case "included":
      return bgBrightYellow(black(bold(s)));
    case "exact":
      return bgBrightGreen(black(bold(s)));
  }
}

export function display(s: ReturnType<WordleGame["status"]>): string {
  let res = "";
  res += `guesses: ${s.guesses}\n`;
  res += s.hist.map((l) => l.map(colorizeWithEscape).join("")).join("\n");
  res += "\n";
  availableKeys.forEach((k) => {
    res += `(${k}: ${colorize(s.chrs.get(k) || "not yet")})`;
    res += "plm".includes(k) ? "\n" : " ";
  });

  return res;
}
