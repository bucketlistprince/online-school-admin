// /components/Sidebar.js
import Link from 'next/link';
import { FaTachometerAlt, FaUsers, FaBook, FaChartBar } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen">
      <ul className="space-y-4 p-4">
        <li>
          <Link href="/admin/dashboard">
            <a className="flex items-center p-4 hover:bg-gray-700">
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <a className="flex items-center p-4 hover:bg-gray-700">
              <FaUsers className="mr-3" />
              Users
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/courses">
            <a className="flex items-center p-4 hover:bg-gray-700">
              <FaBook className="mr-3" />
              Courses
            </a>
          </Link>
        </li>
        <li>
          <Link href="/admin/reports">
            <a className="flex items-center p-4 hover:bg-gray-700">
              <FaChartBar className="mr-3" />
              Reports
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
