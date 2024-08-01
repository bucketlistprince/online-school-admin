// /pages/admin/messages.js
import Layout from '../../components/Layout';

export default function Messages() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Message Inbox</h2>
          {/* Replace with actual messages data */}
          <ul className="list-disc ml-4 mt-4">
            <li>Message from JohnDoe: "Can we reschedule the meeting?"</li>
            <li>Message from JaneDoe: "Please check the updated syllabus."</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
