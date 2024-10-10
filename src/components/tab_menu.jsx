
const TabMenu = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 rounded-t-lg rounded-b-lg">
        <h1><b>Incidents Management</b></h1>
      </div>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-green-500' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
export default TabMenu;