import { Config } from "./config/config"
import { ExpressApp } from "./config/express"

const conf = Config.fromEnv();
const app = new ExpressApp(conf);
console.log ("CONFIG: " + JSON.stringify(conf));

// Starting express
if (!module.parent) {
  app.startApp();
}
