import { useRef, useState } from "react";
import DomainTable from "./Domaintable";

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const domains = useRef([]);
  const [domainName, setDomainName] = useState("");
  const [domainType, setDomainType] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  const addDomain = () => {
    domains.current.push({name: domainName, type: domainType, value: domainValue});
    console.log(domains.current)
    setRefresh((prev)=>(prev + 1)%2);
  };

  return (
    <div className="Home bg-transparent h-screen w-screen text-white flex flex-col justify-center items-center pt-10" key={refresh}>
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
                  <input className="rounded-md p-1 text-black" type="text" value={domainName} onChange={(e) => setDomainName(e.currentTarget.value)}/>
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Record Type:</h2>
                  <input className="rounded-md p-1 text-black" type="text" value={domainType} onChange={(e) => setDomainType(e.currentTarget.value)}/>
                </label>
                <label className="p-1 mb-3">
                  <h2 className="mb-3">Record Value:</h2>
                  <input className="rounded-md p-1 text-black" type="text" value={domainValue} onChange={(e) => setDomainValue(e.currentTarget.value)}/>
                </label>
                <button
                  type="submit"
                  onClick={addDomain}
                  className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit"
                >
                  Add Record
                </button>
              </form>
            </div>
          )}
        </div>

        <DomainTable domains={domains.current}/>
      </div>
    </div>
  );
}

export default Home;
