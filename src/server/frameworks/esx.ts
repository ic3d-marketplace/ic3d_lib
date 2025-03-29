import type { IFramework } from "@server/interfaces/framework";
import type { IPlayer } from "@server/interfaces/player";

export class ESXFramework implements IFramework {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ESX: any = null;

  constructor() {
    this.ESX = exports["es_extended"].getSharedObject();
  }

  static detect(): boolean {
    return GetResourceState("es_extended") == "started";
  }

  getPlayer(): IPlayer {
    const xPlayer = this.ESX.GetPlayerFromId(source);

    return {
      getId: () => xPlayer.identifier,
      getName: () => xPlayer.name,
      getJob: () => xPlayer.job,
    };
  }
}
