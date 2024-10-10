
import SLTLogo from '../assets/SLT_logo.png'; 

const Customer_login = () => {
    return (
        
        <div className="min-h-screen bg-gradient-to-b from-[#0F407B] to-[#24AF77] flex flex-col justify-center items-center">
            <div className="flex justify-between w-full max-w-6xl p-3">
                <div className="w-1/3 p-4 space-y-5">
                    <h2 className="text-3xl font-semibold text-gray-400">Track your Incident Status</h2>
                    <div className="flex items-center space-x-3">
                        <span className="material-icons text-gray-200">description</span>
                        <p className="text-gray-300">Request incident progress</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="material-icons text-gray-200">email</span>
                        <p className="text-gray-300">Get progress report via email</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="material-icons text-gray-200">lock</span>
                        <p className="text-gray-300">Log in and check incident status</p>
                    </div>
                </div>
                
                <div className="w-2/3 bg-blue-200 p-8 shadow-md rounded-lg">
                    <img src={SLTLogo} alt="SLT Logo" className="h-40 mb-6 mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Request Incident Status</h3>
                    <p className="text-gray-500 text-center mb-8">
                        A code will be sent to the email .
                    </p>
                    <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg w-full hover:bg-green-700"
                      onClick={() => window.location.href = '/progress'}>
                        Send the Code
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have the code? <a href="#" className="text-blue-600">Check status</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Customer_login;
