import apiClient from './client';

import type { Chat, CreateChatDto, UpdateChatDto } from '../types/chat.types';
import type { ChatMember, CreateChatMemberDto, UpdateChatMemberDto } from '../types/chat.types';
import type { Message, CreateMessageDto, UpdateMessageDto } from '../types/chat.types';

export async function createChat(data: CreateChatDto): Promise<Chat> {
  const response = await apiClient.post<Chat>('/chats', data);
  return response.data;
}

export async function getChats(): Promise<Chat[]> {
  const response = await apiClient.get<Chat[]>('/chats');
  return response.data;
}

export async function getChatMessages(
  chatId: string,
  cursor?: string,
  limit?: number,
): Promise<Message[]> {
  const params: Record<string, string | number> = {};
  if (cursor) params['cursor'] = cursor;
  if (limit !== undefined) params['limit'] = limit;
  const response = await apiClient.get<Message[]>(`/chats/${chatId}/messages`, { params });
  return response.data;
}
