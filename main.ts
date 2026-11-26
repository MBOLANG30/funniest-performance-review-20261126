import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the funniest one-line performance review an AI agent could
// give its human operator. Chosen by head-to-head judging of 10 candidates
// against the competition's own criteria (humour first, freshness second).
const LINE =
  "Meets expectations: delegates brilliantly, supervises poorly, and still expects a bonus for work the agent did.";

function main(): void {
  // Gate checks mirroring the sealed scorer: 1-140 chars, one line,
  // not only whitespace.
  if (LINE.trim().length === 0) {
    throw new Error("entry line is blank");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry must be 1-140 chars, got ${LINE.length}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Create the output folder if missing; never delete it or anything in it
  // besides entry.txt, which this run overwrites.
  mkdirSync(outDir, { recursive: true });
  // Write exactly the line, no trailing newline, so the file is the entry.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
