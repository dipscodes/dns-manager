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
  // sample record
  // const newRecord = zone.record("A", {
  //   name: "vikramadityacodes.in.",
  //   data: "198.51.100.99",
  //   ttl: 43200,
  // });
  const newRecord = zone.record(type, {
    name: name.endsWith(".") ? name : name + ".",
    data: data,
    ttl: ttl,
  });

  console.log(name, name.endsWith(".") ? name : name + ".");

  try {
    zone.createChange({ add: newRecord }, (err, change, apiResponse) => {});
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
    name: oldName.endsWith(".") ? oldName : oldName + ".",
    data: [oldData],
    ttl: oldTtl,
  });
  const newRecord = zone.record(newType, {
    name: newName.endsWith(".") ? newName : newName + ".",
    data: [newData],
    ttl: newTtl,
  });

  // console.log(oldName.endsWith(".") ? oldName : oldName + ".");
  // console.log(newName.endsWith(".") ? newName : newName + ".");

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
    name: name.endsWith(".") ? name : name + ".",
    data: [data],
    ttl: ttl,
  });

  // console.log(name.endsWith(".") ? name : name + ".");

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
