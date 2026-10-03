export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function calculateCompletionRate(completed: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return clampPercent((completed / total) * 100);
}

export function calculateMarketMatch(userSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) {
    return 0;
  }

  const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase());
  const matches = requiredSkills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase()),
  );

  return clampPercent((matches.length / requiredSkills.length) * 100);
}

export function createId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function pluralize(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(count);
  const lastTwo = abs % 100;
  const last = abs % 10;

  if (abs === 1) {
    return one;
  }
  if (lastTwo >= 12 && lastTwo <= 14) {
    return many;
  }
  if (last >= 2 && last <= 4) {
    return few;
  }
  return many;
}
