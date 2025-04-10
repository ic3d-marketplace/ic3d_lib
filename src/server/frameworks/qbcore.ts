import type { IFramework } from "@server/interfaces/framework";
import type { IJob } from "@server/interfaces/job";

export class QBCoreFramework implements IFramework {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private QB: any = null;

  constructor() {
    this.QB = exports["qb-core"].GetCoreObject();
  }

  static detect(): boolean {
    return GetResourceState("qb-core") == "started";
  }

  getIdentifier(source: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    return xPlayer?.PlayerData?.citizenid;
  }

  getJob(source: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    const job: IJob = {
      name: xPlayer.PlayerData?.job?.name ?? "Unemployed",
      label: xPlayer.PlayerData?.job?.label ?? "Unemployed",
      grade: xPlayer.PlayerData?.job?.grade?.level ?? 0,
      onDuty: xPlayer.PlayerData?.job?.onduty ?? false,
    };
    return job;
  }

  getFullName(source: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    return `${xPlayer.PlayerData?.charinfo?.firstname ?? "Unknown"} ${
      xPlayer.PlayerData?.charinfo?.lastname ?? "Unknown"
    }`;
  }

  registerItem(item: string, callback: (playerId: number) => void) {
    this.QB.Functions.CreateUseableItem(item, (playerId: number) => {
      callback(playerId);
    });
  }

  getCash(source: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    return xPlayer.PlayerData.money.cash;
  }

  addCash(source: number, amount: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    xPlayer.Functions.AddMoney("cash", amount);
    return true;
  }

  removeCash(source: number, amount: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    if (xPlayer.PlayerData.money.cash < amount) {
      return false;
    }
    xPlayer.Functions.RemoveMoney("cash", amount);
    return true;
  }

  getBank(source: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    return xPlayer.PlayerData.money.bank;
  }

  addBank(source: number, amount: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    xPlayer.Functions.AddMoney("bank", amount, "bank deposit");
    return true;
  }

  removeBank(source: number, amount: number) {
    const xPlayer = this.QB.Functions.GetPlayer(source);
    if (xPlayer.PlayerData.money.bank < amount) {
      return false;
    }
    xPlayer.Functions.RemoveMoney("bank", amount, "bank withdrawal");
    return true;
  }

  addItem(source: number, item: string, amount: number) {
    return exports["qb-inventory"].AddItem(source, item, amount);
  }

  removeItem(source: number, item: string, amount: number) {
    return exports["qb-inventory"].RemoveItem(source, item, amount);
  }

  canCarry(source: number, item: string, amount: number) {
    return exports["qb-inventory"].CanAddItem(source, item, amount);
  }

  getItemCount(source: number, item: string) {
    return exports["qb-inventory"].GetItemCount(source, item);
  }
}
