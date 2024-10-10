
import { useState } from 'react';
import SLTLogo from '../assets/SLT_logo.png';

const TrackIncident = () => {
    const customer = {
        name: "John Doe",
        phone: "+94 77 123 4567",
    };

    const incidents = [
        {
            id: 1,
            title: "Signal Interrupt",
            date: "2024-05-31",
            status: "New",
            description: "A signal interruption occurred at the main site, affecting service delivery.",
        },
        {
            id: 2,
            title: "Signal Interception",
            date: "2024-05-01",
            status: "Assigned",
            description: "Signal interception detected. Further analysis is required.",
        },
    ];

    // Status stages
    const statusStages = ["New", "Assigned", "Not Assigned", "Completed", "Declined"];

    // Feedback state
    const [feedback, setFeedback] = useState({
        rating: '',
        comment: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", feedback);
        alert("Thank you for your feedback!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F407B] to-[#24AF77] flex flex-col">
            <header className="bg-white shadow p-3">
                <div className="flex items-center">
                    <img src={SLTLogo} alt="SLT Logo" className="h-17 w-20" />
                    <h1 className="text-2xl font-bold text-gray-700 ml-4">Track Your Complain</h1>
                </div>
            </header>

            <div className="flex flex-grow p-10">
                {/* Left Section - Progress Status and Feedback */}
                <div className="w-1/3 bg-blue-200 bg-opacity-85 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Progress Status</h2>
                    <div className="flex flex-col">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="flex items-center mb-4">
                                <div
                                    className={`h-4 w-4 rounded-full ${
                                        incident.status === "New"
                                            ? 'bg-green-600'
                                            : incident.status === "Assigned"
                                            ? 'bg-blue-600'
                                            : incident.status === "Not Assigned"
                                            ? 'bg-gray-400'
                                            : incident.status === "Completed"
                                            ? 'bg-yellow-600'
                                            : 'bg-red-600'
                                    }`}
                                />
                                <span className="ml-2 text-gray-700 font-medium">{incident.title}</span>
                                <span
                                    className={`ml-auto text-gray-600 ${
                                        incident.status === "New"
                                            ? 'text-green-600'
                                            : incident.status === "Assigned"
                                            ? 'text-blue-600'
                                            : incident.status === "Not Assigned"
                                            ? 'text-gray-400'
                                            : incident.status === "Completed"
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {incident.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Feedback Form */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-700">Provide Your Feedback</h3>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2">
                                    How satisfied are you with our service?
                                </label>
                                <div className="flex justify-between">
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value="1"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span role="img" aria-label="very unsatisfied">😠</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value="2"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span role="img" aria-label="unsatisfied">😟</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value="3"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span role="img" aria-label="neutral">😐</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value="4"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span role="img" aria-label="satisfied">🙂</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value="5"
                                            onChange={handleInputChange}
                                            className="hidden"
                                        />
                                        <span role="img" aria-label="very satisfied">😃</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2">Comment</label>
                                <textarea
                                    name="comment"
                                    value={feedback.comment}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Leave a comment..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Section - Incident Details */}
                <div className="w-2/3 ml-6 bg-blue-200 bg-opacity-80 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Incident Details</h2>
                    {incidents.map((incident) => (
                        <div key={incident.id} className="border-b border-gray-300 py-4">
                            <h4 className="text-gray-700 font-semibold">{incident.title}</h4>
                            <p className="text-gray-500 text-sm">Date: {incident.date}</p>
                            <p
                                className={`text-sm ${
                                    incident.status === "New"
                                        ? 'text-green-600'
                                        : incident.status === "Assigned"
                                        ? 'text-blue-600'
                                        : incident.status === "Not Assigned"
                                        ? 'text-gray-400'
                                        : incident.status === "Completed"
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                }`}
                            >
                                Status: {incident.status}
                            </p>
                            <p className="text-gray-600 mt-2">{incident.description}</p>
                        </div>
                    ))}

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700">Customer Details</h3>
                        <p className="text-gray-600"><strong>Name:</strong> {customer.name}</p>
                        <p className="text-gray-600"><strong>Phone Number:</strong> {customer.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackIncident;
