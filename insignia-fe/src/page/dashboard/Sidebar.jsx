import { faArrowDown, faArrowUp, faBookJournalWhills, faDashboard, faSignOut, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'./'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faDashboard} className="text-xl" />
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link to={'top_user_transaction'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faBookJournalWhills} className="text-xl" />
                  Top Transaction
                </span>
              </Link>
            </li>
            <li>
              <Link to={'transfer'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faArrowDown} className="text-xl" />
                  Transfer
                </span>
              </Link>
            </li>
            <li>
              <Link to={'topup'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faWallet} className="text-xl" />
                  Topup
                </span>
              </Link>
            </li>
            <li>
              <Link to={'topup'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faSignOut} className="text-xl" />
                  Sign Out
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="sm:ml-64">
        <Outlet />
      </div>
    </div>
  )
}
