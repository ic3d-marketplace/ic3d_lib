import type { ITarget, ITargetOptions } from "@client/interfaces/target";

export class QBTarget implements ITarget {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private QB: any = null;

  constructor() {
    this.QB = exports["qb-target"];
  }

  static detect(): boolean {
    return GetResourceState("qb-target") == "started";
  }

  addModelToTarget(
    model: any,
    { event, icon, label, handler }: ITargetOptions
  ) {
    this.QB.AddTargetModel([model], {
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
