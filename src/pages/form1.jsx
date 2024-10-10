
// const Form = () => {
//   return (
//     <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Department</label>
//       <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//         <option>Department 1</option>
//         <option>Department 2</option>
//       </select>
//       </div>
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Incident Title</label>
//       <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Customer Name</label>
//       <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Customer Tel.</label>
//       <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Customer Email</label>
//       <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//       <label className="block text-sm font-medium text-gray-700">Incident Description</label>
//       <textarea className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="5"></textarea>
//       </div>
//       <div className="flex space-x-4">
//       <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg">Save</button>
//       <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-lg">Next</button>
//       <button type="button" className="py-2 px-4 bg-red-500 text-white rounded-md shadow-lg">Cancel</button>
//       </div>
//     </form>
//     );
// };
// export default Form;

const Form = () => {
    return (
      <form className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>IT Department</option>
              <option>Networking Department</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Incident Title</label>
            <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Tel.</label>
            <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Email</label>
          <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Incident Description</label>
          <textarea className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="5"></textarea>
        </div>
        <div className="flex space-x-4 justify-end">
          <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-md shadow-lg">Save</button>
          <button type="button" className="py-2 px-6 bg-gray-500 text-white rounded-md shadow-lg">Next</button>
          <button type="button" className="py-2 px-6 bg-red-500 text-white rounded-md shadow-lg">Cancel</button>
        </div>
      </form>
    );
  };
  
  export default Form;
  
  