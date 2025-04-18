import { ESXFramework } from "@server/frameworks/esx";
import { QBCoreFramework } from "@server/frameworks/qbcore";
import { QBOXFramework } from "@server/frameworks/qbox";
import { VRPFramework } from "@server/frameworks/vrp";
import type { IFramework } from "@server/interfaces/framework";

const frameworks = [ESXFramework, QBCoreFramework, QBOXFramework, VRPFramework];

export function detectFramework(): IFramework | null {
  for (const framework of frameworks) {
    if (framework.detect()) {
      console.log(`✅ Detected framework`);
      return new framework();
    }
  }
  console.warn("⚠️ No framework detected!");
  return null;
}
