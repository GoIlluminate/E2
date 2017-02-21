import * as express from "express"
import { ColorController } from "../controllers/color"

export class ColorRoute {
  private constructor() {
  }

  public static registerRoutes(router : express.Router) {
    router.get('/color', this.getColor);
  }

  public static getColor(req: express.Request, res: express.Response) {
    const color = ColorController.getColor();
    return res.json(color)
  }
}
