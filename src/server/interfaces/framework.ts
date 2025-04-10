import type { IJob } from "./job";

export interface IFramework {
  // Player
  getIdentifier: (source: number) => string;
  getJob: (source: number) => IJob;
  getFullName: (source: number) => string;

  // Misc
  registerItem: (item: string, callback: () => void) => void;

  // Cash
  getCash: (source: number) => number;
  addCash: (source: number, amount: number) => boolean;
  removeCash: (source: number, amount: number) => boolean;

  // Bank
  getBank: (source: number) => number;
  addBank: (source: number, amount: number) => boolean;
  removeBank: (source: number, amount: number) => boolean;

  // Inventory
  addItem: (source: number, item: string, amount: number) => boolean;
  removeItem: (source: number, item: string, amount: number) => boolean;
  canCarry: (source: number, item: string, amount: number) => boolean;
  getItemCount: (source: number, item: string) => number;
}
