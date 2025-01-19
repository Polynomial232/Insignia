import { Route, Routes } from 'react-router-dom'
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import Dashboard from './page/dashboard/Dashboard'
import Transfer from './page/dashboard/Transfer'
import Topup from './page/dashboard/Topup'
import TopUserTransaction from './page/dashboard/TopUserTransaction'
import Sidebar from './page/dashboard/Sidebar'

function App() {
  return (
    <Routes>
      <Route path=''>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route path='dashboard' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path='transfer' element={<Transfer />} />
          <Route path='topup' element={<Topup />} />
          <Route path='top_user_transaction' element={<TopUserTransaction />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
