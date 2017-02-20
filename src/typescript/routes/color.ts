"use strict"
import express = require("express");
const color = require("../controllers/color");

class ColorRoute {
  constructor(app : express.Express) {
    var self = ColorRoute;
    self.generateRoutes(app);
  }

  public static generateRoutes(app : express.Express) : void {
    app.get("/color", color.getColor);
  }
  
}

module.exports = ColorRoute;

