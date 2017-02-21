import { ColorRoute } from "./routes/color"
import { Router } from "express";

export class Routes {
  readonly router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  public registerRoutes() {
    // I don't see any clean way to do this using OOP
    ColorRoute.registerRoutes(this.router);
  }
}
