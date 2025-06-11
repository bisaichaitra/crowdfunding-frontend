'use client';
import React, { useEffect, useState } from 'react';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/campaigns/list/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch campaigns');
        return res.json();
      })
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="campaign-list">
      <h2>All Campaigns</h2>
      {campaigns.length === 0 && <p>No campaigns yet.</p>}
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Goal Amount: ₹{campaign.goal_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
