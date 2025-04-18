import type { ITarget, ITargetOptions } from "@client/interfaces/target";

export class QBTarget implements ITarget {
  private QB: any = null;

  constructor() {
    this.QB = exports["qb-target"];
  }

  static detect(): boolean {
    return GetResourceState("qb-target") == "started";
  }

  addModelToTarget(
    models: string | string[],
    { event, icon, label, handler }: ITargetOptions
  ) {
    this.QB.AddTargetModel(models, {
      options: [
        {
          event,
          icon,
          label,
          canInteract: handler,
        },
      ],
      distance: 2.5,
    });
  }

  addCoordsToTarget(
    coords: any,
    { radius, name, event, icon, label, handler }: ITargetOptions
  ) {
    this.QB.AddCircleZone(
      name,
      coords,
      radius ?? 2.0,
      {
        name,
        useZ: true,
      },
      {
        options: [
          {
            event: event,
            icon: icon,
            label: label,
            canInteract: handler,
          },
        ],
        distance: radius ?? 2.0,
      }
    );
  }
}
