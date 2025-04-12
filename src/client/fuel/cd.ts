import type { IFuel } from "@client/interfaces/fuel";

export class CDFuel implements IFuel {
  private CD: any = null;

  constructor() {
    this.CD = exports["cd_fuel"];
  }

  static detect(): boolean {
    return GetResourceState("cd_fuel") == "started";
  }

  setFuel(vehicle: number, amount: number) {
    this.CD.SetFuel(vehicle, amount);
  }

  getFuel(vehicle: number): number {
    return this.CD.GetFuel(vehicle);
  }
}
