import type { IFuel } from "@client/interfaces/fuel";

export class OXFuel implements IFuel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor() {}

  static detect(): boolean {
    return GetResourceState("ox_fuel") == "started";
  }

  setFuel(vehicleId: number, amount: number) {
    Entity(vehicleId).state.fuel = amount;
  }

  getFuel(vehicleId: number): number {
    return Entity(vehicleId).state.fuel;
  }
}
