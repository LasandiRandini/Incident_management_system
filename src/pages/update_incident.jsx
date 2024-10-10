
const Form_3 = () => {
    // const [selectedStatus, setSelectedStatus] = React.useState("");
    // const handleCheckboxChange = (event) => {
    //     setSelectedStatus(event.target.value);
    // };
    return (
        <form className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Incident</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Incident Type</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Tel.No.</label>
              <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Email</label>
              <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Incident Description</label>
              <textarea className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Employee</label>
              <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option>Employee 1</option>
                <option>Employee 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee Name</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee Department</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Progress Status</label>
            <div className="mt-2 flex space-x-4">
              <div>
                <input type="radio" id="notAssigned" name="status" value="Not Assigned" className="mr-2" />
                <label htmlFor="notAssigned" className="text-sm font-medium text-gray-700">Not Assigned</label>
              </div>
              <div>
                <input type="radio" id="assigned" name="status" value="Assigned" className="mr-2" />
                <label htmlFor="assigned" className="text-sm font-medium text-gray-700">Assigned</label>
              </div>
              <div>
                <input type="radio" id="completed" name="status" value="Completed" className="mr-2" />
                <label htmlFor="completed" className="text-sm font-medium text-gray-700">Completed</label>
              </div>
              <div>
                <input type="radio" id="declined" name="status" value="Declined" className="mr-2" />
                <label htmlFor="declined" className="text-sm font-medium text-gray-700">Declined</label>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg">Save</button>
            <button type="button" className="py-2 px-4 bg-red-500 text-white rounded-md shadow-lg">Cancel</button>
          </div>
        </form>
    );
};
export default Form_3;