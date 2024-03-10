const dnsController = require("./dnsController");
const express = require("express");
const Router = express.Router;

const dnsRoutes = Router();

dnsRoutes.post("/add", dnsController.addRecord);
dnsRoutes.get("/get", dnsController.getRecords);
dnsRoutes.put("/records/:id", dnsController.updateRecord);
dnsRoutes.delete("/records/:id", dnsController.deleteRecord);

module.exports = dnsRoutes;
