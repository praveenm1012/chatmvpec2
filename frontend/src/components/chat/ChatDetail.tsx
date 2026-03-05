import React from 'react';
import type { Chat } from '../../types/chat.types';

interface ChatDetailProps {
  chat: Chat;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ chat }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">
        {chat.name ?? `Chat (${chat.type})`}
      </h2>
      <p className="text-xs text-gray-400">ID: {chat.id} &middot; Type: {chat.type}</p>
    </div>
  );
};

export default ChatDetail;
