import type { IFuel } from "@client/interfaces/fuel";

export class CDNFuel implements IFuel {
  private CDN: any = null;

  constructor() {
    this.CDN = exports["cdn_fuel"];
  }

  static detect(): boolean {
    return GetResourceState("cdn_fuel") == "started";
  }

  setFuel(vehicle: number, amount: number) {
    this.CDN.SetFuel(vehicle, amount);
  }

  getFuel(vehicle: number): number {
    return this.CDN.GetFuel(vehicle);
  }
}
