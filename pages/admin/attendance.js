// /pages/admin/attendance.js
import Layout from '../../components/Layout';

export default function Attendance() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Attendance</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          {/* Replace with actual attendance data */}
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">JohnDoe</td>
                <td className="border px-4 py-2">Math 101 - Section A</td>
                <td className="border px-4 py-2">2024-07-15</td>
                <td className="border px-4 py-2">Present</td>
              </tr>
              {/* Repeat rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
