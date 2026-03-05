import React, { useState } from 'react';
import type { CreateChatDto } from '../../types/chat.types';

interface ChatFormProps {
  onSubmit: (data: CreateChatDto) => Promise<void>;
  isLoading?: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, isLoading = false }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('group');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!type.trim()) {
      setError('Chat type is required.');
      return;
    }
    try {
      await onSubmit({ type, name: name.trim() || undefined });
      setName('');
      setType('group');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create chat.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      <div>
        <label htmlFor="chat-type" className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          id="chat-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="group">Group</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div>
        <label htmlFor="chat-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name (optional)
        </label>
        <input
          id="chat-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chat name"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-lg"
      >
        {isLoading ? 'Creating...' : 'Create Chat'}
      </button>
    </form>
  );
};

export default ChatForm;
