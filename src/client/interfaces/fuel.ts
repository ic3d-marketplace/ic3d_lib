export interface IFuel {
  setFuel: (vehicle: any, amount: number) => void;
  getFuel: (vehicle: any) => number;
}
