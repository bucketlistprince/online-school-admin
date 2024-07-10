// /pages/api/dashboard_api.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      // Mock data for the dashboard
      const dashboardData = {
        totalUsers: 1200,
        totalCourses: 45,
        activeEnrollments: 300,
        recentActivity: 'User John Doe signed up.',
        recentActivityList: [
          'User Alice Smith completed Course 101.',
          'User Bob Johnson enrolled in Course 202.',
          'User Charlie Brown updated profile settings.',
          'User Diana Prince purchased Course 303.',
        ],
      };
  
      res.status(200).json(dashboardData);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  