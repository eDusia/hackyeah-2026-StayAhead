import { create } from 'zustand';

import type { UserGoal, UserProfile } from '@/types';

const defaultSkillsByDomain: Record<string, string[]> = {
  ai: ['Prompt Engineering', 'AI Agents', 'Evaluation', 'TypeScript'],
  software: ['TypeScript', 'React Native', 'Node.js', 'System Design'],
  data: ['SQL', 'Python', 'Data Analytics', 'BI & Dashboards'],
  product: ['Product Sense', 'AI Agents', 'Discovery', 'Stakeholder Management'],
  design: ['UI/UX Design', 'Design Systems', 'Figma', 'User Research'],
  other: ['Project Management', 'Tech Strategy', 'Communication', 'Agile'],
};

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
        headline: `W drodze do: ${goal.targetRole}`,
        goal,
        skills: defaultSkillsByDomain[goal.domain] ?? state.profile.skills,
        isOnboarded: true,
      },
    })),
  resetProfile: () => set({ profile: emptyProfile }),
}));

