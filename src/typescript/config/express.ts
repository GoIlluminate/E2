"use strict"

import config = require("../config/config")
import express = require("express")
import async = require("async")
import path = require("path")

module.exports = function(db) {
    var app: express.Express = express()
    app.set('json spaces', 2)
    app.use(express.static(path.join(__dirname, "../src/public")))

    // Routes
    /*for(var route of config.globFiles(config.routes)) {
        require(path.resolve(route))(app)
    }*/
    
    return app
};