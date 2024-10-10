const Form_3 = () => {
    return (
      <form className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Progress Status</label>
          <div className="mt-2 flex space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="notAssigned"
                name="status"
                value="Not Assigned"
                className="mr-2"
              />
              <label htmlFor="notAssigned" className="text-sm font-medium text-gray-700">
                Not Assigned
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="assigned"
                name="status"
                value="Assigned"
                className="mr-2"
              />
              <label htmlFor="assigned" className="text-sm font-medium text-gray-700">
                Assigned
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="completed"
                name="status"
                value="Completed"
                className="mr-2"
              />
              <label htmlFor="completed" className="text-sm font-medium text-gray-700">
                Completed
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="declined"
                name="status"
                value="Declined"
                className="mr-2"
              />
              <label htmlFor="declined" className="text-sm font-medium text-gray-700">
                Declined
              </label>
            </div>
          </div>
        </div>
  
        {/* Buttons Section */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Save
          </button>
          <button
            type="button"
            className="py-2 px-6 bg-gray-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-600 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
  
  export default Form_3;
  