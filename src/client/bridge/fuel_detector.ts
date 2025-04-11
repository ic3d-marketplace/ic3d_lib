import { OXFuel } from "@client/fuel/ox";
import type { IFuel } from "@client/interfaces/fuel";

const fuels = [OXFuel];

export function detectFuel(): IFuel | null {
  for (const fuel of fuels) {
    if (fuel.detect()) {
      console.log(`✅ Detected fuel`);
      return new fuel();
    }
  }
  console.warn("⚠️ No fuel detected!");
  return null;
}
