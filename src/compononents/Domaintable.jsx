const DomainTable = ({ domains, showForm, updateRecordIndex }) => {
  const deleteRecord = async (event, index) => {
    event.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete?")) {
      const response = await fetch("http://localhost:3000/api/dns/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domains[index].name,
          type: domains[index].type,
          data: domains[index].value,
          ttl: domains[index].ttl,
        }),
      });

      if (response.ok) {
        console.log("Record added successfully");
        window.location.reload();
      } else {
        console.error("Failed to add record");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h2 className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit">
        Domains
      </h2>
      <table className="w-full">
        <thead className="border-b-2 border-slate-950 h-[50px]">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(domains ?? []).map((domain, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{domain.name}</td>
              <td>{domain.type}</td>
              <td>{domain.value}</td>
              <td>
                <button
                  className="text-lg border-2 rounded-lg p-2 mx-2 my-3 max-w-fit"
                  onClick={(event) => {
                    event.preventDefault();
                    showForm();
                    updateRecordIndex(index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async (event) => await deleteRecord(event, index)}
                  className="text-lg border-2 rounded-lg p-2 mx-2 my-3 max-w-fit"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainTable;
