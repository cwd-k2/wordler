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
  let res = "\n";
  res += `guesses: ${s.guesses}\n`;
  res += "───────────────\n";
  res += s.hist.map((l) => l.map(colorizeWithEscape).join("")).join("\n");
  res += "\n";
  res += "───────────────\n";
  availableKeys.forEach((k) => {
    res += colorizeWithEscape([k, s.chrs.get(k) || "not yet"]);
    if ("plm".includes(k)) res += "\n";
  });

  return res;
}
