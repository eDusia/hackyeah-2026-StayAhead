export type RoadmapItemStatus = 'completed' | 'in_progress' | 'locked' | 'upcoming';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  week: number;
  status: RoadmapItemStatus;
  skills: string[];
  milestoneId?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetWeek: number;
  skills: string[];
  status: RoadmapItemStatus;
  progress: number;
}

export interface MarketTrend {
  id: string;
  skill: string;
  demandScore: number;
  growthPercent: number;
  category: string;
  summary: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  matchScore: number;
  requiredSkills: string[];
  salaryRange?: string;
}
