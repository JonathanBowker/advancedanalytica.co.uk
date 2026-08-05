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

function getUserPath(id) {
  return `/portal/admin/users/${encodeURIComponent(id)}/`;
}

function rolesMatch(first = [], second = []) {
  if (first.length !== second.length) return false;
  return [...first].sort().every((role, index) => role === [...second].sort()[index]);
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

function RoleLozenges({ roles }) {
  const normalizedRoles = Array.isArray(roles) ? roles : [];

  if (!normalizedRoles.length) {
    return (
      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-amber-700">
        None
      </span>
    );
  }

  return normalizedRoles.map((role) => (
    <span
      key={role}
      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-slate-600"
    >
      {roleLabels[role] || role}
    </span>
  ));
}

function StatusPill({ disabled }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
        disabled ? 'bg-red-100 text-red-700' : 'bg-[#14B8A6]/12 text-[#0f766e]'
      }`}
    >
      {disabled ? 'Disabled' : 'Active'}
    </span>
  );
}

function StatusMessage({ message, tone = 'neutral' }) {
  if (!message) return null;

  const toneClass =
    tone === 'success'
      ? 'border-[#14B8A6]/25 bg-[#14B8A6]/10 text-[#0f766e]'
      : tone === 'warning'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : tone === 'error'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-slate-200 bg-slate-50 text-slate-500';

  return (
    <div className={`rounded-md border px-3 py-2 text-sm font-semibold ${toneClass}`}>
      {message}
    </div>
  );
}

function IconButton({ label, tone = 'neutral', disabled = false, onClick, children }) {
  const toneClass =
    tone === 'danger'
      ? 'border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50'
      : tone === 'accent'
        ? 'border-[#14B8A6]/30 text-[#0f766e] hover:border-[#14B8A6] hover:bg-[#14B8A6]/10'
        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-50 ${toneClass}`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}

