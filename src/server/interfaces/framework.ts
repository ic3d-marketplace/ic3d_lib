import type { IPlayer } from "./player";

export interface IFramework {
  getPlayer: () => IPlayer;
}
