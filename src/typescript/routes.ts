import { ColorRoute } from "./routes/color"
import { SubRoute } from "./subRoute"
import { Router } from "express";

export class Routes implements SubRoute {
  readonly colorRoute : ColorRoute;

  constructor() {
    this.colorRoute = new ColorRoute();
  }

  public registerRoutes(router: Router) {
    this.colorRoute.registerRoutes(router);
  }
}
