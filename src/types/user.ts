export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type AppLanguage = 'pl' | 'en';

export type CareerDomain =
  | 'software'
  | 'data'
  | 'product'
  | 'design'
  | 'ai'
  | 'other';

export type GoalType =
  | 'return_after_break'
  | 'parental_leave'
  | 'career_change'
  | 'promotion'
  | 'other';

export type TimeCommitment =
  | '15-30m_daily'
  | '1h_daily'
  | '3-5h_weekly'
  | '8-10h_weekly'
  | 'flexible';

export interface UserGoal {
  targetRole: string;
  domain: CareerDomain;
  customDomain?: string;
  goalType?: GoalType;
  customGoalType?: string;
  timeCommitment?: TimeCommitment;
  customTimeCommitment?: string;
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
  language: AppLanguage;
}

