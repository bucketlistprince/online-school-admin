// /pages/admin/assignments.js
import Layout from '../../components/Layout';

export default function Assignments() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Assignments</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Assignment List</h2>
          {/* Replace with actual assignment data */}
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">Homework 1</td>
                <td className="border px-4 py-2">Algebra</td>
                <td className="border px-4 py-2">2024-07-30</td>
              </tr>
              {/* Repeat rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
