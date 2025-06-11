import React, { useState } from 'react';
import CreateCampaignForm from './CreateCampaignForm';
import CampaignList from './CampaignList';  // (optional, if you create this component)

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleCampaignCreated = () => {
    setRefresh(!refresh);  // toggle refresh to update campaign list
  };

  return (
    <div>
      <h1>Welcome to CrowdFunding</h1>
      <CreateCampaignForm onCampaignCreated={handleCampaignCreated} />
      {/* Pass refresh as key or prop to refresh CampaignList */}
      <CampaignList key={refresh} />  
    </div>
  );
}
