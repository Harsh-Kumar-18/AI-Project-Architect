import React, { useState } from "react";

const OutputTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(
    tabs[0]?.id
  );

  const currentTab = tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-gray-200">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6
              py-4
              whitespace-nowrap
              font-medium
              transition
              cursor-pointer

              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }
            `}
          >
            {tab.label}
          </button>
        ))}

      </div>

      {/* Tab Content */}
      <div className="p-6">
        {currentTab?.content}
      </div>

    </div>
  );
};

export default OutputTabs;