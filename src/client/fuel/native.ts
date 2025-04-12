import type { IFuel } from "@client/interfaces/fuel";

export class NativeFuel implements IFuel {
  constructor() {}

  static detect(): boolean {
    return true; // If there isnt any fuel resource, lets use natives
  }

  setFuel(vehicle: number, amount: number) {
    SetVehicleFuelLevel(vehicle, amount);
  }

  getFuel(vehicle: number): number {
    return GetVehicleFuelLevel(vehicle);
  }
}
