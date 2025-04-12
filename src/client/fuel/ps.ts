import type { IFuel } from "@client/interfaces/fuel";

export class PSFuel implements IFuel {
  private PS: any = null;

  constructor() {
    this.PS = exports["ps-fuel"];
  }

  static detect(): boolean {
    return GetResourceState("ps-fuel") == "started";
  }

  setFuel(vehicle: number, amount: number) {
    this.PS.SetFuel(vehicle, amount);
  }

  getFuel(vehicle: number): number {
    return this.PS.GetFuel(vehicle);
  }
}
