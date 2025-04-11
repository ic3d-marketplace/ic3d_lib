export interface IFuel {
  setFuel: (vehicleId: number, amount: number) => void;
  getFuel: (vehicleId: number) => number;
}
