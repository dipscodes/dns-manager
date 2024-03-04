import { dns } from "@google-cloud/dns";

const projectId = "chita-405108";
const zoneName = "your-zone-name";
const dnsClient = new dns.DNS({ projectId });

// Function to add a DNS record
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

// Function to get all DNS records
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

// Function to update a DNS record
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

// Function to delete a DNS record
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
