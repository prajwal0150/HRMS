import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import EmployeeForm from './pages/employee' 
import Dashboard from './pages/dashboard'
import ProtectedRoute from './component/Utils/protectedRoute'
import Unauthorize from './component/Utils/Unauthorize'
import LogoutButton from './component/Utils/logout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorize />} />
      <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
        <Route path="employee" element={<ProtectedRoute allowedRoles={["hr", "manager", "admin"]}><EmployeeForm /></ProtectedRoute> }/>
        
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
