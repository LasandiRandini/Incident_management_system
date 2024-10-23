import  { useState } from 'react';
import TabMenu from '../components/tab_menu';
import Form_1 from './form1';


const IncidentsManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Add Incident'];
  return (
    <div className="flex">
      
      
      
      <div className="flex-1  bg-customColor p-6">
      <TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {activeTab === 0 && <Form_1 />}

      </div>
      </div>
    </div>
    );
};
export default IncidentsManagement;