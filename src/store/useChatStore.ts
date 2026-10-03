import { create } from 'zustand';

import { agentWelcomeMessage, mockAgentReply } from '@/mock/agentPrompts';
import type { AgentStatus, ChatMessage } from '@/types';
import { createId } from '@/utils/helpers';

interface ChatState {
  messages: ChatMessage[];
  agentStatus: AgentStatus;
  sendMessage: (content: string) => void;
  addAgentResponse: (content: string) => void;
  setAgentStatus: (status: AgentStatus) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [agentWelcomeMessage],
  agentStatus: 'idle',
  sendMessage: (content) => {
    const trimmed = content.trim();
    if (!trimmed || get().agentStatus !== 'idle') {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId('msg'),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      agentStatus: 'thinking',
    }));

    setTimeout(() => {
      get().setAgentStatus('streaming');
      get().addAgentResponse(mockAgentReply(trimmed));
    }, 700);
  },
  addAgentResponse: (content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: createId('msg'),
          role: 'agent',
          content,
          createdAt: new Date().toISOString(),
        },
      ],
      agentStatus: 'idle',
    })),
  setAgentStatus: (agentStatus) => set({ agentStatus }),
  clearChat: () =>
    set({
      messages: [agentWelcomeMessage],
      agentStatus: 'idle',
    }),
}));
