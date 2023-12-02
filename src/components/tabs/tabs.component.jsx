import { DatatableComponent, DoctorInfo } from '..';
import { useState } from 'react';
import { TableComponent } from '../table/table.component';
import { useSelector } from 'react-redux';

export const TabsComponent = ({tabs, activeTab, setActiveTab}) => {
const { doctor } = useSelector( state => state.saveDoctors)
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className='space-y-2 w-[70%]'>
      <div className='space-y-5'>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
          {tabs.map((tab) => (
            <li className="mr-2" key={tab.id} role="presentation">
              <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? "border-primary" : ""}`} id={`${tab.id}-tab`} data-tabs-target={`#${tab.id}`} type="button" role="tab" aria-controls={tab.id} aria-selected={activeTab === tab.id} onClick={() => handleTabClick(tab.id)}>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div>
          {tabs.map((tab) => (
          <div className={`${activeTab === tab.id ? "block" : "hidden"}`} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`} key={tab.id}>
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}