function EditButton({ href, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#14B8A6]/30 px-3 text-xs font-bold uppercase tracking-[0.08em] text-[#0f766e] transition hover:border-[#14B8A6] hover:bg-[#14B8A6]/10"
    >
      <Icon path={iconPaths.edit} className="h-4 w-4" />
      Edit
    </a>
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
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-60 ${toneClass}`}
    >
      {children}
    </button>
  );
}

function Icon({ path, className = 'h-[1.05rem] w-[1.05rem]' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path.map((segment) => (
        <path key={segment} d={segment} />
      ))}
    </svg>
  );
}

const iconPaths = {
  open: ['M9 7h8v8', 'M17 7 7 17', 'M7 10v8h8'],
  edit: ['M4.5 19.5h15', 'M7 16.5l1-4 7.7-7.7a1.4 1.4 0 0 1 2 0l1.5 1.5a1.4 1.4 0 0 1 0 2L11.5 16l-4.5.5Z'],
  disable: ['M6 6l12 12', 'M10.7 5.1A8 8 0 0 1 20 12', 'M6.3 8.1A8 8 0 0 0 12 20a8 8 0 0 0 4.9-1.7', 'M4.1 12A8 8 0 0 1 12 4'],
  enable: ['M12 4a8 8 0 1 0 8 8', 'M9.5 12.2 11.4 14l3.5-4'],
  delete: ['M4.5 7.5h15', 'M9.5 10.5v6', 'M14.5 10.5v6', 'M7.5 7.5l1-2h7l1 2', 'M8 7.5v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-10'],
  back: ['M15 18l-6-6 6-6', 'M9 12h10'],
};

function UserTable({
  users,
  loading,
  busyId,
  status,
  statusTone,
  onRefresh,
  onToggleDisabled,
  onDeleteUser,
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 md:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Users</h2>
          <div className="mt-2">
            <StatusMessage message={status} tone={statusTone} />
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading || Boolean(busyId)}
          className="rounded-md border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-4 md:px-8">User</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Roles</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last sign-in</th>
              <th className="px-6 py-4 text-right md:px-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {users.map((user) => (
              <tr
                key={user.id}
                className="cursor-pointer align-middle transition hover:bg-[#f6fbfa]"
                onClick={() => {
                  window.location.href = getUserPath(user.id);
                }}
              >
                <td className="px-6 py-5 md:px-8">
                  <a
                    href={getUserPath(user.id)}
                    onClick={(event) => event.stopPropagation()}
                    className="block max-w-[24rem] no-underline"
                  >
                    <div className="text-base font-semibold text-slate-950">
                      {user.name || user.email}
                    </div>
                    <div className="mt-1 break-all text-sm text-slate-500">{user.email}</div>
                  </a>
                </td>
                <td className="px-6 py-5 text-slate-600">{user.company || 'Not set'}</td>
                <td className="px-6 py-5">
                  <div className="flex max-w-[18rem] flex-wrap gap-2">
                    <RoleLozenges roles={user.roles} />
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusPill disabled={user.disabled} />
                </td>
                <td className="px-6 py-5 text-slate-600">{formatDate(user.lastSignInAt)}</td>
                <td className="px-6 py-5 md:px-8">
                  <div className="flex items-center justify-end gap-2">
                    <EditButton
                      href={getUserPath(user.id)}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    />
                    <IconButton
                      label={user.disabled ? 'Enable user' : 'Disable user'}
                      disabled={busyId === user.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleDisabled(user);
                      }}
                    >
                      <Icon path={user.disabled ? iconPaths.enable : iconPaths.disable} />
                    </IconButton>
                    <IconButton
                      label="Delete user"
                      tone="danger"
                      disabled={busyId === user.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteUser(user);
                      }}
                    >
                      <Icon path={iconPaths.delete} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {!users.length && !loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500 md:px-8">
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function UserDetail({
  user,
  loading,
  name,
  company,
  roles,
  busy,
  status,
  statusTone,
  hasUnsavedChanges,
  onNameChange,
  onCompanyChange,
  onRolesChange,
  onSave,
  onToggleDisabled,
  onDeleteUser,
}) {
  if (loading) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        Loading user record...
      </section>
    );
  }

  if (!user) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        User record not found.
      </section>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href="/portal/admin/users/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#0f766e] transition hover:text-[#0b5f58]"
        >
          <Icon path={iconPaths.back} className="h-4 w-4" />
          Back to User Directory
        </a>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
                User editor
              </div>
              <h2 className="mt-3 break-all text-3xl font-semibold tracking-tight text-slate-950">
                {user.name || user.email}
              </h2>
              <p className="mt-3 break-all text-sm leading-relaxed text-slate-500">{user.email}</p>
            </div>
            <StatusPill disabled={user.disabled} />
          </div>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-900">
              Name
              <input
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Display name"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-900">
              Company
              <input
                type="text"
                value={company}
                onChange={(event) => onCompanyChange(event.target.value)}
                placeholder="Company name"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/12"
              />
            </label>
            <div className="grid gap-2 text-sm font-semibold text-slate-900">
              Roles
              <RoleCheckboxes value={roles} onChange={onRolesChange} />
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="mb-4">
              <StatusMessage
                message={hasUnsavedChanges ? 'Unsaved changes' : status}
                tone={hasUnsavedChanges ? 'warning' : statusTone}
              />
            </div>
            <div className="flex flex-wrap gap-3">
            <ActionButton tone="primary" disabled={busy} onClick={onSave}>
              Save changes
            </ActionButton>
            <ActionButton disabled={busy} onClick={onToggleDisabled}>
              {user.disabled ? 'Enable user' : 'Disable user'}
            </ActionButton>
            <ActionButton tone="danger" disabled={busy} onClick={onDeleteUser}>
              Delete user
            </ActionButton>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#14B8A6]">
            Account details
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Sign-in and provisioning record
          </h3>

          <dl className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">User ID</dt>
              <dd className="mt-2 break-all text-sm text-slate-700">{user.id}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Created</dt>
              <dd className="mt-2 text-sm text-slate-700">{formatDate(user.createdAt)}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Invited</dt>
              <dd className="mt-2 text-sm text-slate-700">{formatDate(user.invitedAt)}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Last sign-in</dt>
              <dd className="mt-2 text-sm text-slate-700">{formatDate(user.lastSignInAt)}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Email confirmed</dt>
              <dd className="mt-2 text-sm text-slate-700">
                {user.emailConfirmedAt ? formatDate(user.emailConfirmedAt) : 'Not yet confirmed'}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}

export default function AdminUsersPanel({ initialUserId = '', view = 'index' }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCompany, setInviteCompany] = useState('');
  const [inviteRoles, setInviteRoles] = useState(['client']);
  const [detailName, setDetailName] = useState('');
  const [detailCompany, setDetailCompany] = useState('');
  const [detailRoles, setDetailRoles] = useState([]);
  const [status, setStatus] = useState(
    view === 'detail'
      ? 'Loading user details from Supabase Auth.'
      : 'Loading users from Supabase Auth.',
  );
  const [statusTone, setStatusTone] = useState('neutral');
  const [busyId, setBusyId] = useState('');
  const [loading, setLoading] = useState(true);

  function showStatus(message, tone = 'neutral') {
    setStatus(message);
    setStatusTone(tone);
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        if (view === 'detail' && initialUserId) {
          const payload = await requestJson(`/api/portal/admin/users/${encodeURIComponent(initialUserId)}/`);
          if (!mounted) return;
          setUser(payload.user || null);
          setDetailName(payload.user?.name || '');
          setDetailCompany(payload.user?.company || '');
          setDetailRoles(payload.user?.roles || []);
          showStatus(`Loaded ${payload.user?.email || 'user'} from Supabase Auth.`);
        } else {
          const payload = await requestJson('/api/portal/admin/users/');
          if (!mounted) return;
          setUsers(payload.users || []);
          showStatus('Loaded users from Supabase Auth.');
        }
      } catch (error) {
        if (!mounted) return;
        showStatus(error?.message || 'Could not load users.', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [initialUserId, view]);

  async function loadUsers() {
    setLoading(true);
    try {
      const payload = await requestJson('/api/portal/admin/users/');
      setUsers(payload.users || []);
      showStatus('Loaded users from Supabase Auth.');
    } catch (error) {
      showStatus(error?.message || 'Could not load users.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function inviteUser(event) {
    event.preventDefault();
    if (!inviteRoles.length) {
      showStatus('Choose at least one role before inviting a user.', 'error');
      return;
    }

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
      showStatus(`Invitation sent to ${payload.user?.email || 'the new user'}.`, 'success');
      await loadUsers();
    } catch (error) {
      showStatus(error?.message || 'Could not invite user.', 'error');
    } finally {
      setBusyId('');
    }
  }

  async function patchUser(targetUser, updates = {}, options = {}) {
    const nextRoles = options.roles ?? targetUser.roles ?? [];
    if (!nextRoles.length) {
      showStatus('Choose at least one role before saving changes.', 'error');
      return null;
    }

    setBusyId(targetUser.id);
    try {
      const payload = await requestJson(`/api/portal/admin/users/${encodeURIComponent(targetUser.id)}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: options.name ?? targetUser.name ?? '',
          company: options.company ?? targetUser.company ?? '',
          roles: nextRoles,
          disabled: options.disabled ?? targetUser.disabled,
          ...updates,
        }),
      });
      showStatus(`Changes saved for ${payload.user.email}.`, 'success');
      return payload.user;
    } catch (error) {
      showStatus(error?.message || 'Could not update user.', 'error');
      return null;
    } finally {
      setBusyId('');
    }
  }

  async function toggleUser(targetUser) {
    const updatedUser = await patchUser(targetUser, {}, { disabled: !targetUser.disabled });
    if (!updatedUser) return;

    if (view === 'detail') {
      setUser(updatedUser);
      setDetailName(updatedUser.name || '');
      setDetailCompany(updatedUser.company || '');
      setDetailRoles(updatedUser.roles || []);
      return;
    }

    setUsers((current) => current.map((item) => (item.id === targetUser.id ? updatedUser : item)));
  }

  async function saveDetailUser() {
    if (!user) return;
    const updatedUser = await patchUser(user, {}, {
      name: detailName,
      company: detailCompany,
      roles: detailRoles,
    });
    if (!updatedUser) return;
    setUser(updatedUser);
    setDetailName(updatedUser.name || '');
    setDetailCompany(updatedUser.company || '');
    setDetailRoles(updatedUser.roles || []);
  }

  async function deleteUser(targetUser) {
    if (!window.confirm(`Delete access for ${targetUser.email}? This cannot be undone here.`)) return;

    setBusyId(targetUser.id);
    try {
      await requestJson(`/api/portal/admin/users/${encodeURIComponent(targetUser.id)}/`, {
        method: 'DELETE',
      });
      showStatus(`Deleted ${targetUser.email}.`, 'success');

      if (view === 'detail') {
        window.location.href = '/portal/admin/users/';
        return;
      }

      setUsers((current) => current.filter((item) => item.id !== targetUser.id));
    } catch (error) {
      showStatus(error?.message || 'Could not delete user.', 'error');
    } finally {
      setBusyId('');
    }
  }

  const hasUnsavedDetailChanges = Boolean(
    user &&
      (
        detailName !== (user.name || '') ||
        detailCompany !== (user.company || '') ||
        !rolesMatch(detailRoles, user.roles || [])
      ),
  );

  if (view === 'detail') {
    return (
      <UserDetail
        user={user}
        loading={loading}
        name={detailName}
        company={detailCompany}
        roles={detailRoles}
        busy={busyId === user?.id}
        status={status}
        statusTone={statusTone}
        hasUnsavedChanges={hasUnsavedDetailChanges}
        onNameChange={setDetailName}
        onCompanyChange={setDetailCompany}
        onRolesChange={setDetailRoles}
        onSave={saveDetailUser}
        onToggleDisabled={() => {
          if (user) toggleUser(user);
        }}
        onDeleteUser={() => {
          if (user) deleteUser(user);
        }}
      />
    );
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

        <form
          onSubmit={inviteUser}
          className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_0.75fr_0.75fr_1.1fr_auto] lg:items-end"
        >
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

      <UserTable
        users={users}
        loading={loading}
        busyId={busyId}
        status={status}
        statusTone={statusTone}
        onRefresh={loadUsers}
        onToggleDisabled={toggleUser}
        onDeleteUser={deleteUser}
      />
    </div>
  );
}
