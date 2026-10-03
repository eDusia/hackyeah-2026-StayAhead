import { create } from 'zustand';

import type { UserGoal, UserProfile } from '@/types';

const emptyProfile: UserProfile = {
  id: 'user-local',
  name: '',
  headline: '',
  currentRole: '',
  goal: null,
  skills: ['TypeScript', 'React Native', 'Prompt Engineering'],
  isOnboarded: false,
};

interface UserState {
  profile: UserProfile;
  setUserGoal: (goal: UserGoal) => void;
  updateProfile: (partial: Partial<Omit<UserProfile, 'id' | 'goal'>>) => void;
  completeOnboarding: (payload: { name: string; currentRole?: string; goal: UserGoal }) => void;
  resetProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: emptyProfile,
  setUserGoal: (goal) =>
    set((state) => ({
      profile: { ...state.profile, goal },
    })),
  updateProfile: (partial) =>
    set((state) => ({
      profile: { ...state.profile, ...partial },
    })),
  completeOnboarding: ({ name, currentRole, goal }) =>
    set((state) => ({
      profile: {
        ...state.profile,
        name,
        currentRole,
        headline: `W drodze do roli ${goal.targetRole}`,
        goal,
        isOnboarded: true,
      },
    })),
  resetProfile: () => set({ profile: emptyProfile }),
}));
