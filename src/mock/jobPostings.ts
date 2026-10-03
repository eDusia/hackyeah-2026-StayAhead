import type { JobPosting } from '@/types';

export const jobPostings: JobPosting[] = [
  {
    id: 'job-ai-engineer',
    title: 'AI Application Engineer',
    company: 'Nordic Labs',
    location: 'Warszawa / Hybrid',
    remote: true,
    matchScore: 78,
    requiredSkills: ['TypeScript', 'AI Agents', 'Prompt Engineering', 'System Design'],
    salaryRange: '18–24k PLN',
  },
  {
    id: 'job-fullstack',
    title: 'Senior Fullstack Engineer',
    company: 'Helix Cloud',
    location: 'Kraków',
    remote: false,
    matchScore: 71,
    requiredSkills: ['TypeScript', 'React Native', 'Node.js', 'System Design'],
    salaryRange: '20–27k PLN',
  },
  {
    id: 'job-ai-pm',
    title: 'AI Product Manager',
    company: 'Orbit Studio',
    location: 'Remote EU',
    remote: true,
    matchScore: 64,
    requiredSkills: ['Product Sense', 'AI Agents', 'Discovery', 'Stakeholder Management'],
    salaryRange: '22–30k PLN',
  },
];
