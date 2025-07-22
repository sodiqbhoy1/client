import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/create-room`);
    navigate(`/chat/${res.data.roomId}`);
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Private Chat App</h1>
      <button
        onClick={createRoom}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Create Private Chat Room
      </button>
    </div>
  );
};

export default Home;