import type { Request, Response } from "express";
import { Router } from "express";
import fs from "node:fs";

export const webRoutes = Router();

webRoutes.get("/", (_: Request, res: Response): Response => {
  return res.send(
    fs.readFileSync("./src/public/index.html", { encoding: "utf8" })
  );
});
