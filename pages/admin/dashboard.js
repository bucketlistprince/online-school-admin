// /pages/admin/dashboard.js
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeEnrollments: 0,
    recentActivity: '',
    recentActivityList: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard_api');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 font-semibold">Total Users</h2>
            <p className="text-2xl">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 font-semibold">Total Courses</h2>
            <p className="text-2xl">{dashboardData.totalCourses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4 font-semibold">Active Enrollments</h2>
            <p className="text-2xl">{dashboardData.activeEnrollments}</p>
          </div>
        </div>
        
        {/* Recent Activity List */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl mb-4 font-semibold">Recent Activity</h2>
          <ul>
            {dashboardData.recentActivityList.length > 0 ? (
              dashboardData.recentActivityList.map((activity, index) => (
                <li key={index} className="border-b py-2">
                  {activity}
                </li>
              ))
            ) : (
              <p>No recent activities.</p>
            )}
          </ul>
        </div>
        
        {/* Progress Bars */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 font-semibold">Course Completion Progress</h2>
          <div className="mb-4">
            <p className="font-semibold">Course 1</p>
            <div className="bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-600">70% Completed</p>
          </div>
          <div>
            <p className="font-semibold">Course 2</p>
            <div className="bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-sm text-gray-600">45% Completed</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
