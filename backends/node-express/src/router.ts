import { Application } from "express";
import PeopleController from "./Modules/people";

export default class Router {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public initRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ status: "ok", service: "fullstack-list-backend" });
    });

    this.app.use("/people", new PeopleController().router);
  }
}
