import { useEffect, useRef, useState } from "react";
import DomainTable from "./Domaintable";

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const domains = useRef([]);
  const [domainName, setDomainName] = useState("");
  const [domainType, setDomainType] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [domainTTL, setDomainTTL] = useState(43200);
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/dns/get");
      const listOfRecords = await response.json();
      domains.current = [];
      listOfRecords.forEach((element) => {
        const domainName = element.name;
        const domainType = element.type;
        const domainValue = element.rrdatas;
        const domainTTL = element.ttl;
        domains.current.push({
          name: domainName,
          type: domainType,
          value: domainValue,
          ttl: domainTTL,
        });
      });
      console.log(listOfRecords);
      setRefresh((prev) => (prev + 1) % 2);
    })();
  }, []);

  const addDomain = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/dns/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domainName,
        type: domainType,
        data: domainValue,
        ttl: domainTTL,
      }),
    });

    if (response.ok) {
      console.log("Record added successfully");
      setDomainName("");
      setDomainType("");
      setDomainValue("");
      setDomainTTL(43200);
      domains.current.push({
        name: domainName,
        type: domainType,
        value: domainValue,
        ttl: domainTTL,
      });
      setRefresh((prev) => (prev + 1) % 2);
    } else {
      console.error("Failed to add record");
    }
  };

  const recordTypes = [
    "A",
    "AAAA",
    "CNAME",
    "TXT",
    "MX",
    "NS",
    "PTR",
    "SRV",
    "SOA",
  ];

  return (
    <div
      className="Home bg-transparent h-screen w-screen text-white flex flex-col justify-center items-center pt-10"
      key={refresh}
    >
      <h1 className="m-5 text-3xl w-screen">DNS Manager</h1>
      <div className="Home bg-transparent h-full w-full text-white flex flex-row justify-evenly items-start pt-10">
        <div>
          <button
            onClick={toggleAddForm}
            className="text-xl border-2 rounded-lg p-3 my-3"
          >
            Add DNS Record
          </button>
          {showAddForm && (
            <div>
              <form className="flex flex-col justify-center items-center">
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Domain Name:</h2>
                  <input
                    className="rounded-md p-1 text-black"
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.currentTarget.value)}
                  />
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Record Type:</h2>
                  <select
                    className="rounded-md py-2 px-5 text-black bg-white"
                    value={domainType}
                    onChange={(e) => setDomainType(e.currentTarget.value)}
                  >
                    <option value="">Select Type</option>
                    {recordTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Domain Value:</h2>
                  <input
                    className="rounded-md p-1 text-black"
                    type="text"
                    value={domainValue}
                    onChange={(e) => setDomainValue(e.currentTarget.value)}
                  />
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Domain TTL:</h2>
                  <input
                    className="rounded-md p-1 text-black"
                    type="number"
                    value={domainTTL}
                    onChange={(e) => setDomainTTL(e.currentTarget.value)}
                  />
                </label>
                <button
                  onClick={async (event) => await addDomain(event)}
                  className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit"
                >
                  Add Record
                </button>
              </form>
            </div>
          )}
        </div>

        <DomainTable domains={domains.current} />
      </div>
    </div>
  );
}

export default Home;
