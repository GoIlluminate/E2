"use strict"
import glob = require("glob")
import _ = require("lodash")

class Config {
    public static port: number = 3000
    public static routes = "routes/**/*.js"

    public static globFiles(location: string) : Array<string> {
        var files = glob.sync(location)
        var output: Array<string> = []
        output = _.union(output, files)
        return output
    }
}

export = Config