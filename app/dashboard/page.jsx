import CampaignList from '../components/CampaignList';
import CreateCampaignForm from '../components/CreateCampaignForm';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">📊 Campaign Dashboard</h1>
      <CreateCampaignForm />
      <hr className="my-8" />
      <CampaignList />
    </div>
  );
}
