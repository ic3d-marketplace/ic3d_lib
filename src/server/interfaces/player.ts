export interface IPlayer {
  getId(): number;
  getName(): string;
  getJob(): {
    name: string;
    grade: number;
  };
}
