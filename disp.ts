import { availableKeys, CharHit } from "./game.ts";

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

export function display(s: {
  readonly guesses: number;
  readonly hist: CharHit[][];
  readonly chrs: Map<string, CharHit>;
}): string {
  let res = "";
  res += `guesses: ${s.guesses}\n`;
  res += s.hist.map((l) => l.map(colorize).join("")).join("\n");
  res += "\n";
  availableKeys.forEach((k) => {
    res += `(${k}: ${colorize(s.chrs.get(k) || "not yet")})`;
    res += "plm".includes(k) ? "\n" : " ";
  });

  return res;
}
