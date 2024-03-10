const { DNS } = require("@google-cloud/dns");
const projectId = "chita-405108";
const zoneName = "zone1";
const keyFilename = "C:\\Users\\dipsg\\Downloads\\chitra.json";
const dnsClient = new DNS({
  projectId,
  keyFilename,
});

async function addRecord(req, res) {
  const { type, name, data, ttl } = req.body;
  const zone = dnsClient.zone(zoneName);
  const newARecord = zone.record(type, {
    name: name,
    data: data,
    ttl: ttl,
  });

  try {
    zone.createChange({ add: newARecord }, (err, change, apiResponse) => {});
    res.status(200).send("Record added successfully");
  } catch (error) {
    console.error("Error adding DNS record:", error);
  }
}

async function getRecords(req, res) {
  const zone = dnsClient.zone(zoneName);

  try {
    const [records] = await zone.getRecords();
    res.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send("Error fetching records");
  }
}

async function updateRecord(req, res) {
  const {
    oldName,
    oldType,
    oldData,
    oldTtl,
    newName,
    newType,
    newData,
    newTtl,
  } = req.body;
  const zone = dnsClient.zone(zoneName);
  const oldRecord = zone.record(oldType, {
    name: oldName,
    data: [oldData],
    ttl: oldTtl,
  });
  const newRecord = zone.record(newType, {
    name: newName,
    data: [newData],
    ttl: newTtl,
  });

  try {
    zone.createChange(
      {
        add: newRecord,
        delete: oldRecord,
      },
      (err, change, apiResponse) => {}
    );
    res.status(200).send("Record updated successfully");
  } catch (error) {
    console.error("Error adding DNS record:", error);
  }
}

async function deleteRecord(req, res) {
  const { type, name, data, ttl } = req.body;
  const zone = dnsClient.zone(zoneName);
  const oldRecord = zone.record(type, {
    name: name,
    data: [data],
    ttl: ttl,
  });

  try {
    zone.createChange({ delete: oldRecord }, (err, change, apiResponse) => {});
    res.status(200).send("Record deleted successfully");
  } catch (error) {
    console.error("Error adding DNS record:", error);
  }
}
module.exports = {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};
