import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { AuthenticationFactory } from "./modules/authentication/authenticationFactory";
import { AuthenticationBase } from "./modules/authentication/authenticationBase";
import { DatasetsFactory } from "./modules/dataSets/dataSetsFactory"
import { DataSet } from "./models/dataSet";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "3000";
const productName = "Cali's Classification Server V.0001";

// Authentication middle-ware
app.use(express.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).send("Authorization header is required");
  const { create, getKeys } = AuthenticationFactory();
  const keys = getKeys();
  const authenticators = keys.map((k) => create(k));
  const authenticator = authenticators.find(async (a: AuthenticationBase) => await a.supports(authorization));
  if (!authenticator)
    return res.status(400).send("Cannot find an authenticator");
  await authenticator.authenticate(authorization);
  next();
});

const index = (_: Request, res: Response) => {
  res.send(`${productName}`);
};
app.get("/", index);

const getDataSet = async (req: Request, res: Response) => {
  const name = req.params["name"]
  const dataSetsModule = DatasetsFactory().create("memory");
  const dataSet = await dataSetsModule.get(name)
  res.send(dataSet);
};
app.get("/datasets/name/:name", getDataSet);

const addDataSet = (req: Request, res: Response) => {
  const dataSet = req.body as DataSet;
  const dataSetsModule = DatasetsFactory().create("memory");
  dataSetsModule.add(dataSet);
  res.send(`${productName}`);
};
app.post("/datasets", addDataSet);



const server = app.listen(port, () => {
  console.log(`⚡️⚡️${productName} is running at http://localhost:${port}`); ``
});

export default app;
export { server, index, getDataSet, addDataSet };
