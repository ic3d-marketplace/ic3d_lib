import { OXTarget } from "@client/targets/ox";
import { QBTarget } from "@client/targets/qb";
import type { ITarget } from "@client/interfaces/target";

const targets = [OXTarget, QBTarget];

export function detectTarget(): ITarget | null {
  for (const target of targets) {
    if (target.detect()) {
      console.log(`✅ Detected target`);
      return new target();
    }
  }
  console.warn("⚠️ No target detected!");
  return null;
}
