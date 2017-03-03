import { Config } from "../config/config"
import { Routes } from "../routes"
import * as express from "express"
import { join } from "path"

export class ExpressApp {
  readonly config: Config;
  readonly app: express.Express;

  constructor(config: Config) {
    this.config = config;
    this.app = express()
    this.app.set('json spaces', 2)

    const router = express.Router();
    const routes = new Routes();
    routes.registerRoutes(router);
    this.app.use(router);

    // Configure the Elm client
    if (config.isDevelopment) {
      require('../webpackServeBundle')(this.app)
    } else {
      this.app.use(express.static(join(__dirname, '/../dist')))
      this.app.get('*', (req, res) =>
            res.sendFile(join(__dirname, '/../dist/index.html')))
    }
  }

  // Start Express
  public startApp() {
    this.app.listen(this.config.port, err => {
      if (err) console.log(err)
      console.log(`⚡  Express started on port ${this.config.port}`)
    })
  }
}
