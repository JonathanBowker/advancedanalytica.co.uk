import { useEffect, useMemo, useState } from 'react';

const blankPricingRow = {
  tier: '',
  description: '',
  price: '',
  notes: '',
};

function createBlankSheet() {
  return {
    slug: `sheet-${Date.now()}`,
    type: 'Service',
    title: '',
    audience: 'Consultants and partners',
    strapline: '',
    summary: '',
    outcomes: '',
    assumptions: '',
    pricingRows: [{ ...blankPricingRow }],
  };
}

function normalizeSheet(sheet) {
  return {
    ...createBlankSheet(),
    ...sheet,
    slug: sheet?.slug || sheet?.id || `sheet-${Date.now()}`,
    pricingRows: Array.isArray(sheet?.pricingRows) && sheet.pricingRows.length
      ? sheet.pricingRows.map((row) => ({ ...blankPricingRow, ...row }))
      : [{ ...blankPricingRow }],
  };
}

function slugifySheet(value) {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `sheet-${Date.now()}`;
}

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || 'The sheet request failed.');
  }

  return payload;
}

function Field({ label, value, onChange, placeholder, multiline = false }) {
  const className =
    'rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12';

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-900">
      {label}
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

function getSheetPath(slug) {
  return `/portal/sheets/${encodeURIComponent(slug)}/`;
}

function getStatusLabel(sheet) {
  const hasCoreCopy = sheet.title && sheet.strapline && sheet.summary && sheet.outcomes;
  const hasPricing = sheet.pricingRows.some((row) => row.tier || row.description || row.price || row.notes);

  if (hasCoreCopy && hasPricing) return 'Ready';
  if (hasCoreCopy || hasPricing) return 'Draft';
  return 'Empty';
}

export default function InternalSheetsBuilder({ initialSheetId = '', view = 'index' }) {
  const [sheets, setSheets] = useState([]);
  const [activeId, setActiveId] = useState(initialSheetId);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('Sheets are stored in the protected database and governed by internal access rules.');

  useEffect(() => {
    let mounted = true;

    async function loadSheets() {
      setLoading(true);
      try {
        const payload = await requestJson('/api/portal/sheets/');
        if (!mounted) return;
        const nextSheets = (payload.sheets || []).map(normalizeSheet);
        setSheets(nextSheets);
        setActiveId((currentId) => {
          if (currentId && nextSheets.some((sheet) => sheet.slug === currentId)) return currentId;
          return nextSheets[0]?.slug || '';
        });
        setStatus('Loaded secure sheets from the protected database.');
      } catch (error) {
        if (!mounted) return;
        setStatus(error?.message || 'Could not load internal sheets.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSheets();

    return () => {
      mounted = false;
    };
  }, []);

  const activeSheet = useMemo(
    () => sheets.find((sheet) => sheet.slug === activeId) || sheets[0] || createBlankSheet(),
    [activeId, sheets],
  );

  function updateActive(updater) {
    setSheets((currentSheets) =>
      currentSheets.map((sheet) =>
        sheet.slug === activeSheet.slug
          ? normalizeSheet(typeof updater === 'function' ? updater(sheet) : { ...sheet, ...updater })
          : sheet,
      ),
    );
  }

  function updatePricingRow(index, key, value) {
    updateActive((sheet) => ({
      ...sheet,
      pricingRows: sheet.pricingRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row,
      ),
    }));
  }

  function addPricingRow() {
    updateActive((sheet) => ({
      ...sheet,
      pricingRows: [...sheet.pricingRows, { ...blankPricingRow }],
    }));
  }

  function removePricingRow(index) {
    updateActive((sheet) => ({
      ...sheet,
      pricingRows:
        sheet.pricingRows.length > 1
          ? sheet.pricingRows.filter((_, rowIndex) => rowIndex !== index)
          : [{ ...blankPricingRow }],
    }));
  }

  async function createSheetFromBlank() {
    setBusy(true);
    try {
      const payload = await requestJson('/api/portal/sheets/', {
        method: 'POST',
        body: JSON.stringify(createBlankSheet()),
      });
      const sheet = normalizeSheet(payload.sheet);
      setSheets((currentSheets) => [sheet, ...currentSheets]);
      setActiveId(sheet.slug);
      setStatus('New sheet created in the protected database.');
      if (view === 'index') {
        window.location.href = getSheetPath(sheet.slug);
      }
    } catch (error) {
      setStatus(error?.message || 'Could not create sheet.');
    } finally {
      setBusy(false);
    }
  }

  async function duplicateActiveSheet() {
    setBusy(true);
    try {
      const payload = await requestJson('/api/portal/sheets/', {
        method: 'POST',
        body: JSON.stringify({
          ...activeSheet,
          slug: slugifySheet(`${activeSheet.title || 'internal-sheet'} copy ${Date.now()}`),
          title: `${activeSheet.title || 'Untitled sheet'} copy`,
        }),
      });
      const sheet = normalizeSheet(payload.sheet);
      setSheets((currentSheets) => [sheet, ...currentSheets]);
      setActiveId(sheet.slug);
      setStatus('Sheet duplicated in the protected database.');
    } catch (error) {
      setStatus(error?.message || 'Could not duplicate sheet.');
    } finally {
      setBusy(false);
    }
  }

  async function saveDrafts() {
    setBusy(true);
    try {
      const payload = await requestJson(`/api/portal/sheets/${encodeURIComponent(activeSheet.slug)}/`, {
        method: 'PUT',
        body: JSON.stringify(activeSheet),
      });
      const savedSheet = normalizeSheet(payload.sheet);
      setSheets((currentSheets) =>
        currentSheets.map((sheet) => (sheet.slug === activeSheet.slug ? savedSheet : sheet)),
      );
      setActiveId(savedSheet.slug);
      setStatus('Saved to the protected database.');
      if (savedSheet.slug !== activeSheet.slug) {
        window.history.replaceState(null, '', getSheetPath(savedSheet.slug));
      }
    } catch (error) {
      setStatus(error?.message || 'Could not save sheet.');
    } finally {
      setBusy(false);
    }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(activeSheet, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${slugifySheet(activeSheet.title || activeSheet.slug || 'internal-sheet')}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus('Exported the active sheet as JSON.');
  }

  const populatedRows = activeSheet.pricingRows.filter(
    (row) => row.tier || row.description || row.price || row.notes,
  );

  if (loading) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        Loading secure sheets...
      </section>
    );
  }

  if (view === 'index') {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 md:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
              Sheet register
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Internal product and service sheets
            </h2>
          </div>
          <button
            type="button"
            onClick={createSheetFromBlank}
            disabled={busy}
            className="rounded-md bg-[#14B8A6] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#0f9288]"
          >
            {busy ? 'Creating...' : 'New Sheet'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4 md:px-8">Sheet</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Audience</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right md:px-8">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {sheets.map((sheet) => {
                const pricingCount = sheet.pricingRows.filter(
                  (row) => row.tier || row.description || row.price || row.notes,
                ).length;
                const statusLabel = getStatusLabel(sheet);

                return (
                  <tr key={sheet.slug} className="align-middle transition hover:bg-[#f6fbfa]">
                    <td className="px-6 py-5 md:px-8">
                      <div className="max-w-md">
                        <div className="text-base font-semibold text-slate-950">
                          {sheet.title || 'Untitled sheet'}
                        </div>
                        <div className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
                          {sheet.strapline || 'No positioning line added yet.'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                        {sheet.type || 'Sheet'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-600">{sheet.audience || 'Consultants and partners'}</td>
                    <td className="px-6 py-5 text-slate-600">
                      {pricingCount ? `${pricingCount} row${pricingCount === 1 ? '' : 's'}` : 'No rows'}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                          statusLabel === 'Ready'
                            ? 'bg-[#14B8A6]/12 text-[#0f766e]'
                            : statusLabel === 'Draft'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right md:px-8">
                      <a
                        href={getSheetPath(sheet.slug)}
                        className="inline-flex items-center justify-center rounded-md border border-[#14B8A6] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f766e] transition hover:bg-[#14B8A6] hover:text-white"
                      >
                        Open Sheet
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm leading-relaxed text-slate-500 md:px-8">
          {status}
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href="/portal/sheets/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#0f766e] transition hover:text-[#0b5f58]"
        >
          <span aria-hidden="true">←</span>
          Back to Sheet Register
        </a>
        <div className="text-sm text-slate-500">{status}</div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
              Sheet editor
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Edit the consultant version.
            </h2>
          </div>
          <button
            type="button"
            onClick={createSheetFromBlank}
            disabled={busy}
            className="rounded-full bg-[#14B8A6] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#0f9288]"
          >
            {busy ? 'Creating...' : 'New Sheet'}
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          <label className="grid gap-2 text-sm font-semibold text-slate-900">
            Active draft
            <select
              value={activeSheet.slug}
              onChange={(event) => setActiveId(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6]"
            >
              {sheets.map((sheet) => (
                <option key={sheet.slug} value={sheet.slug}>
                  {sheet.title || 'Untitled sheet'} · {sheet.type}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-900">
              Type
              <select
                value={activeSheet.type}
                onChange={(event) => updateActive({ type: event.target.value })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6]"
              >
                <option>Product</option>
                <option>Service</option>
                <option>Offer</option>
              </select>
            </label>
            <Field
              label="Audience"
              value={activeSheet.audience}
              onChange={(value) => updateActive({ audience: value })}
              placeholder="Consultants, partners, enterprise buyers..."
            />
          </div>

          <Field
            label="Title"
            value={activeSheet.title}
            onChange={(value) => updateActive({ title: value })}
            placeholder="e.g. AI-Ready Knowledge Pack"
          />
          <Field
            label="Strapline"
            value={activeSheet.strapline}
            onChange={(value) => updateActive({ strapline: value })}
            placeholder="One sharp line consultants can remember."
          />
          <Field
            label="Summary"
            value={activeSheet.summary}
            onChange={(value) => updateActive({ summary: value })}
            placeholder="What this is, who it helps, and why it matters."
            multiline
          />
          <Field
            label="Outcomes"
            value={activeSheet.outcomes}
            onChange={(value) => updateActive({ outcomes: value })}
            placeholder="What the client receives."
            multiline
          />
          <Field
            label="Pricing assumptions"
            value={activeSheet.assumptions}
            onChange={(value) => updateActive({ assumptions: value })}
            placeholder="Scope boundaries, approval notes, partner caveats."
            multiline
          />
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">Pricing table</h3>
            <button
              type="button"
              onClick={addPricingRow}
              className="rounded-full border border-[#14B8A6] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f766e] transition hover:bg-[#14B8A6] hover:text-white"
            >
              Add Row
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            {activeSheet.pricingRows.map((row, index) => (
              <section key={`${activeSheet.slug}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 md:grid-cols-[0.75fr_1.3fr_0.55fr]">
                  <input
                    value={row.tier}
                    onChange={(event) => updatePricingRow(index, 'tier', event.target.value)}
                    placeholder="Tier"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#14B8A6]"
                  />
                  <input
                    value={row.description}
                    onChange={(event) => updatePricingRow(index, 'description', event.target.value)}
                    placeholder="Description"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#14B8A6]"
                  />
                  <input
                    value={row.price}
                    onChange={(event) => updatePricingRow(index, 'price', event.target.value)}
                    placeholder="Price"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#14B8A6]"
                  />
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    value={row.notes}
                    onChange={(event) => updatePricingRow(index, 'notes', event.target.value)}
                    placeholder="Notes"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#14B8A6]"
                  />
                  <button
                    type="button"
                    onClick={() => removePricingRow(index)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-500 transition hover:border-red-200 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={saveDrafts} disabled={busy} className="rounded-full bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white disabled:cursor-not-allowed disabled:opacity-60">
            {busy ? 'Saving...' : 'Save Drafts'}
          </button>
          <button type="button" onClick={duplicateActiveSheet} disabled={busy} className="rounded-full border border-slate-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            Duplicate
          </button>
          <button type="button" onClick={exportJson} className="rounded-full border border-slate-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
            Export JSON
          </button>
          <button type="button" onClick={() => window.print()} className="rounded-full border border-[#14B8A6] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#0f766e]">
            Print / PDF
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">{status}</p>
      </section>

      <section className="sheet-preview rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
        <div className="rounded-[1.6rem] bg-white p-7 text-slate-950 shadow-sm md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
                Internal {activeSheet.type || 'Sheet'}
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                {activeSheet.title || 'Untitled product or service sheet'}
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
                {activeSheet.strapline || 'Add a memorable positioning line for consultants and partners.'}
              </p>
            </div>
            <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Partner Use
            </div>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Audience</div>
              <p className="mt-3 text-base leading-relaxed text-slate-700">{activeSheet.audience}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Summary</div>
              <p className="mt-3 text-base leading-relaxed text-slate-700 whitespace-pre-line">
                {activeSheet.summary || 'Describe the offer in practical language.'}
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-slate-200 py-8 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Outcomes</div>
              <p className="mt-3 text-base leading-relaxed text-slate-700 whitespace-pre-line">
                {activeSheet.outcomes || 'List the assets, evidence, and decisions the client receives.'}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pricing Notes</div>
              <p className="mt-3 text-base leading-relaxed text-slate-700 whitespace-pre-line">
                {activeSheet.assumptions || 'Add assumptions and approvals for internal pricing use.'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-semibold tracking-tight">Pricing</h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tier</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {(populatedRows.length ? populatedRows : [{ ...blankPricingRow, tier: 'Add a tier' }]).map((row, index) => (
                    <tr key={`${row.tier}-${index}`} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-4 font-semibold text-slate-950">{row.tier || 'TBC'}</td>
                      <td className="px-4 py-4 text-slate-700">{row.description || 'Describe the package.'}</td>
                      <td className="px-4 py-4 font-semibold text-slate-950">{row.price || 'POA'}</td>
                      <td className="px-4 py-4 text-slate-600">{row.notes || 'Internal notes.'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
