import { useEffect, useRef, useState } from "react";
import DomainTable from "./Domaintable";

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [refresh, setRefresh] = useState(0);
  const [domainName, setDomainName] = useState("");
  const [domainType, setDomainType] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [domainTTL, setDomainTTL] = useState(43200);
  const [newDomainName, setNewDomainName] = useState("");
  const [newDomainType, setNewDomainType] = useState("");
  const [newDomainValue, setNewDomainValue] = useState("");
  const [newDomainTTL, setNewDomainTTL] = useState(43200);

  const domains = useRef([]);
  const toggleAddForm = () => {
    setShowUpdateForm(false);
    setDomainName("");
    setDomainType("");
    setDomainValue("");
    setDomainTTL(43200);
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
      window.location.reload();
    } else {
      console.error("Failed to add record");
    }
  };
  const updateDomain = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/dns/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldName: domains.current[updateIndex].name,
        oldType: domains.current[updateIndex].type,
        oldData: domains.current[updateIndex].value,
        oldTtl: domains.current[updateIndex].ttl,
        newName: newDomainName,
        newType: newDomainType,
        newData: newDomainValue,
        newTtl: newDomainTTL,
      }),
    });

    if (response.ok) {
      console.log("Record updated successfully");
      window.location.reload();
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

  const showUpdateRecordForm = () => {
    setShowAddForm(false);
    setShowUpdateForm((prev) => !showUpdateForm);
  };

  const updateRecordIndex = (index) => {
    setUpdateIndex(index);

    setNewDomainName(domains.current[index].name);
    setNewDomainType(domains.current[index].type);
    setNewDomainTTL(domains.current[index].ttl);
    setNewDomainValue(domains.current[index].value);
  };

  return (
    <div
      className="Home bg-transparent h-screen w-screen text-white flex flex-col justify-center items-center pt-10"
      key={refresh}
    >
      <div
        id="update-modal"
        className="fixed w-[600px] h-[500px] bg-zinc-800 rounded-xl border-2 -top-[1000px]"
      ></div>
      <h1 className="text-3xl w-screen mb-8">DNS Manager</h1>
      <button
        onClick={toggleAddForm}
        className="text-xl border-2 rounded-lg p-3"
      >
        Add DNS Record
      </button>
      <div className="Home bg-transparent h-full w-full text-white flex flex-row justify-evenly items-start pt-10">
        <div>
          {showAddForm && (
            <div className="border-r-2 py-5 pr-10">
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

        <DomainTable
          domains={domains.current}
          showForm={showUpdateRecordForm}
          updateRecordIndex={updateRecordIndex}
        />

        <div>
          {showUpdateForm && (
            <div>
              <form className="flex flex-col justify-center items-center">
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Domain Name:</h2>
                  <input
                    className="rounded-md p-1 text-black"
                    type="text"
                    value={newDomainName}
                    onChange={(e) => setNewDomainName(e.currentTarget.value)}
                  />
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Record Type:</h2>
                  <select
                    className="rounded-md py-2 px-5 text-black bg-white"
                    value={newDomainType}
                    onChange={(e) => setNewDomainType(e.currentTarget.value)}
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
                    value={newDomainValue}
                    onChange={(e) => setNewDomainValue(e.currentTarget.value)}
                  />
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Domain TTL:</h2>
                  <input
                    className="rounded-md p-1 text-black"
                    type="number"
                    value={newDomainTTL}
                    onChange={(e) => setNewDomainTTL(e.currentTarget.value)}
                  />
                </label>
                <button
                  onClick={async (event) => await updateDomain(event)}
                  className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit"
                >
                  Update Record
                </button>
                <button
                  onClick={showUpdateRecordForm}
                  className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
