import  { useState } from 'react';
import TabMenu from '../components/tab_menu';
import Form_1 from './form1';
import Form_2 from './form2';
import Form_3 from './form3';

const IncidentsManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Add Incident', 'Assign Employee', 'Update Status'];
  return (
    <div className="flex">
      
      
      
      <div className="flex-1  bg-customColor h-screen p-6">
      <TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {activeTab === 0 && <Form_1 />}
        {activeTab === 1 && <Form_2 />}
        {activeTab === 2 && <Form_3 />}
      </div>
      </div>
    </div>
    );
};
export default IncidentsManagement;