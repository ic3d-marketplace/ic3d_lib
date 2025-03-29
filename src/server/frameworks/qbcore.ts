import type { IFramework } from "@server/interfaces/framework";
import type { IPlayer } from "@server/interfaces/player";

export class QBCoreFramework implements IFramework {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private QB: any = null;

  constructor() {
    this.QB = exports["qb-core"].GetCoreObject();
  }

  static detect(): boolean {
    return GetResourceState("qb-core") == "started";
  }

  getPlayer(): IPlayer {
    const xPlayer = this.QB.Functions.GetPlayer(source);

    return {
      getId: () => xPlayer.citizenid,
      getName: () => xPlayer.charinfo.firstname, // Must make interpolation of first n last
      getJob: () => ({
        name: xPlayer.job.name,
        grade: xPlayer.job.grade.level,
      }),
    };
  }
}
