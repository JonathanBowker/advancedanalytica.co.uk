# Feature Specification: Tenant Portal Experience

**Feature Branch**: `001-tenant-portal-experience`

**Created**: 2026-07-30

**Status**: Draft

**Input**: User description: "Create a baseline spec.md for the current repository based on the existing marketing site and multi-tenant portal behavior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access the correct tenant portal (Priority: P1)

A returning client user visits a tenant domain, signs in from that tenant's branded login page, and reaches the protected portal for that same tenant without being exposed to another tenant's content or service catalogue.

**Why this priority**: Secure access to the correct tenant experience is the foundation for every other portal action. Without it, the portal cannot be used safely or credibly.

**Independent Test**: Can be fully tested by visiting a tenant domain, requesting a sign-in link with a valid work email, completing sign-in, and confirming the user lands in a tenant-branded portal that only shows that tenant's allowed services.

**Acceptance Scenarios**:

1. **Given** a user opens a known tenant domain, **When** the login page loads, **Then** the page shows that tenant's name, branding, and sign-in experience.
2. **Given** a user requests portal access with a valid work email, **When** the sign-in flow completes successfully, **Then** the user is returned to the same tenant domain and taken to the protected portal area.
3. **Given** an unauthenticated user tries to open a protected portal route, **When** access is checked, **Then** the user is redirected to that tenant's login page and the intended destination is preserved for return after sign-in.
4. **Given** an authenticated user opens the login page, **When** access is checked, **Then** the user is redirected to the tenant portal home instead of seeing the sign-in form again.

---

### User Story 2 - Submit tenant-scoped service intake (Priority: P2)

An authenticated tenant user opens an allowed service page, fills in the intake form for that service, and reviews a structured request payload that is ready for downstream AI processing.

**Why this priority**: The portal exists to collect structured, tenant-scoped service requests. Once access is working, this is the most valuable operational workflow.

**Independent Test**: Can be fully tested by signing in as a tenant user, opening one allowed service page, submitting all required fields, and confirming that a structured summary of the request is shown with tenant, service, user, and input values.

**Acceptance Scenarios**:

1. **Given** an authenticated user is in the tenant portal, **When** they open an allowed service, **Then** they see a service-specific intake form with the expected labels, guidance, and required fields.
2. **Given** an authenticated user submits a completed service form, **When** the submission is processed, **Then** the system shows a structured payload summary that includes the tenant identity, service identity, signed-in user, submission time, and entered values.
3. **Given** a user tries to open a service that is not assigned to the current tenant, **When** access is checked, **Then** the user is returned to the tenant portal home rather than seeing that service intake.

---

### User Story 3 - Experience a consistent tenant-branded site (Priority: P3)

A visitor or signed-in user moves between the public marketing site, login page, portal home, and service pages while the tenant identity remains visually consistent and appropriately separated from other tenants.

**Why this priority**: Consistent branding and tenant separation make the shared application feel intentional and trustworthy, especially when multiple domains use the same platform.

**Independent Test**: Can be fully tested by opening multiple public and protected pages for a tenant domain and confirming that the tenant name, theme, navigation cues, and allowed actions stay consistent across those pages.

**Acceptance Scenarios**:

1. **Given** a visitor browses a tenant domain, **When** they move between public and protected pages, **Then** the tenant-specific branding remains consistent across those experiences.
2. **Given** multiple tenant domains exist in the system, **When** each domain is opened, **Then** each one shows only its own branding and service catalogue while using the same underlying application.

---

### Edge Cases

- What happens when a request arrives on an unknown or unsupported hostname? The system should fall back to a safe default tenant experience rather than failing the request.
- How does the system handle an expired, invalid, or already-used sign-in link? The user should be returned to the login flow with a clear recovery message.
- What happens when sign-in infrastructure is unavailable or misconfigured? Protected routes should remain inaccessible and the user should receive a clear configuration or access error.
- How does the system behave when a user enters a personal or otherwise unacceptable email address for portal access? The request should be rejected with guidance to use a valid work email.
- What happens when a user opens a protected page directly after sign-in? The system should return the user to the intended protected destination when possible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST resolve the active tenant from the incoming domain for every request.
- **FR-002**: The system MUST present tenant-specific branding on the login experience, portal home, and protected service pages.
- **FR-003**: The system MUST keep the login route publicly accessible for each tenant.
- **FR-004**: The system MUST require authentication before granting access to the portal home or any service intake page.
- **FR-005**: The system MUST redirect unauthenticated users who request protected routes to the correct tenant login page and preserve the intended destination for return after sign-in.
- **FR-006**: The system MUST send sign-in links that return users to the same tenant domain from which access was requested.
- **FR-007**: Users MUST be able to request portal access using a valid work email address.
- **FR-008**: The system MUST reject sign-in requests that do not meet the portal's email eligibility checks and explain how the user can correct the issue.
- **FR-009**: The portal home MUST show only the services assigned to the active tenant.
- **FR-010**: The system MUST prevent users from opening service intake pages that are not assigned to the active tenant.
- **FR-011**: Each allowed service page MUST present a structured intake form with the fields, labels, and guidance defined for that service.
- **FR-012**: The system MUST require completion of service fields marked as required before treating the intake as ready.
- **FR-013**: After a successful service submission, the system MUST show a structured request payload summary containing the tenant identity, service identity, signed-in user identity when available, submission time, and submitted input values.
- **FR-014**: The system MUST provide a clear path for signed-in users to return from a service page to the tenant portal home.
- **FR-015**: The shared application MUST support multiple tenant domains while keeping tenant branding and service availability separated by domain.

### Key Entities *(include if feature involves data)*

- **Tenant**: A client-specific portal context identified by domain, display name, visual theme, and allowed services.
- **Portal User**: A person requesting or using access to a tenant portal through a work email-based sign-in flow.
- **Portal Service**: A tenant-assignable service offering with a unique identity, descriptive copy, and a defined set of intake fields.
- **Service Intake Field**: A single prompt within a portal service form, including its label, input type, placeholder, help text, and required status.
- **Service Submission Payload**: A structured summary of a completed intake containing tenant, service, user, submission time, and provided answers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visits to known tenant domains show the correct tenant name and branding on login and portal pages.
- **SC-002**: 100% of unauthenticated attempts to access protected portal routes are redirected to the correct tenant login experience.
- **SC-003**: 95% of valid sign-in attempts reach the protected tenant portal in a single end-to-end flow without the user needing to manually change domains.
- **SC-004**: 100% of tenant portal home views show only services assigned to the active tenant.
- **SC-005**: 100% of successful service submissions display a structured payload summary containing tenant, service, timestamp, and submitted answers.

## Assumptions

- The current repository's marketing site and portal behavior are being captured as a baseline feature rather than introducing a brand-new product direction.
- Portal access is intended for invited or approved users operating with work email addresses, not consumer email accounts.
- A shared application serves multiple tenant domains, and tenant assignment is controlled centrally rather than through separate deployments.
- Service submission currently prepares a structured payload for downstream processing and review; long-term storage or external delivery is outside the scope of this baseline spec.
- Unknown hostnames should fall back to a safe default tenant experience unless product policy changes later.
