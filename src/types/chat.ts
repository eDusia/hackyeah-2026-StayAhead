export type AgentStatus = 'idle' | 'thinking' | 'streaming';

export type MessageRole = 'user' | 'agent' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface QuickReplyOption {
  id: string;
  label: string;
  prompt: string;
}
