import React from "react";
import Header from "../component/header";

const Dashboard = () => {
  return (
    <div className="flex h-fullscreen bg-[#F9F4F4]">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header pageName="Dashboard" databaseName="Home / Dashboard" notifications={3} />

        {/* Kontainer Konten Kosong */}
        <div className="p-4">
          {/* Konten kosong */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
