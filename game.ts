export const availableKeys = "qwertyuiopasdfghjklzxcvbnm".split("");

export type CharHit =
  | "not yet"
  | "not included"
  | "included"
  | "exact";

function ord(c: CharHit): number {
  switch (c) {
    case "not yet":
      return 0;
    case "not included":
      return 1;
    case "included":
      return 2;
    case "exact":
      return 3;
  }
}

export class WordleGame {
  private guesses: number;
  private done: boolean;
  private hist: CharHit[][];
  private chrs: Map<string, CharHit>;
  private dict: Set<string>;
  private wordle: string;

  constructor(
    wordles: string[],
    dict: Set<string>,
    n?: number,
  ) {
    this.wordle = n !== undefined && 0 <= n && n < wordles.length
      ? wordles[n]
      : wordles[wordles.length - 1];
    this.dict = dict;
    this.chrs = new Map(availableKeys.map((c) => [c, "not yet"]));
    this.hist = [];
    this.done = false;
    this.guesses = 0;
  }

  isDone(): boolean {
    return this.done;
  }

  status(): {
    readonly guesses: number;
    readonly hist: CharHit[][];
    readonly chrs: Map<string, CharHit>;
  } {
    return {
      guesses: this.guesses,
      hist: this.hist,
      chrs: this.chrs,
    };
  }

  guess(word: string): boolean {
    if (word.length !== 5 || !word.match(/[a-z]{5}/)) {
      throw Error("Invalid guess");
    }
    if (!this.dict.has(word)) {
      throw Error(`The word "${word}" is not allowed for guess.`);
    }

    this.guesses += 1;

    const line: CharHit[] = [];
    for (let i = 0; i < 5; i++) {
      const res: CharHit = word[i] === this.wordle[i]
        ? "exact"
        : this.wordle.includes(word[i])
        ? "included"
        : "not included";
      if (ord(res) > ord(this.chrs.get(word[i]) || "not yet")) {
        this.chrs.set(word[i], res);
      }
      line.push(res);
    }
    this.hist.push(line);

    if (word === this.wordle) {
      this.done = true;
      return true;
    }

    return false;
  }
}
