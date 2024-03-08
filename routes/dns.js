import {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "./dnsController";
import { Router } from "express";
const dnsRoutes = Router();

dnsRoutes.post("/records", addRecord);
dnsRoutes.get("/records", getRecords);
dnsRoutes.put("/records/:id", updateRecord);
dnsRoutes.delete("/records/:id", deleteRecord);

export default dnsRoutes;
