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

const FeedbackList = () => {
  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customer Feedback</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 text-sm font-medium">Customer Name</th>
              <th className="p-4 text-sm font-medium">Rating</th>
              <th className="p-4 text-sm font-medium">Comment</th>
              <th className="p-4 text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-800">{feedback.customerName}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-white ${feedback.rating >= 4 ? 'bg-green-500' : feedback.rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {feedback.rating}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{feedback.comment}</td>
                <td className="p-4 text-gray-600">{feedback.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
