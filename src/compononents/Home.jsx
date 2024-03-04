import { useState } from "react";
import DomainTable from "./Domaintable";
import AddRecordForm from "./AddRecordForm";

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="Home bg-transparent h-screen w-screen text-white flex flex-col justify-center items-center pt-10">
      <h1 className="m-5 text-3xl w-screen">DNS Manager</h1>
      <div className="Home bg-transparent h-full w-full text-white flex flex-row justify-evenly items-start pt-10">
        <div>
          <button
            onClick={toggleAddForm}
            className="text-xl border-2 rounded-lg p-3 my-3"
          >
            Add DNS Record
          </button>
          {showAddForm && <AddRecordForm />}
        </div>

        <DomainTable />
      </div>
    </div>
  );
}

export default Home;
