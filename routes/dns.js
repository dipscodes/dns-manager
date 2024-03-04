// routes/dns.js

const express = require("express");
const router = express.Router();
const {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/dnsController");

// CRUD operations for DNS records
router.post("/records", addRecord);
router.get("/records", getRecords);
router.put("/records/:id", updateRecord);
router.delete("/records/:id", deleteRecord);

module.exports = router;
