import { useState } from "react";
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  const [sidebarBoolean, setSidebarBoolean] = useState<boolean>(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarBoolean}
        setSidebarOpen={setSidebarBoolean}
      />
      {/* 
      <Content
        // Header={
        //   <WelcomeBanner messageTitle="" messageContent="" SVG={<MainSVG />} />
        // }
      /> */}
    </div>
  );
};
