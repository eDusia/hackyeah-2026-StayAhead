export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'lead';
export type ContractType = 'b2b' | 'uop';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'monthly' | 'yearly';
}

export interface SenioritySalary {
  level: SeniorityLevel;
  label: string;
  b2bRange: string;
  uopRange: string;
  minK: number;
  maxK: number;
  demandGrowth: string;
}

export interface InDemandRole {
  id: string;
  title: string;
  demandIndex: number; // 0-100
  growthPercent: number;
  openPositionsCount: number;
  topSkills: string[];
  description: string;
  category: string;
}

export interface CuratedJobOffer {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workModel: 'remote' | 'hybrid' | 'office';
  salaryB2B: string;
  salaryUoP?: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  whyGoodMatch: string;
  description: string;
  keyResponsibilities: string[];
  perks: string[];
  isHotToday?: boolean;
}
