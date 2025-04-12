import type { IFuel } from "@client/interfaces/fuel";

export class LegacyFuel implements IFuel {
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
