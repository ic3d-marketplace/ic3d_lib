import type { IFuel } from "@client/interfaces/fuel";

export class OXFuel implements IFuel {
  constructor() {}

  static detect(): boolean {
    return GetResourceState("ox_fuel") == "started";
  }

  setFuel(vehicle: number, amount: number) {
    Entity(vehicle).state.fuel = amount;
  }

  getFuel(vehicle: number): number {
    return Entity(vehicle).state.fuel;
  }
}
