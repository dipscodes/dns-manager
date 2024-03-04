import { addRecord, getRecords, updateRecord, deleteRecord } from "../controllers/dnsController";
import { Router } from "express";
const router = Router();

// CRUD operations for DNS records
router.post("/records", addRecord);
router.get("/records", getRecords);
router.put("/records/:id", updateRecord);
router.delete("/records/:id", deleteRecord);

export default router;
