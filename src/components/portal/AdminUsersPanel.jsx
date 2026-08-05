import { useEffect, useState } from 'react';
import { portalAssignableRoles } from '../../lib/portalAccess';

const roleOptions = portalAssignableRoles;
const roleLabels = {
  page_viewer: 'page viewer',
};

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
    throw new Error(payload?.error || 'The user request failed.');
  }

  return payload;
}

function formatDate(value) {
  if (!value) return 'Never';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function RoleCheckboxes({ value, onChange }) {
  const roles = Array.isArray(value) ? value : [];

  function toggle(role) {
    if (roles.includes(role)) {
      onChange(roles.filter((item) => item !== role));
      return;
    }

    onChange([...roles, role]);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {roleOptions.map((role) => (
        <label
          key={role}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] transition ${
            roles.includes(role)
              ? 'border-[#14B8A6] bg-[#14B8A6]/12 text-[#0f766e]'
              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
          }`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={roles.includes(role)}
            onChange={() => toggle(role)}
          />
          {roleLabels[role] || role}
        </label>
      ))}
    </div>
  );
}

function ActionButton({ children, tone = 'neutral', disabled = false, onClick }) {
  const toneClass =
    tone === 'danger'
      ? 'border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50'
      : tone === 'primary'
        ? 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800'
        : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-60 ${toneClass}`}
    >
      {children}
    </button>
  );
}

export default function AdminUsersPanel() {
  const [users, setUsers] = useState([]);
  const [draftRoles, setDraftRoles] = useState({});
  const [draftNames, setDraftNames] = useState({});
  const [draftCompanies, setDraftCompanies] = useState({});
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCompany, setInviteCompany] = useState('');
  const [inviteRoles, setInviteRoles] = useState(['client']);
  const [status, setStatus] = useState('Loading users...');
  const [busyId, setBusyId] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    try {
      const payload = await requestJson('/api/portal/admin/users/');
      setUsers(payload.users || []);
      setDraftRoles(
        Object.fromEntries((payload.users || []).map((user) => [user.id, user.roles || []])),
      );
      setDraftNames(
        Object.fromEntries((payload.users || []).map((user) => [user.id, user.name || ''])),
      );
      setDraftCompanies(
        Object.fromEntries((payload.users || []).map((user) => [user.id, user.company || ''])),
      );
      setStatus('Loaded users from Supabase Auth.');
    } catch (error) {
      setStatus(error?.message || 'Could not load users.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function inviteUser(event) {
    event.preventDefault();
    setBusyId('invite');
    try {
      const payload = await requestJson('/api/portal/admin/users/', {
        method: 'POST',
        body: JSON.stringify({
          email: inviteEmail,
          name: inviteName,
          company: inviteCompany,
          roles: inviteRoles,
        }),
      });
      setInviteEmail('');
      setInviteName('');
      setInviteCompany('');
      setInviteRoles(['client']);
      setStatus(`Invitation sent to ${payload.user?.email || 'the new user'}.`);
      await loadUsers();
    } catch (error) {
      setStatus(error?.message || 'Could not invite user.');
    } finally {
      setBusyId('');
    }
  }

  async function saveUser(user, updates = {}) {
    setBusyId(user.id);
    try {
      const payload = await requestJson(`/api/portal/admin/users/${encodeURIComponent(user.id)}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: draftNames[user.id] ?? user.name ?? '',
          company: draftCompanies[user.id] ?? user.company ?? '',
          roles: draftRoles[user.id] || user.roles || [],
          disabled: user.disabled,
          ...updates,
        }),
      });
      setUsers((current) => current.map((item) => (item.id === user.id ? payload.user : item)));
      setDraftRoles((current) => ({ ...current, [user.id]: payload.user.roles || [] }));
      setDraftNames((current) => ({ ...current, [user.id]: payload.user.name || '' }));
      setDraftCompanies((current) => ({ ...current, [user.id]: payload.user.company || '' }));
      setStatus(`Updated ${payload.user.email}.`);
    } catch (error) {
      setStatus(error?.message || 'Could not update user.');
    } finally {
      setBusyId('');
    }
  }

  async function deleteUser(user) {
    if (!window.confirm(`Delete access for ${user.email}? This cannot be undone here.`)) return;

    setBusyId(user.id);
    try {
      await requestJson(`/api/portal/admin/users/${encodeURIComponent(user.id)}/`, {
        method: 'DELETE',
      });
      setUsers((current) => current.filter((item) => item.id !== user.id));
      setStatus(`Deleted ${user.email}.`);
    } catch (error) {
      setStatus(error?.message || 'Could not delete user.');
    } finally {
      setBusyId('');
    }
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
              Superadmin
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Invite a provisioned user
            </h2>
          </div>
          <button
            type="button"
            onClick={loadUsers}
            disabled={loading || Boolean(busyId)}
            className="rounded-md border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <form onSubmit={inviteUser} className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_0.75fr_0.75fr_1.1fr_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-semibold text-slate-900">
            Email
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="name@company.com"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-900">
            Name
            <input
              type="text"
              value={inviteName}
              onChange={(event) => setInviteName(event.target.value)}
              placeholder="Display name"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-900">
            Company
            <input
              type="text"
              required
              value={inviteCompany}
              onChange={(event) => setInviteCompany(event.target.value)}
              placeholder="Company name"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
            />
          </label>
          <div className="grid gap-2 text-sm font-semibold text-slate-900">
            Roles
            <RoleCheckboxes value={inviteRoles} onChange={setInviteRoles} />
          </div>
          <button
            type="submit"
            disabled={busyId === 'invite'}
            className="rounded-md bg-[#14B8A6] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#0f9288] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busyId === 'invite' ? 'Inviting...' : 'Invite User'}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 px-6 py-5 md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Users</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{status}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1380px] border-collapse text-left">
            <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4 md:px-8">User</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Roles</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last sign-in</th>
                <th className="px-6 py-4 text-right md:px-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="align-top transition hover:bg-[#f6fbfa]">
                  <td className="px-6 py-5 md:px-8">
                    <div className="font-semibold text-slate-950">{user.email}</div>
                    <div className="mt-1 text-xs text-slate-400">{user.id}</div>
                    <div className="mt-2 text-xs text-slate-500">Created {formatDate(user.createdAt)}</div>
                  </td>
                  <td className="px-6 py-5">
                    <input
                      type="text"
                      value={draftNames[user.id] ?? user.name ?? ''}
                      onChange={(event) =>
                        setDraftNames((current) => ({ ...current, [user.id]: event.target.value }))
                      }
                      placeholder="Display name"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <input
                      type="text"
                      value={draftCompanies[user.id] ?? user.company ?? ''}
                      onChange={(event) =>
                        setDraftCompanies((current) => ({ ...current, [user.id]: event.target.value }))
                      }
                      placeholder="Company name"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <RoleCheckboxes
                      value={draftRoles[user.id] || []}
                      onChange={(roles) => setDraftRoles((current) => ({ ...current, [user.id]: roles }))}
                    />
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        user.disabled ? 'bg-red-100 text-red-700' : 'bg-[#14B8A6]/12 text-[#0f766e]'
                      }`}
                    >
                      {user.disabled ? 'Disabled' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-slate-600">{formatDate(user.lastSignInAt)}</td>
                  <td className="px-6 py-5 text-right md:px-8">
                    <div className="flex flex-wrap justify-end gap-2">
                      <ActionButton
                        tone="primary"
                        onClick={() => saveUser(user)}
                        disabled={busyId === user.id}
                      >
                        Save
                      </ActionButton>
                      <ActionButton
                        onClick={() => saveUser(user, { disabled: !user.disabled })}
                        disabled={busyId === user.id}
                      >
                        {user.disabled ? 'Enable' : 'Disable'}
                      </ActionButton>
                      <ActionButton
                        tone="danger"
                        onClick={() => deleteUser(user)}
                        disabled={busyId === user.id}
                      >
                        Delete
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
              {!users.length && !loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
