export const FORMAT_LABELS: Record<string, string> = {
  DC: 'Duel Commander',
  MODERN: 'Modern',
  PAUPER: 'Pauper',
  DRAFT: 'Draft',
  COMMANDER: 'Commander Multi',
  LIMITED: 'Limited',
  OTHER: 'Autre',
}

export const formatLabel = (code: string) => FORMAT_LABELS[code] || code
