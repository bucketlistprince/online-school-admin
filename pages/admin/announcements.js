// /pages/admin/announcements.js
import Layout from '../../components/Layout';

export default function Announcements() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Announcements</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Recent Announcements</h2>
          {/* Replace with actual announcements data */}
          <ul className="list-disc ml-4 mt-4">
            <li>Announcement 1: School will be closed on July 25th.</li>
            <li>Announcement 2: New course materials available.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
