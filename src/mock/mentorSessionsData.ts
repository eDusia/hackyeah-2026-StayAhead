import type { MentorSessionSlot } from '@/types';

export const initialMentorSlots: MentorSessionSlot[] = [
  {
    id: 'slot-1',
    mentorName: 'Piotr Zając',
    mentorTitle: 'Staff AI Engineer',
    mentorCompany: 'TechScale / ex-Brainly',
    date: 'Jutro (Poniedziałek)',
    time: '14:30 – 15:00',
    durationMinutes: 30,
    available: true,
    specialization: 'Architektura agentów, Code Review, Evals',
    avatarBg: '#4f46e5',
  },
  {
    id: 'slot-2',
    mentorName: 'Katarzyna Wiśniewska',
    mentorTitle: 'Lead Tech Talent Partner',
    mentorCompany: 'StayAhead Talent Network',
    date: 'Jutro (Poniedziałek)',
    time: '17:00 – 17:30',
    durationMinutes: 30,
    available: true,
    specialization: 'CV Review, Negocjacja widełek, Rekrutacje tech',
    avatarBg: '#0d9488',
  },
  {
    id: 'slot-3',
    mentorName: 'Maciej Rutkowski',
    mentorTitle: 'Principal Cloud Architect',
    mentorCompany: 'Nordic Labs',
    date: 'Wtorek',
    time: '11:00 – 11:30',
    durationMinutes: 30,
    available: true,
    specialization: 'System Design, Skalowanie LLM, Bezpieczeństwo',
    avatarBg: '#d97706',
  },
  {
    id: 'slot-4',
    mentorName: 'Magdalena Kruk',
    mentorTitle: 'Engineering Manager & Career Coach',
    mentorCompany: 'VentureScale',
    date: 'Środa',
    time: '16:00 – 16:30',
    durationMinutes: 30,
    available: true,
    specialization: 'Powrót do pracy po przerwie, Strategia awansu',
    avatarBg: '#7c3aed',
  },
];

export const consultationTopics = [
  { id: 'topic-cv', label: 'Przegląd CV i portfolio pod oferty 2026' },
  { id: 'topic-tech', label: 'Konsultacja techniczna / System Design' },
  { id: 'topic-salary', label: 'Ocena szans i negocjacje stawek na rynku' },
  { id: 'topic-return', label: 'Plan powrotu po przerwie / urlopie' },
];
