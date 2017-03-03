import { Router } from "express"

export interface SubRoute {
  /**
   *  Register your routes here.
   */
  registerRoutes(router : Router);
}
