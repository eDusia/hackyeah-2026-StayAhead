export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type CareerDomain =
  | 'software'
  | 'data'
  | 'product'
  | 'design'
  | 'ai'
  | 'other';

export interface UserGoal {
  targetRole: string;
  domain: CareerDomain;
  currentLevel: SkillLevel;
  targetDate?: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  headline?: string;
  currentRole?: string;
  goal: UserGoal | null;
  skills: string[];
  isOnboarded: boolean;
}
