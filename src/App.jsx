
import ChatRoom from './components/ChatRoom'
import { Route, Routes } from 'react-router'
import LandingPage from './components/LandingPage'
import RoomManager from './components/RoomManager'
import Nathan from './components/Nathan'
import AdminHome from './admin/AdminHome'
import AdminLogin from './admin/AdminLogin'
import AdminSignup from './admin/AdminSignup'
import ForgotPassword from './admin/ForgotPassword'
import AdminDashboard from './admin/AdminDashboard'
import Dashboard from './admin/Dashboard'
import Rooms from './admin/Rooms'
import Users from './admin/Users'
import ResetPassword from './admin/ResetPaswword'
import Volunteer from './components/Volunteer'
import HomePage from './components/HomePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
         <Route path="/meet-nathan" element={<Nathan />} />
         {/* <Route path="/admin" element={<RoomManager />} /> */}
        <Route path="/join/:roomId" element={<LandingPage />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
     
     {/* admin dashboard */}
     <Route path='/admin-dashboard/*' element={<AdminDashboard />} >
<Route index element={<Dashboard/>} />
<Route path='rooms' element={<Rooms />} />
<Route path='users' element={<Users />} />


     </Route>
     
     
     
      </Routes>
    </>
  )
}

export default App
