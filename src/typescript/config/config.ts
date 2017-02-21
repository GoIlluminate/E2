export class Config {
  public readonly port: number;
  public readonly isDevelopment: boolean;

  public constructor(port: number, isDevelopment: boolean) {
    this.port = port;
    this.isDevelopment = isDevelopment;
  }

  public static fromEnv(): Config {
    const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
    const port: number = isDevelopment ?  3000 : process.env.ILLUMINATE_RADPATH_PORT

    return new Config(port, isDevelopment);
  }
}
