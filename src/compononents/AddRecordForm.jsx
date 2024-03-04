const AddRecordForm = () => {
  return (
    <div>
      <form className="flex flex-col justify-center items-center">
        <label className="p-1 mb-3">
          <h2 className="mb-3">Domain Name:</h2> <input className="rounded-md" type="text" />
        </label>
        <label className="p-1 mb-3">
          <h2 className="mb-3">Record Type:</h2> <input className="rounded-md" type="text" />
        </label>
        <label className="p-1 mb-3">
          <h2 className="mb-3">Record Value:</h2> <input className="rounded-md" type="text" />
        </label>
        <button type="submit"  className="text-xl border-2 rounded-lg p-3 my-3 max-w-fit">Add Record</button>
      </form>
    </div>
  );
};

export default AddRecordForm;
