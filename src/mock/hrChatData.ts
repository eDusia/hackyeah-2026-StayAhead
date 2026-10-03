import type { HRContact, HRMessage } from '@/types';

export const initialHRContacts: HRContact[] = [
  {
    id: 'hr-katarzyna',
    name: 'Katarzyna Wiśniewska',
    role: 'Lead Talent Partner Tech',
    company: 'StayAhead Network',
    isOnline: true,
    avatarBg: '#0d9488',
    lastMessage: 'Cześć! Widzę Twój postęp w milestone AI. Jak oceniasz gotowość do próbnej rozmowy?',
    lastMessageTime: '10:42',
  },
  {
    id: 'hr-tomasz',
    name: 'Tomasz Lewandowski',
    role: 'Senior Tech Recruiter',
    company: 'Nordic Labs',
    isOnline: false,
    avatarBg: '#4f46e5',
    lastMessage: 'Szukamy AI Application Engineera do zespołu w Warszawie / hybrydowo. Sprawdź naszą ofertę!',
    lastMessageTime: 'Wczoraj',
  },
];

export const initialHRMessages: Record<string, HRMessage[]> = {
  'hr-katarzyna': [
    {
      id: 'hrm-1',
      contactId: 'hr-katarzyna',
      sender: 'hr',
      text: 'Cześć! Nazywam się Katarzyna i pomagam uczestnikom StayAhead łączyć się bezpośrednio z hiring managerami.',
      createdAt: '10:30',
    },
    {
      id: 'hrm-2',
      contactId: 'hr-katarzyna',
      sender: 'hr',
      text: 'Widzę, że Twoim celem jest rola inżynierska związana z AI i masz już za sobą pierwsze zadania. Chętnie przejrzę Twoje podsumowanie kompetencji lub odpowiem na pytania o aktualne widełki rynkowe!',
      createdAt: '10:32',
    },
    {
      id: 'hrm-3',
      contactId: 'hr-katarzyna',
      sender: 'hr',
      text: 'Cześć! Widzę Twój postęp w milestone AI. Jak oceniasz gotowość do próbnej rozmowy?',
      createdAt: '10:42',
    },
  ],
  'hr-tomasz': [
    {
      id: 'hrm-4',
      contactId: 'hr-tomasz',
      sender: 'hr',
      text: 'Dzień dobry! Zauważyłem Twoje zainteresowanie naszą ofertą AI Application Engineer w Nordic Labs.',
      createdAt: 'Wczoraj 15:20',
    },
    {
      id: 'hrm-5',
      contactId: 'hr-tomasz',
      sender: 'hr',
      text: 'Szukamy inżynierów do nowego zespołu agentów. Daj znać, jak będziesz gotowy na krótką rozmowę wstępną online!',
      createdAt: 'Wczoraj 15:22',
    },
  ],
};
