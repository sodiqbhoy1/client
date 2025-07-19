// src/components/RoomCard.jsx
import { useState } from 'react';

const RoomCard = ({ room, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/?room=${room._id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border p-2 mb-2 flex justify-between items-center">
      <span>{room.roomId}</span>
      <div className="flex gap-2">
        <button onClick={copyLink}>{copied ? "Copied!" : "Copy Link"}</button>
        <button onClick={() => onDelete(room._id)}>Delete</button>
      </div>
    </div>
  );
};

export default RoomCard;
