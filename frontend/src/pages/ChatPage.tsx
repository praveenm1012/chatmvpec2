import { useState, useEffect } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatForm from '../components/chat/ChatForm';
import ChatDetail from '../components/chat/ChatDetail';
import MessageList from '../components/chat/MessageList';
import * as api from '../api/chat.api';
import type { Chat, Message, CreateChatDto } from '../types/chat.types';

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const data = await api.getChats();
      setChats(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load chats.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (chatId: string) => {
    setIsLoading(true);
    try {
      const data = await api.getChatMessages(chatId);
      setMessages(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load messages.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChat = async (data: CreateChatDto) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const newChat = await api.createChat(data);
      setChats((prev) => [...prev, newChat]);
      setShowForm(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create chat.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          >
            {showForm ? 'Cancel' : 'New Chat'}
          </button>
        </div>

        {errorMessage && (
          <div className="m-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {showForm && (
          <div className="p-4 border-b border-gray-200">
            <ChatForm onSubmit={handleCreateChat} isLoading={isLoading} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <ChatList
            chats={chats}
            onSelect={handleSelectChat}
            selectedChatId={selectedChat?.id}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <ChatDetail chat={selectedChat} />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a chat to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
}
