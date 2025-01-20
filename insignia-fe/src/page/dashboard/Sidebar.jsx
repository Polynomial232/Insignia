import { faArrowDown, faBookJournalWhills, faDashboard, faSignOut, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { validateUser } from "../../services/auth";

export default function Sidebar() {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('api_token')){
      navigate('../')
    }

    validateUser()
    .then((response) => {
      if(response.data.statusCode !== 200){
        localStorage.removeItem('api_token')
        navigate('../')
      }
    })
    .catch((_) => {
      localStorage.removeItem('api_token')
      navigate('../') 
    })
  }, [])

  return (
    <div>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'./'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faDashboard} className="text-xl" />
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link to={'transaction'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faBookJournalWhills} className="text-xl" />
                  Transaction
                </span>
              </Link>
            </li>
            <li>
              <Link to={'transfer'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faArrowDown} className="text-xl" />
                  Transfer
                </span>
              </Link>
            </li>
            <li>
              <Link to={'topup'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                <span className="ms-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faWallet} className="text-xl" />
                  Topup
                </span>
              </Link>
            </li>
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:cursor-pointer">
                <span className="ms-3 flex items-center gap-3" onClick={() => {
                  localStorage.removeItem('api_token')
                  navigate('../')
                }}>
                  <FontAwesomeIcon icon={faSignOut} className="text-xl" />
                  Sign Out
                </span>
              </div>
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
