import type { IFuel } from "@client/interfaces/fuel";

export class LegacyFuel implements IFuel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private legacy: any = null;

  constructor() {
    this.legacy = exports.LegacyFuel;
  }

  static detect(): boolean {
    return GetResourceState("LegacyFuel") == "started";
  }

  setFuel(vehicle: number, amount: number) {
    this.legacy.SetFuel(vehicle, amount);
  }

  getFuel(vehicle: number): number {
    return this.legacy.GetFuel(vehicle);
  }
}
