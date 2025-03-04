// /pages/admin/reports.js
import Layout from '../../components/Layout';

export default function Reports() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Reports</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Reports List</h2>
          {/* Replace with actual reports data */}
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Report</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">JohnDoe</td>
                <td className="border px-4 py-2">Report 1</td>
              </tr>
              {/* Repeat rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
