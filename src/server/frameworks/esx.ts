import type { IFramework } from "@server/interfaces/framework";
import type { IJob } from "@server/interfaces/job";

export class ESXFramework implements IFramework {
  private ESX: any = null;

  constructor() {
    this.ESX = exports["es_extended"].getSharedObject();
  }

  static detect(): boolean {
    return GetResourceState("es_extended") == "started";
  }

  getIdentifier(source: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.identifier;
  }

  getJob(source: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    const job: IJob = {
      name: xPlayer?.job?.name ?? "Unemployed",
      label: xPlayer?.job?.label ?? "Unemployed",
      grade: xPlayer?.job?.grade ?? 0,
      onDuty: xPlayer?.job?.onDuty ?? true,
    };
    return job;
  }

  getFullName(source: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.getName();
  }

  registerItem(item: string, callback: (playerId: number) => void) {
    this.ESX.RegisterUsableItem(item, (playerId: number) => {
      callback(playerId);
    });
  }

  getCash(source: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.getMoney();
  }

  addCash(source: number, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    xPlayer.addMoney(amount);
    return true;
  }

  removeCash(source: number, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    if (xPlayer.getMoney() < amount) {
      return false;
    }
    xPlayer.removeMoney(amount);
    return true;
  }

  getBank(source: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.getAccount("bank").money;
  }

  addBank(source: number, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    xPlayer.addAccountMoney("bank", amount);
    return true;
  }

  removeBank(source: number, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    if (xPlayer.getAccount("bank").money < amount) {
      return false;
    }
    xPlayer.removeAccountMoney("bank", amount);
    return true;
  }

  addItem(source: number, item: string, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    if (!this.canCarry(source, item, amount)) {
      return false;
    }
    xPlayer.addInventoryItem(item, amount);
    return true;
  }

  removeItem(source: number, item: string, amount: number) {
    if (this.getItemCount(source, item) < amount) {
      return false;
    }
    const xPlayer = this.ESX.GetPlayerFromId(source);
    xPlayer.removeInventoryItem(item, amount);
    return true;
  }

  canCarry(source: number, item: string, amount: number) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.canCarryItem(item, amount);
  }

  getItemCount(source: number, item: string) {
    const xPlayer = this.ESX.GetPlayerFromId(source);
    return xPlayer.getInventoryItem(item).count;
  }
}
