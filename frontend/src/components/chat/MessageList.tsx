import React from 'react';
import type { Message } from '../../types/chat.types';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <div className="text-center text-gray-400 py-8">No messages yet.</div>;
  }

  return (
    <ul className="space-y-2">
      {messages.map((msg) => (
        <li key={msg.id} className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">{msg.senderId} &middot; {new Date(msg.createdAt).toLocaleString()}</p>
          <p className="text-sm text-gray-800">{msg.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
