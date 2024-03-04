
const DomainTable = ({domains}) => {
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h2 className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit">Domains</h2>
      <table className="w-full">
        <thead className="border-b-2 border-slate-950 h-[50px]">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(domains??[]).map((domain, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{domain.name}</td>
              <td>{domain.type}</td>
              <td>{domain.value}</td>
              <td>
                <button className="text-lg border-2 rounded-lg p-2 mx-2 my-3 max-w-fit">Edit</button>
                <button className="text-lg border-2 rounded-lg p-2 mx-2 my-3 max-w-fit">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainTable;