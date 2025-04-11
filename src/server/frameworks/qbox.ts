import type { IFramework } from "@server/interfaces/framework";
import type { IJob } from "@server/interfaces/job";

export class QBOXFramework implements IFramework {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private QBX: any = null;

  constructor() {
    this.QBX = exports["qbx_core"];
  }

  static detect(): boolean {
    return GetResourceState("qbx_core") == "started";
  }

  getIdentifier(source: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    return xPlayer?.PlayerData?.citizenid;
  }

  getJob(source: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    const job: IJob = {
      name: xPlayer.PlayerData?.job?.name ?? "Unemployed",
      label: xPlayer.PlayerData?.job?.label ?? "Unemployed",
      grade: xPlayer.PlayerData?.job?.grade?.level ?? 0,
      onDuty: xPlayer.PlayerData?.job?.onduty ?? false,
    };
    return job;
  }

  getFullName(source: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    return `${xPlayer.PlayerData?.charinfo?.firstname ?? "Unknown"} ${
      xPlayer.PlayerData?.charinfo?.lastname ?? "Unknown"
    }`;
  }

  registerItem(item: string, callback: (playerId: number) => void) {
    this.QBX.CreateUseableItem(item, (playerId: number) => {
      callback(playerId);
    });
  }

  getCash(source: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    return xPlayer.Functions.GetMoney("cash");
  }

  addCash(source: number, amount: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    xPlayer.Functions.AddMoney("cash", amount);
    return true;
  }

  removeCash(source: number, amount: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    if (xPlayer.Functions.GetMoney("cash") < amount) {
      return false;
    }
    xPlayer.Functions.RemoveMoney("cash", amount);
    return true;
  }

  getBank(source: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    return xPlayer.Functions.GetMoney("bank");
  }

  addBank(source: number, amount: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    xPlayer.Functions.AddMoney("bank", amount);
    return true;
  }

  removeBank(source: number, amount: number) {
    const xPlayer = this.QBX.GetPlayer(source);
    if (xPlayer.Functions.GetMoney("bank") < amount) {
      return false;
    }
    xPlayer.Functions.RemoveMoney("bank", amount);
    return true;
  }

  addItem(source: number, item: string, amount: number) {
    return exports.ox_inventory.AddItem(source, item, amount);
  }

  removeItem(source: number, item: string, amount: number) {
    return exports.ox_inventory.RemoveItem(source, item, amount);
  }

  canCarry(source: number, item: string, amount: number) {
    return exports.ox_inventory.CanCarryItem(source, item, amount);
  }

  getItemCount(source: number, item: string) {
    return exports.ox_inventory.GetItemCount(source, item);
  }
}
