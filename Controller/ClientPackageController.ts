import express, { Request, Response } from "express";
import * as businessservice from "../BusinessService/ClientPackageBusinessService";
const router = express.Router();

router.post("/reviewDocuments", async (req: Request, res: Response) => {
  await businessservice
    .reviewDocuments(req.body)
    .then((x) => res.status(200).send(x))
    .catch((x) => res.status(400).send(x));
});

router.post("/retrieveClientPackageInfo", async (req: Request, res: Response) => {
  await businessservice
    .retrieveClientPackageInfo(req.body)
    .then((x) => res.status(200).send(x))
    .catch((x) => res.status(400).send(x));
});
router.post("/ClientPackageInfoTest", async (req: Request, res: Response) => {
  console.log('req--',req.body)
  await businessservice
    .ClientPackageInfoTest(req.body)
    .then((x) => res.status(200).send(x))
    .catch((x) => res.status(400).send(x));
});
router.get("/ClientPackageInfoTest", async (req: Request, res: Response) => {
  await businessservice
    .ClientPackageInfoTest(req.body)
    .then((x) => res.status(200).send(x))
    .catch((x) => res.status(400).send(x));
});

export default router;