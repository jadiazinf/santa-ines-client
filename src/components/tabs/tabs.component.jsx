import { InfoIcon } from "../../assets";

export const TabsComponent = ({tabs, activeTab, setActiveTab}) => {
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
          <div className="absolute bg-red-400">
            <div className="w-5 h-5 bg-white  border-black z-50 absolute"></div>
            <InfoIcon infoToSearch={'users'} className={'absolute z-10'} />
          </div>

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