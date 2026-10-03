import { create } from 'zustand';

import { initialHRContacts, initialHRMessages } from '@/mock/hrChatData';
import type { HRContact, HRMessage } from '@/types';
import { createId } from '@/utils/helpers';

interface HRChatStoreState {
  contacts: HRContact[];
  selectedContactId: string;
  messages: Record<string, HRMessage[]>;
  selectContact: (id: string) => void;
  sendMessage: (text: string) => void;
}

export const useHRChatStore = create<HRChatStoreState>((set, get) => ({
  contacts: initialHRContacts,
  selectedContactId: 'hr-katarzyna',
  messages: initialHRMessages,
  selectContact: (id) => set({ selectedContactId: id }),
  sendMessage: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const contactId = get().selectedContactId;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const userMsg: HRMessage = {
      id: createId('hrm-user'),
      contactId,
      sender: 'user',
      text: trimmed,
      createdAt: timeStr,
    };

    set((state) => ({
      messages: {
        ...state.messages,
        [contactId]: [...(state.messages[contactId] || []), userMsg],
      },
      contacts: state.contacts.map((c) =>
        c.id === contactId
          ? { ...c, lastMessage: trimmed, lastMessageTime: timeStr }
          : c
      ),
    }));

    // Simulate HR recruiter reply after 1.2s
    setTimeout(() => {
      const replies = [
        'Dziękuję za wiadomość! Przejrzę Twoje zapytanie i wrócę ze szczegółami dotyczącymi procesu rekrutacyjnego w firmach partnerskich.',
        'Brzmi super! Czy masz przygotowane portfolio na GitHubie lub podsumowanie projektów komercyjnych?',
        'Zanotowałam to. Twoje umiejętności z agentów AI bardzo dobrze wpisują się w obecne zapotrzebowanie.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const hrNow = new Date();
      const hrTime = `${String(hrNow.getHours()).padStart(2, '0')}:${String(hrNow.getMinutes()).padStart(2, '0')}`;

      const replyMsg: HRMessage = {
        id: createId('hrm-reply'),
        contactId,
        sender: 'hr',
        text: randomReply,
        createdAt: hrTime,
      };

      set((state) => ({
        messages: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), replyMsg],
        },
        contacts: state.contacts.map((c) =>
          c.id === contactId
            ? { ...c, lastMessage: randomReply, lastMessageTime: hrTime }
            : c
        ),
      }));
    }, 1200);
  },
}));
