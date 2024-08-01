import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUsers,
  FaSchool,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaLaptop

} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load the sidebar state from local storage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState) {
      setIsSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  // Save the sidebar state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`relative ${
        isSidebarOpen ? "w-60" : "w-18"
      } min-h-screen flex flex-col bg-gray-900 text-white transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-0 p-2 text-white bg-gray-700 rounded-l-lg hover:bg-gray-600 transition-all duration-300"
      >
        {isSidebarOpen ? (
          <FaChevronLeft size={20} />
        ) : (
          <FaChevronRight size={20} />
        )}
      </button>

      {/* Sidebar content */}
      <nav className="flex flex-col h-full">
        <ul className="flex-1 mt-16 overflow-y-auto scrollbar-hide">
          {/* Dashboard */}
          <li className="border-gray-700">
            <Link href="/admin/dashboard" legacyBehavior>
              <a
                className={`flex items-center p-3 hover:bg-gray-700 ${
                  router.pathname === "/admin/dashboard" ? "bg-blue-700" : ""
                }`}
              >
                <FaTachometerAlt size={20}/>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium text-xs">DASHBOARD</span>
                )}
              </a>
            </Link>
          </li>

          {/* Class Management Section */}
          <li className="border-t border-gray-700">
            <div className="flex items-center p-3">
              <FaLaptop size={20} className="text-gray-400" />
              {isSidebarOpen && (
                <span className="ml-3 font-medium text-xs text-gray-400">
                  CLASS MANAGEMENT
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <ul>
                <li>
                  <Link href="/admin/" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/lessonschedule")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Lesson Schedule</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/attendance")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Attendance</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/Assignments")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Assignments</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/reports")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Reports</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/library" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/library")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Library</span>}
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* School Management Section */}
          <li className="border-t border-gray-700">
            <div className="flex items-center p-3">
              <FaSchool size={20} className="text-gray-400" />
              {isSidebarOpen && (
                <span className="ml-3 font-medium text-xs text-gray-400">
                  SCHOOL MANAGEMENT
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <ul>
                <li>
                  <Link href="/admin/timetable" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/timetable")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Timetables</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/subjects" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/subjects")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Subjects</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/courses" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/courses")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Courses</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/classes" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/classes")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Classes</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/grades" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/grades")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Grades</span>}
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Users & Roles Section */}
          <li className="border-t border-gray-700">
            <div className="flex items-center p-3">
              <FaUsers size={20} className="text-gray-400" />
              {isSidebarOpen && (
                <span className="ml-3 font-medium text-xs text-gray-400">
                  USERS & ROLES
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <ul>
                <li>
                  <Link href="/admin/users" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/users")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Users</span>}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/roles" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/roles")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Roles</span>}
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Setting Section */}
          <li className="border-t border-gray-700">
            <div className="flex items-center p-3">
              <FaCog size={20} className="text-gray-400" />
              {isSidebarOpen && (
                <span className="ml-3 font-medium text-xs text-gray-400">
                  SETTINGS
                </span>
              )}
            </div>
            {isSidebarOpen && (
              <ul>
                <li>
                  <Link href="/admin/profile" legacyBehavior>
                    <a
                      className={`flex items-center px-6 py-2 hover:bg-gray-700 ${
                        router.pathname.startsWith("/admin/profile")
                          ? "bg-blue-700"
                          : ""
                      }`}
                    >
                      {isSidebarOpen && <span>Profile</span>}
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Sign Out Button */}
        <div className="mt-auto">
          <button
            onClick={() => signOut({ redirect: false })}
            className="flex items-center w-full p-3 bg-red-600 hover:bg-red-700"
          >
            <FaSignOutAlt size={20} />
            {isSidebarOpen && (
              <span className="ml-3 font-medium text-sm">Sign Out</span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}



