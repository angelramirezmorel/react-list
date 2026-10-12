import express, { Request, Response, NextFunction } from "express";
import { Server as HServer } from "http";
import Router from "./router";

export default class Server {
  private app: express.Application;
  private httpServer: HServer;
  private port: string;

  constructor(port: string) {
    this.port = port;
    this.app = express();
    this.httpServer = new HServer(this.app);

    this.app.use(express.json());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });

    const router = new Router(this.app);
    router.initRoutes();
  }

  public start(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
