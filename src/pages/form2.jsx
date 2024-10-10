
// const Form_2 = () => {
//   return (
//     <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Select Employee</label>
//         <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//           <option>Employee 1</option>
//           <option>Employee 2</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Employee Name</label>
//         <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Employee Department</label>
//         <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Email Address</label>
//         <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//         <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Assign Date</label>
//         <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Due Date</label>
//         <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//       </div>
//       <div className="flex space-x-4">
//         <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg">Save</button>
//         <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-lg">Next</button>
//         <button type="button" className="py-2 px-4 bg-red-500 text-white rounded-md shadow-lg">Cancel</button>
//       </div>
//     </form>
//   );
// };
// export default Form_2;
const Form_2 = () => {
    return (
      <form className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
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
        </div>
  
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Department</label>
            <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input type="tel" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assign Date</label>
            <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
  
        <div className="flex space-x-4 justify-end">
          <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-md shadow-lg">Save</button>
          
          <button type="button" className="py-2 px-6 bg-red-500 text-white rounded-md shadow-lg">Cancel</button>
        </div>
      </form>
    );
  };
  
  export default Form_2;
  