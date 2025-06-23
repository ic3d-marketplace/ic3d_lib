import { CDFuel } from "@client/fuel/cd";
import { CDNFuel } from "@client/fuel/cdn";
import { LegacyFuel } from "@client/fuel/legacy";
import { NativeFuel } from "@client/fuel/native";
import { OXFuel } from "@client/fuel/ox";
import { PSFuel } from "@client/fuel/ps";
import type { IFuel } from "@client/interfaces/fuel";

const fuels = [OXFuel, LegacyFuel, PSFuel, CDFuel, CDNFuel];

export function detectFuel(): IFuel {
  for (const fuel of fuels) {
    if (fuel.detect()) {
      console.log(`✅ Detected fuel`);
      return new fuel();
    }
  }
  console.warn("⚠️ Using native fuel!");
  return new NativeFuel();
}
