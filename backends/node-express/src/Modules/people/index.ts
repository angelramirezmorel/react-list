import { Request, Response, Router } from "express";
import * as fs from "fs";
import * as path from "path";
import { Person } from "../../DataObjects/people/Person";

const dataPath = path.join(__dirname, "..", "..", "..", "..", "..", "data", "people.json");
const peopleJson: Person[] = JSON.parse(fs.readFileSync(dataPath, "utf8"));

export default class PeopleController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.getPeople);
    this.router.get("/:id", this.getPersonById);
  }

  private getPeople(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));

    const results = peopleJson;

    const total = results.length;
    const offset = (page - 1) * limit;
    const data = results.slice(offset, offset + limit);

    res.json({ data, meta: { total, page, limit } });
  }

  private getPersonById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= peopleJson.length) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(peopleJson[id]);
  }
}
