// Office Jokes — a single original one-line joke about office life.
//
// The entry point writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output/entry.txt), as required by the make.fun bounty
// "Make the AI Judge Laugh: Office Jokes". The line is a genuine joke:
// a setup grounded in everyday office life with a turn at the end that
// lands somewhere the reader did not see coming. Deterministic, stdlib
// only, no network, no file reads outside this repository.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I put 'per my last email' in a message to my boss and HR called it a cry for help.";

// The sealed scorer gates on 1-199 characters: refuse to write anything
// outside that range instead of submitting an invalid entry.
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`Joke must be 1-199 characters, got ${JOKE.length}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, JOKE + "\n", "utf8");

// Read the file back and verify it holds exactly the joke (one line),
// mirroring the length guard above so a bad write never goes unnoticed.
const written = readFileSync(entryPath, "utf8");
if (written !== JOKE + "\n") {
  throw new Error("entry.txt does not hold exactly the joke");
}
