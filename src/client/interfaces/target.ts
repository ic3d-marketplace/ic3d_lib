export interface ITargetOptions {
  name: string;
  event: any;
  icon: any;
  label: string;
  handler: any;
  radius: number;
}

export interface ITarget {
  addModelToTarget: (models: string | string[], data: ITargetOptions) => void;
  addCoordsToTarget: (coords: any, data: ITargetOptions) => void;
}
