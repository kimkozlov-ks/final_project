import {RoutePoint} from "./RoutePoint";

export class Route{
  name: string;
  points: RoutePoint[];

  constructor() {
    this.points = [];
  }
}
