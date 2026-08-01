import { useEffect, useState } from 'react';

const roleOptions = ['admin', 'operator', 'developer', 'consultant', 'partner', 'client'];
const actionIcons = {
  save: [
    'M5 4h12l2 2v14H5V4Z',
    'M8 4v6h8V4',
    'M8 17h8',
  ],
  disable: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
    'M7.5 7.5 16.5 16.5',
  ],
  enable: [
    'M20 6 9 17l-5-5',
  ],
  delete: [
    'M4 7h16',
    'M10 11v6',
    'M14 11v6',
    'M6 7l1 13h10l1-13',
    'M9 7V4h6v3',
  ],
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
          {role}
        </label>
      ))}
    </div>
  );
}

function ActionIconButton({ label, icon, tone = 'neutral', disabled = false, onClick }) {
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
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition disabled:cursor-not-allowed disabled:opacity-60 ${toneClass}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        {actionIcons[icon].map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
          />
        ))}
      </svg>
    </button>
  );
}

export default function AdminUsersPanel() {
  const [users, setUsers] = useState([]);
  const [draftRoles, setDraftRoles] = useState({});
  const [inviteEmail, setInviteEmail] = useState('');
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
          roles: inviteRoles,
        }),
      });
      setInviteEmail('');
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
          roles: draftRoles[user.id] || user.roles || [],
          disabled: user.disabled,
          ...updates,
        }),
      });
      setUsers((current) => current.map((item) => (item.id === user.id ? payload.user : item)));
      setDraftRoles((current) => ({ ...current, [user.id]: payload.user.roles || [] }));
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

        <form onSubmit={inviteUser} className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.1fr_auto] lg:items-end">
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
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4 md:px-8">User</th>
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
                    <div className="flex justify-end gap-2">
                      <ActionIconButton
                        label={`Save changes for ${user.email}`}
                        icon="save"
                        tone="primary"
                        onClick={() => saveUser(user)}
                        disabled={busyId === user.id}
                      />
                      <ActionIconButton
                        label={`${user.disabled ? 'Enable' : 'Disable'} ${user.email}`}
                        icon={user.disabled ? 'enable' : 'disable'}
                        onClick={() => saveUser(user, { disabled: !user.disabled })}
                        disabled={busyId === user.id}
                      />
                      <ActionIconButton
                        label={`Delete ${user.email}`}
                        icon="delete"
                        tone="danger"
                        onClick={() => deleteUser(user)}
                        disabled={busyId === user.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {!users.length && !loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
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
