import { Tabs, Tab, TabsHeader } from "@material-tailwind/react";

export default function TabsComponent({ tabs, selectedTab, setSelectedTab }) {
  return (
    <Tabs value={selectedTab} className="my-2">
      <TabsHeader>
        {Object.keys(tabs).map((tab) => (
          <Tab
            key={tab}
            value={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${selectedTab === tab && "font-medium text-black"} text-sm`}
          >
            {tab}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
