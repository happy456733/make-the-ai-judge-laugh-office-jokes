// Office Jokes — a single original one-line joke about office life.
//
// The entry point writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output/entry.txt), as required by the make.fun bounty
// "Make the AI Judge Laugh: Office Jokes". The line is a genuine joke:
// a setup grounded in everyday office life with a turn at the end that
// lands somewhere the reader did not see coming. Deterministic, stdlib
// only, no network, no file reads outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I put 'per my last email' in a message to my boss and HR called it a cry for help.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE + "\n", "utf8");
