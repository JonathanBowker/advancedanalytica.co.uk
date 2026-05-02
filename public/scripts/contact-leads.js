(() => {
  const forms = document.querySelectorAll("[data-lead-form]");
  if (!forms.length) return;

  const successMessage = "Thank you. Your enquiry has been sent.";
  const freeEmailDomains = new Set([
    "aol.com",
    "fastmail.com",
    "gmail.com",
    "googlemail.com",
    "gmx.com",
    "gmx.co.uk",
    "hey.com",
    "hotmail.co.uk",
    "hotmail.com",
    "icloud.com",
    "live.co.uk",
    "live.com",
    "mac.com",
    "mail.com",
    "me.com",
    "msn.com",
    "outlook.com",
    "pm.me",
    "proton.me",
    "protonmail.com",
    "qq.com",
    "tutanota.com",
    "yahoo.co.uk",
    "yahoo.com",
    "yandex.com",
    "yandex.ru",
    "zoho.com",
    "163.com",
    "126.com",
  ]);
  const nonEnglishScriptPattern =
    /[\p{Script=Arabic}\p{Script=Armenian}\p{Script=Bengali}\p{Script=Bopomofo}\p{Script=Cyrillic}\p{Script=Devanagari}\p{Script=Ethiopic}\p{Script=Georgian}\p{Script=Greek}\p{Script=Gujarati}\p{Script=Gurmukhi}\p{Script=Han}\p{Script=Hangul}\p{Script=Hebrew}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Kannada}\p{Script=Khmer}\p{Script=Lao}\p{Script=Malayalam}\p{Script=Myanmar}\p{Script=Oriya}\p{Script=Sinhala}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Thai}\p{Script=Tibetan}]/u;

  const setStatus = (form, message) => {
    const targetId = form.getAttribute("data-status-target");
    const status = targetId ? document.getElementById(targetId) : null;
    if (status) status.textContent = message;
  };

  const getFieldLabel = (form, fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return fieldName;
    const explicit = field.getAttribute("data-summary-label");
    if (explicit) return explicit;
    const id = field.getAttribute("id");
    if (!id) return fieldName;
    const label = form.querySelector(`label[for="${id}"]`);
    return label?.textContent?.trim() || fieldName;
  };

  const getValue = (form, name) =>
    String(new FormData(form).get(name) || "").trim();

  const getLeadType = (form) => {
    const explicit = form.getAttribute("data-lead-type");
    if (explicit) return explicit;
    if (form.id === "assessment-form-main") return "brand_ai_readiness_assessment";
    if (form.id === "home-contact-form") return "get_in_touch";
    return form.id || "lead_form";
  };

  const getLeadName = (form) => {
    const explicit = form.getAttribute("data-lead-name");
    if (explicit) return explicit;
    if (form.id === "assessment-form-main") return "Brand AI Readiness Assessment";
    if (form.id === "home-contact-form") return "Get in Touch";
    return "Website Lead Form";
  };

  const getFormContext = (form) => ({
    lead_type: getLeadType(form),
    lead_name: getLeadName(form),
    form_id: form.id || "lead_form",
    form_location:
      form.getAttribute("data-form-location") ||
      (form.id === "home-contact-form" ? "footer" : "contact_page"),
  });

  const getEmailDomain = (email) => email.split("@").pop()?.toLowerCase() || "";

  const isBusinessEmail = (email) => {
    const domain = getEmailDomain(email);
    return Boolean(domain) && !freeEmailDomains.has(domain);
  };

  const isEnglishLanguageSubmission = (form) => {
    const text = Array.from(new FormData(form).entries())
      .filter(([name]) => name !== "website")
      .map(([, value]) => String(value).trim())
      .filter(Boolean)
      .join(" ");
    return /[a-z]{2,}/i.test(text) && !nonEnglishScriptPattern.test(text);
  };

  const setFieldError = (field, message) => {
    if (!field) return;
    field.setCustomValidity(message);
    field.reportValidity();
    field.addEventListener("input", () => field.setCustomValidity(""), {
      once: true,
    });
  };

  const track = (eventName, params = {}) => {
    if (typeof window.advancedAnalyticaTrack !== "function") return;
    window.advancedAnalyticaTrack(eventName, params);
  };

  const getErrorMessage = (result) => {
    if (result?.error === "email_not_configured") {
      if (result?.reason === "invalid_from_identity") {
        return "The mail sender is not configured correctly. Please contact jonny.bowker@advancedanalytica.co.uk directly.";
      }

      return "The mail service is not configured correctly. Please contact jonny.bowker@advancedanalytica.co.uk directly.";
    }

    if (result?.error !== "email_delivery_failed") {
      if (result?.error === "business_email_required") {
        return "Please use a business email address.";
      }

      if (result?.error === "english_language_required") {
        return "Please write your enquiry in English.";
      }

      return "We could not send your enquiry. Please try again in a moment.";
    }

    const reasonMessages = {
      ses_access_denied:
        "The mail service is not authorised to send this enquiry. Please email jonny.bowker@advancedanalytica.co.uk directly.",
      ses_message_rejected:
        "The mail service rejected this enquiry. Please email jonny.bowker@advancedanalytica.co.uk directly.",
      ses_signature_error:
        "The mail service credentials need attention. Please email jonny.bowker@advancedanalytica.co.uk directly.",
      ses_credentials_invalid:
        "The mail service credentials need attention. Please email jonny.bowker@advancedanalytica.co.uk directly.",
      ses_delivery_failed:
        "The mail service could not send this enquiry. Please email jonny.bowker@advancedanalytica.co.uk directly.",
    };

    return (
      reasonMessages[result?.reason] ||
      "The mail service could not send this enquiry. Please email jonny.bowker@advancedanalytica.co.uk directly."
    );
  };

  const getCompletedFieldCount = (form) =>
    Array.from(new FormData(form).entries()).filter(
      ([name, value]) => name !== "website" && String(value).trim()
    ).length;

  const buildExtendedMessage = (form, baseMessage) => {
    const reservedFields = new Set([
      "name",
      "email",
      "company",
      "role",
      "topic",
      "message",
      "website",
      "language",
      "materials",
      "ai_touchpoints",
      "biggest_concern",
      "preferred_next_step",
    ]);

    const grouped = new Map();
    for (const [name, rawValue] of new FormData(form).entries()) {
      if (reservedFields.has(name)) continue;
      const value = String(rawValue).trim();
      if (!value) continue;
      if (!grouped.has(name)) grouped.set(name, []);
      grouped.get(name).push(value);
    }

    if (!grouped.size) return baseMessage;

    const detailLines = Array.from(grouped.entries()).flatMap(([name, values]) => {
      const label = getFieldLabel(form, name);
      return [label, values.join(", "), ""];
    });

    return [baseMessage, "", "Assessment details:", ...detailLines]
      .filter(Boolean)
      .join("\n");
  };

  const buildPayload = (form) => {
    const fd = new FormData(form);
    const baseMessage = String(fd.get("message") || "").trim();
    const materials = fd
      .getAll("materials")
      .map((value) => String(value).trim())
      .filter(Boolean);
    const aiTouchpoints = fd
      .getAll("ai_touchpoints")
      .map((value) => String(value).trim())
      .filter(Boolean);
    return {
      ...getFormContext(form),
      name: getValue(form, "name"),
      email: getValue(form, "email"),
      company: getValue(form, "company"),
      topic: getValue(form, "topic"),
      role: getValue(form, "role"),
      message: buildExtendedMessage(form, baseMessage),
      website: String(fd.get("website") || "").trim(),
      language: String(fd.get("language") || "en").trim() || "en",
      page: window.location.href,
      materials,
      ai_touchpoints: aiTouchpoints,
      biggest_concern: getValue(form, "biggest_concern"),
      preferred_next_step: getValue(form, "preferred_next_step"),
    };
  };

  const ensureSuccessCardStyles = () => {
    if (document.getElementById("lead-success-card-styles")) return;

    const style = document.createElement("style");
    style.id = "lead-success-card-styles";
    style.textContent = `
      .lead-success-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        background: rgba(4, 6, 10, 0.72);
        backdrop-filter: blur(10px);
        animation: lead-success-fade 180ms ease-out;
      }

      .lead-success-card {
        position: relative;
        width: min(100%, 31rem);
        overflow: hidden;
        border: 1px solid rgba(20, 184, 166, 0.36);
        border-radius: 1.25rem;
        background:
          radial-gradient(circle at 18% 0%, rgba(20, 184, 166, 0.24), transparent 34%),
          linear-gradient(145deg, #12161d 0%, #07090d 100%);
        color: #f8f3ea;
        padding: 2rem;
        box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.38);
        animation: lead-success-rise 220ms ease-out;
      }

      .lead-success-kicker {
        margin-bottom: 0.9rem;
        color: #ff8c69;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .lead-success-title {
        margin: 0;
        max-width: 24rem;
        color: #f8f3ea;
        font-size: clamp(1.65rem, 4vw, 2.35rem);
        font-weight: 600;
        line-height: 1.08;
        letter-spacing: -0.03em;
      }

      .lead-success-copy {
        margin: 1rem 0 0;
        max-width: 25rem;
        color: rgba(248, 243, 234, 0.76);
        font-size: 1rem;
        line-height: 1.65;
      }

      .lead-success-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: grid;
        width: 2.25rem;
        height: 2.25rem;
        place-items: center;
        border: 1px solid rgba(248, 243, 234, 0.18);
        border-radius: 999px;
        background: rgba(248, 243, 234, 0.06);
        color: #f8f3ea;
        cursor: pointer;
        font-size: 1.35rem;
        line-height: 1;
      }

      .lead-success-action {
        margin-top: 1.5rem;
        border: 0;
        border-radius: 999px;
        background: #14B8A6;
        color: #ffffff;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        padding: 0.85rem 1.2rem;
        text-transform: uppercase;
      }

      .lead-success-close:focus-visible,
      .lead-success-action:focus-visible {
        outline: 3px solid rgba(255, 140, 105, 0.82);
        outline-offset: 3px;
      }

      @keyframes lead-success-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes lead-success-rise {
        from { opacity: 0; transform: translateY(0.6rem) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.append(style);
  };

  const showSuccessCard = (form) => {
    ensureSuccessCardStyles();

    document.querySelector("[data-lead-success-card]")?.remove();

    const successMessage =
      form?.getAttribute("data-success-message") || "Thank you. Your enquiry has been sent.";
    const successCopy =
      form?.getAttribute("data-success-copy") ||
      "We will review it and get back to you as soon as we can.";

    const overlay = document.createElement("div");
    overlay.className = "lead-success-overlay";
    overlay.setAttribute("data-lead-success-card", "");

    overlay.innerHTML = `
      <section
        class="lead-success-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-success-title"
        aria-describedby="lead-success-copy"
      >
        <button class="lead-success-close" type="button" data-lead-success-close aria-label="Close message">&times;</button>
        <div class="lead-success-kicker">Enquiry sent</div>
        <h2 class="lead-success-title" id="lead-success-title">${successMessage}</h2>
        <p class="lead-success-copy" id="lead-success-copy">${successCopy}</p>
        <button class="lead-success-action" type="button" data-lead-success-close>Close</button>
      </section>
    `;

    const close = () => {
      document.removeEventListener("keydown", handleKeydown);
      overlay.remove();
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") close();
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });

    overlay
      .querySelectorAll("[data-lead-success-close]")
      .forEach((button) => button.addEventListener("click", close));

    document.body.append(overlay);
    document.addEventListener("keydown", handleKeydown);
    overlay.querySelector("[data-lead-success-close]")?.focus();
  };

  forms.forEach((form) => {
    let hasStarted = false;
    const markStarted = () => {
      if (hasStarted) return;
      hasStarted = true;
      track("contact_start", getFormContext(form));
    };

    form.addEventListener("focusin", markStarted, { once: true });
    form.addEventListener("input", markStarted, { once: true });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const context = getFormContext(form);
      track("contact_attempt", {
        ...context,
        completed_fields: getCompletedFieldCount(form),
      });

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "Please complete the required fields.");
        track("contact_validation_error", context);
        return;
      }

      const emailField = form.querySelector('[name="email"]');
      const email = getValue(form, "email").toLowerCase();
      if (!isBusinessEmail(email)) {
        setFieldError(emailField, "Please use a business email address.");
        setStatus(form, "Please use a business email address.");
        track("contact_validation_error", {
          ...context,
          reason: "business_email_required",
        });
        return;
      }

      const messageField = form.querySelector('[name="message"]');
      if (!isEnglishLanguageSubmission(form)) {
        setFieldError(messageField, "Please write your enquiry in English.");
        setStatus(form, "Please write your enquiry in English.");
        track("contact_validation_error", {
          ...context,
          reason: "english_language_required",
        });
        return;
      }

      setStatus(form, "Sending enquiry...");

      try {
        const endpoint = form.getAttribute("data-lead-endpoint") || form.action;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildPayload(form)),
        });

        const result = await response.json().catch(() => null);
        if (!response.ok || result?.ok === false) {
          const error = new Error(`Form endpoint returned ${response.status}`);
          error.result = result;
          throw error;
        }

        form.reset();
        setStatus(form, "");
        showSuccessCard(form);
        track("contact_submit", context);
      } catch (error) {
        setStatus(form, getErrorMessage(error?.result));
        track("contact_error", {
          ...context,
          error: error?.result?.error || "request_failed",
          reason: error?.result?.reason || "unknown",
        });
      }
    });
  });
})();
