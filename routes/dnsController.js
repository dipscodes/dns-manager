import { dns } from "@google-cloud/dns";

const projectId = "your-cloud-id";
const zoneName = "your-zone-name";
const dnsClient = new dns.DNS({ projectId });

export async function addRecord(req, res) {
  const { domain, type, value } = req.body;

  const zone = dnsClient.zone(zoneName);
  const record = zone.record(domain, type, value);

  try {
    await zone.addRecords(record);
    res.status(201).send("Record added successfully");
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).send("Error adding record");
  }
}

export async function getRecords(req, res) {
  const zone = dnsClient.zone(zoneName);

  try {
    const [records] = await zone.getRecords();
    res.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send("Error fetching records");
  }
}

export async function updateRecord(req, res) {
  const { id } = req.params;
  const { domain, type, value } = req.body;

  const zone = dnsClient.zone(zoneName);
  const record = zone.record(domain, type, value);

  try {
    await zone.replaceRecords(id, record);
    res.status(200).send("Record updated successfully");
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send("Error updating record");
  }
}

export async function deleteRecord(req, res) {
  const { id } = req.params;

  const zone = dnsClient.zone(zoneName);

  try {
    await zone.deleteRecords(id);
    res.status(200).send("Record deleted successfully");
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send("Error deleting record");
  }
}
