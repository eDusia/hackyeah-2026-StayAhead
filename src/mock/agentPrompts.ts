import type { ChatMessage, QuickReplyOption } from '@/types';

export const agentWelcomeMessage: ChatMessage = {
  id: 'msg-welcome',
  role: 'agent',
  content:
    'Jestem Twoim mentorem StayAhead. Mogę skrócić plan na dziś, znaleźć lukę kompetencyjną albo przygotować Cię do konkretnej oferty. Od czego zaczynamy?',
  createdAt: new Date().toISOString(),
};

export const quickReplyOptions: QuickReplyOption[] = [
  {
    id: 'qr-today',
    label: 'Co dziś priorytet?',
    prompt: 'Co powinienem zrobić dzisiaj, jeśli mam tylko 45 minut?',
  },
  {
    id: 'qr-gap',
    label: 'Gdzie jest moja luka?',
    prompt: 'Jakie 2 kompetencje najbardziej oddalają mnie od target role?',
  },
  {
    id: 'qr-offer',
    label: 'Dopasuj ofertę',
    prompt: 'Która z aktualnych ofert jest najbliższa mojemu profilowi i dlaczego?',
  },
];

export function mockAgentReply(prompt: string): string {
  const text = prompt.toLowerCase();

  if (text.includes('45') || text.includes('dziś') || text.includes('priorytet') || text.includes('dzisiaj')) {
    return 'Dziś nie dokładaj teorii. Dokończ pętlę tool-calling (45 min) i zapisz jedną blokadę. To zamyka kamień milowy agenta szybciej niż kolejne artykuły.';
  }

  if (text.includes('luka') || text.includes('kompetenc')) {
    return 'Największa luka to ewaluacja jakości agenta i system design. TypeScript już Cię nie blokuje. Na najbliższe 2 tygodnie trzymaj się evals + architektury pętli agenta.';
  }

  if (text.includes('ofert') || text.includes('prac') || text.includes('dopas')) {
    return 'Najbliższa rola to AI Application Engineer w Nordic Labs (78% match). Brakuje Ci przede wszystkim ewaluacji i jednego publicznego case study, nie kolejnego frameworka.';
  }

  return 'Rozumiem. Zostawiam Cię przy jednym celu: domknąć agenta z mierzalną ewaluacją. Jak skończysz, wrócimy do portfolio i rozmów rekrutacyjnych.';
}
