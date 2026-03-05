import React from 'react';
import type { Chat } from '../../types/chat.types';

interface ChatListProps {
  chats: Chat[];
  onSelect: (chat: Chat) => void;
  selectedChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelect, selectedChatId }) => {
  if (chats.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-sm text-center">
        No chats yet. Create one to get started.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {chats.map((chat) => (
        <li
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedChatId === chat.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
          }`}
        >
          <span className="font-medium text-gray-800">
            {chat.name ?? `Chat (${chat.type})`}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
