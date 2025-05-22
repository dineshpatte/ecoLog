import React from "react";
import Tips from "../components/tip";
import Rewards from "../components/reward";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to EcoLog Dashboard</h2>
      <Rewards />
      <Tips />
    </div>
  );
};

export default Dashboard;
