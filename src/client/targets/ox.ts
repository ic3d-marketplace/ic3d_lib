import type { ITarget, ITargetOptions } from "@client/interfaces/target";

export class OXTarget implements ITarget {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private OX: any = null;

  constructor() {
    this.OX = exports.ox_target;
  }

  static detect(): boolean {
    return GetResourceState("ox_target") == "started";
  }

  addModelToTarget(
    model: any,
    { name, event, icon, label, handler }: ITargetOptions
  ) {
    this.OX.addModel(model, {
      name,
      event,
      icon,
      label,
      canInteract: handler,
    });
  }

  addCoordsToTarget(
    coords: any,
    { radius, name, event, icon, label, handler }: ITargetOptions
  ) {
    this.OX.addSphereZone({
      coords,
      radius: radius ?? 2.0,
      options: [
        {
          name: name,
          event: event,
          icon: icon,
          label: label,
          canInteract: handler,
        },
      ],
    });
  }
}
