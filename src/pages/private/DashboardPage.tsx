import { PrivateLayout } from '../../layouts/PrivateLayout';
import { useAuth } from '../../contexts/useAuth';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <PrivateLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            This is your admin dashboard. You have successfully authenticated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Statistics</h3>
            <p className="text-gray-600">View your system statistics</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-3xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Users</h3>
            <p className="text-gray-600">Manage system users</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-3xl mb-2">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Configure your preferences</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Protected Route</h3>
          <p className="text-blue-800">
            This page is only accessible to authenticated users. Your JWT token is
            stored securely and will be sent with API requests.
          </p>
        </div>
      </div>
    </PrivateLayout>
  );
};
