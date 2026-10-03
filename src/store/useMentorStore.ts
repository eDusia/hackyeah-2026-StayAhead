import { create } from 'zustand';

import { initialMentorSlots } from '@/mock/mentorSessionsData';
import type { MentorSessionSlot } from '@/types';

interface MentorStoreState {
  slots: MentorSessionSlot[];
  bookedSessions: MentorSessionSlot[];
  bookSlot: (slotId: string, topic?: string) => void;
  cancelSlot: (slotId: string) => void;
}

export const useMentorStore = create<MentorStoreState>((set) => ({
  slots: initialMentorSlots,
  bookedSessions: [],
  bookSlot: (slotId, topic = 'Ogólna konsultacja kariery') =>
    set((state) => {
      const targetSlot = state.slots.find((s) => s.id === slotId);
      if (!targetSlot) return state;

      const updatedSlot: MentorSessionSlot = {
        ...targetSlot,
        available: false,
        bookedTopic: topic,
      };

      return {
        slots: state.slots.map((s) => (s.id === slotId ? updatedSlot : s)),
        bookedSessions: [...state.bookedSessions, updatedSlot],
      };
    }),
  cancelSlot: (slotId) =>
    set((state) => ({
      slots: state.slots.map((s) =>
        s.id === slotId ? { ...s, available: true, bookedTopic: undefined } : s
      ),
      bookedSessions: state.bookedSessions.filter((s) => s.id !== slotId),
    })),
}));
