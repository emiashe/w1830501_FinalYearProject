//w1830501
// Main layout wrapper for the dashboard with sidebar integration

import React, { useState } from 'react';
import '../../App.css';
import Sidebar from './Sidebar/Sidebar';

const Dashboard = () => {
  // State to track which sidebar link is active
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);

  return (
    <div>
      {/* Sidebar with current active link */}
      <Sidebar activeLinkIdx={activeLinkIdx} setActiveLinkIdx={setActiveLinkIdx} />
    </div>
  );
};

export default Dashboard;
