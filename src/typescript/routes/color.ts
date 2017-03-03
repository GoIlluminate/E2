import { Router, Request, Response } from "express"
import { ColorController } from "../controllers/color"
import { SubRoute }  from "../subRoute"

export class ColorRoute implements SubRoute {
  public constructor() {
  }

  public registerRoutes(router : Router) {
    router.get('/color', this.getColor);
  }

  public getColor(req: Request, res: Response) {
    const color = ColorController.getColor();
    return res.json(color)
  }
}
