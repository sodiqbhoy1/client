
import ChatRoom from './components/ChatRoom'
import { Route, Routes } from 'react-router'
import LandingPage from './components/LandingPage'
import RoomManager from './components/RoomManager'
import Nathan from './components/Nathan'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/meet-nathan" element={<Nathan />} />
         <Route path="/admin" element={<RoomManager />} />
        <Route path="/join/:roomId" element={<LandingPage />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
      </Routes>
    </>
  )
}

export default App
