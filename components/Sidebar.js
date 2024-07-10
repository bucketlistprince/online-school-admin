// /components/Sidebar.js
import { useState } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaChartBar,
  FaChalkboardTeacher,
  FaSchool,
  FaClipboardList,
  FaFileAlt,
  FaBullhorn,
  FaEnvelope,
  FaComments,
  FaCog,
  FaUserCircle,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const SidebarSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div
        className="flex items-center justify-between p-4 hover:bg-gray-700 cursor-pointer"
        onClick={toggleSection}
      >
        <h3 className="text-gray-400 text-xs uppercase">{title}</h3>
        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
      </div>
      {isOpen && <ul className="space-y-4">{children}</ul>}
    </li>
  );
};

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen">
      <ul className="space-y-4 p-4">
        {/* Dashboard */}
        <li>
          <Link href="/admin/dashboard" legacyBehavior>
            <a className="flex items-center p-4 hover:bg-gray-700 text-gray-400 text-xs uppercase">
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </a>
          </Link>
        </li>

        {/* User Management */}
        <SidebarSection title="Users">
          <li>
            <Link href="/admin/users" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaUsers className="mr-3" />
                Users
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/roles" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaChalkboardTeacher className="mr-3" />
                Roles
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Course Management */}
        <SidebarSection title="Courses">
          <li>
            <Link href="/admin/courses" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaBook className="mr-3" />
                Courses
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/subjects" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaSchool className="mr-3" />
                Subjects
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/assignments" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaClipboardList className="mr-3" />
                Assignments
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Class Management */}
        <SidebarSection title="Classes">
          <li>
            <Link href="/admin/classes" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaChalkboardTeacher className="mr-3" />
                Classes
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/attendance" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaClipboardList className="mr-3" />
                Attendance
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/grades" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaFileAlt className="mr-3" />
                Grades
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Reports */}
        <SidebarSection title="Reports">
          <li>
            <Link href="/admin/reports" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaChartBar className="mr-3" />
                Reports
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Library Management */}
        <SidebarSection title="Library">
          <li>
            <Link href="/admin/library" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaBook className="mr-3" />
                Library
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Communication */}
        <SidebarSection title="Messaging">
          <li>
            <Link href="/admin/announcements" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaBullhorn className="mr-3" />
                Announcements
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/messages" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaEnvelope className="mr-3" />
                Messages
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/forums" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaComments className="mr-3" />
                Forums
              </a>
            </Link>
          </li>
        </SidebarSection>

        {/* Settings */}
        <SidebarSection title="Settings">
          <li>
            <Link href="/admin/profile" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaUserCircle className="mr-3" />
                User Profile
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" legacyBehavior>
              <a className="flex items-center p-4 hover:bg-gray-700">
                <FaCog className="mr-3" />
                Settings
              </a>
            </Link>
          </li>
        </SidebarSection>
      </ul>
    </nav>
  );
}
