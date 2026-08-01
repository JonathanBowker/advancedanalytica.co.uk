export type PricingRow = {
  tier: string;
  description: string;
  price: string;
  notes: string;
};

export type InternalSheetPayload = {
  id?: string;
  slug: string;
  type: 'Product' | 'Service' | 'Offer';
  title: string;
  audience: string;
  strapline: string;
  summary: string;
  outcomes: string;
  assumptions: string;
  pricingRows: PricingRow[];
  updatedAt?: string;
};

const blankPricingRow: PricingRow = {
  tier: '',
  description: '',
  price: '',
  notes: '',
};

export function slugifySheet(value: string) {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `sheet-${Date.now()}`;
}

export function normalizePricingRows(value: unknown): PricingRow[] {
  if (!Array.isArray(value)) return [{ ...blankPricingRow }];

  const rows = value.map((row) => ({
    tier: String(row?.tier || '').trim(),
    description: String(row?.description || '').trim(),
    price: String(row?.price || '').trim(),
    notes: String(row?.notes || '').trim(),
  }));

  return rows.length ? rows : [{ ...blankPricingRow }];
}

export function toClientSheet(row: Record<string, any>): InternalSheetPayload {
  return {
    id: String(row.id || ''),
    slug: String(row.slug || ''),
    type: ['Product', 'Service', 'Offer'].includes(row.sheet_type) ? row.sheet_type : 'Service',
    title: String(row.title || ''),
    audience: String(row.audience || ''),
    strapline: String(row.strapline || ''),
    summary: String(row.summary || ''),
    outcomes: String(row.outcomes || ''),
    assumptions: String(row.assumptions || ''),
    pricingRows: normalizePricingRows(row.pricing_rows),
    updatedAt: row.updated_at ? String(row.updated_at) : '',
  };
}

export function toDatabaseSheet(sheet: Partial<InternalSheetPayload>) {
  const title = String(sheet.title || '').trim();

  return {
    slug: slugifySheet(String(sheet.slug || title)),
    sheet_type: ['Product', 'Service', 'Offer'].includes(String(sheet.type)) ? sheet.type : 'Service',
    title,
    audience: String(sheet.audience || 'Consultants and partners').trim(),
    strapline: String(sheet.strapline || '').trim(),
    summary: String(sheet.summary || '').trim(),
    outcomes: String(sheet.outcomes || '').trim(),
    assumptions: String(sheet.assumptions || '').trim(),
    pricing_rows: normalizePricingRows(sheet.pricingRows),
  };
}
