import type { IFramework } from "@server/interfaces/framework";
import type { IJob } from "@server/interfaces/job";
import { VrpProxy } from "@vrpjs/server";

export class VRPFramework implements IFramework {
  private vRP: any = null;

  constructor() {
    this.vRP = VrpProxy.getInterface("vRP");
  }

  static detect(): boolean {
    return GetResourceState("vrp") == "started";
  }

  getIdentifier(source: number) {
    return this.vRP.getUserId(source);
  }

  getJob(source: number) {
    const playerJob: string = this.vRP.getUserGroupByType(
      this.vRP.getUserId(source),
      "job"
    );
    const job: IJob = {
      name: playerJob ?? "Unemployed",
      label: playerJob ?? "Unemployed",
      onDuty: true,
    };
    return job;
  }

  getFullName(source: number) {
    const identity = this.vRP.getUserIdentity(this.vRP.getUserId(source));
    return `${identity.firstname ?? "Unknown"} ${identity.name ?? "Unknown"}`;
  }

  registerItem(item: string, callback: (playerId: number) => void) {
    this.vRP.defInventoryItem(item, "", `${item}.png`, (source: number) => {
      const userId = this.vRP.getUserId(source);
      if (userId) {
        callback(source);
      }
    });
  }

  getCash(source: number) {
    return this.vRP.getMoney(this.vRP.getUserId(source));
  }

  addCash(source: number, amount: number) {
    return this.vRP.giveMoney(this.vRP.getUserId(source), amount);
  }

  removeCash(source: number, amount: number) {
    return this.vRP.tryPayment(this.vRP.getUserId(source), amount);
  }

  getBank(source: number) {
    return this.vRP.getBankMoney(this.vRP.getUserId(source));
  }

  addBank(source: number, amount: number) {
    return this.vRP.giveBankMoney(this.vRP.getUserId(source), amount);
  }

  removeBank(source: number, amount: number) {
    return this.vRP.tryWithdraw(this.vRP.getUserId(source), amount);
  }

  addItem(source: number, item: string, amount: number) {
    return this.vRP.giveInventoryItem(this.vRP.getUserId(source), item, amount);
  }

  removeItem(source: number, item: string, amount: number) {
    return this.vRP.tryGetInventoryItem(
      this.vRP.getUserId(source),
      item,
      amount
    );
  }

  canCarry(source: number, item: string, amount: number) {
    const userId = this.vRP.getUserId(source);
    const currentWeight = this.vRP.getInventoryWeight(userId);
    const weight = this.vRP.getItemWeight(item);
    const newWeight = weight * amount;
    const finalWeight = currentWeight + newWeight;
    const maxWeight = this.vRP.getInventoryMaxWeight(userId);
    return finalWeight <= maxWeight;
  }

  getItemCount(source: number, item: string) {
    return this.vRP.getInventoryItemAmount(this.vRP.getUserId(source), item);
  }
}
