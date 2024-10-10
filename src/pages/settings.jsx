const feedbackData = [
    {
      id: 1,
      customerName: "John Doe",
      rating: 5,
      comment: "Great service! Highly satisfied.",
      date: "2024-09-01",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      rating: 4,
      comment: "Good, but room for improvement.",
      date: "2024-09-10",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      rating: 2,
      comment: "Not very satisfied with the response time.",
      date: "2024-09-15",
    },
    // Add more feedback objects here
  ];
  
  const Settings = () => {
    return (
      
      <div className="flex flex-col w-full bg-gray-100 min-h-screen p-6">
        <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
          <h1><b>Settings</b></h1>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          

          
        </div>
      </div>
    );
  };
  
  export default Settings;
  