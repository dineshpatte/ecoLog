import React from "react";
import Tips from "../components/tip";
import Rewards from "../components/reward";
import CarbonTrendChart from "../components/carbonChart";
import ActivityChart from "../components/activitysummary";


const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to EcoLog Dashboard</h2>
      <Rewards />
      <Tips />

      <div className="p-6">
      <CarbonTrendChart />
    </div>
     <div className="p-6">
      <ActivityChart />
    </div>
   
    </div>
  );
};

export default Dashboard;
