export interface ITargetOptions {
  name: string;
  event: any;
  icon: any;
  label: string;
  handler: any;
  radius: number;
}

export interface ITarget {
  addModelToTarget: (model: any, data: ITargetOptions) => void;
  addCoordsToTarget: (coords: any, data: ITargetOptions) => void;
}
