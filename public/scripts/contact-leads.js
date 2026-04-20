(() => {
  const forms = document.querySelectorAll("[data-lead-form]");
  if (!forms.length) return;

  const setStatus = (form, message) => {
    const targetId = form.getAttribute("data-status-target");
    const status = targetId ? document.getElementById(targetId) : null;
    if (status) status.textContent = message;
  };

  const getValue = (form, name) =>
    String(new FormData(form).get(name) || "").trim();

  const buildPayload = (form) => {
    const fd = new FormData(form);
    return {
      name: getValue(form, "name"),
      email: getValue(form, "email"),
      company: getValue(form, "company"),
      topic: getValue(form, "topic"),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      page: window.location.href,
    };
  };

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "Please complete the required fields.");
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
          throw new Error(`Form endpoint returned ${response.status}`);
        }

        form.reset();
        setStatus(form, "Thank you. Your enquiry has been sent.");
      } catch {
        setStatus(form, "We could not send your enquiry. Please try again in a moment.");
      }
    });
  });
})();
