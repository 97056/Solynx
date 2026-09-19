(function () {
  "use strict";

  function validateField(field) {
    const value = (field.value || "").trim();
    let valid = true;
    let message = "";

    if (field.hasAttribute("required") && !value) {
      valid = false;
      message = "This field is required.";
    } else if (field.type === "email" && value) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) message = "Enter a valid email address.";
    } else if (field.type === "tel" && value) {
      valid = /^[+]?[\d\s()-]{7,}$/.test(value);
      if (!valid) message = "Enter a valid phone number.";
    } else if (field.minLength > 0 && value.length < field.minLength) {
      valid = false;
      message = `Minimum ${field.minLength} characters.`;
    }

    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid && !!value);

    const feedback = field.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = message;

    return valid;
  }

  function selectedLabel(select) {
    if (!select || !select.options || select.selectedIndex < 0) return "";
    return (select.options[select.selectedIndex].textContent || "").trim();
  }

  function buildWhatsAppUrl(phone, text) {
    const digits = String(phone).replace(/\D/g, "");
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(text);
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const WHATSAPP_NUMBER = "919705699481"; // +91 97056 99481
    const status = form.querySelector(".form-status");
    const fields = form.querySelectorAll("input, select, textarea");
    const submitBtn = form.querySelector('[type="submit"]');

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach((f) => {
        if (!validateField(f)) ok = false;
      });

      if (!ok) {
        if (status) {
          status.className = "form-status is-error";
          status.textContent = "Please fix the highlighted fields and try again.";
        }
        return;
      }

      const name = (form.name.value || "").trim();
      const email = (form.email.value || "").trim();
      const phone = (form.phone.value || "").trim();
      const company = (form.company.value || "").trim();
      const service = selectedLabel(form.service);
      const budget = selectedLabel(form.budget);
      const message = (form.message.value || "").trim();

      const lines = [
        "Hello Solynx Innovations,",
        "",
        "I submitted a project inquiry from the website:",
        "",
        "Name: " + name,
        "Email: " + email,
        phone ? "Phone: " + phone : null,
        company ? "Company: " + company : null,
        "Service: " + service,
        "Budget: " + budget,
        "",
        "Message:",
        message,
      ].filter(function (line) {
        return line !== null;
      });

      const url = buildWhatsAppUrl(WHATSAPP_NUMBER, lines.join("\n"));

      if (status) {
        status.className = "form-status is-success";
        status.textContent = "Opening WhatsApp with your message…";
      }
      if (submitBtn) submitBtn.disabled = true;

      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(function () {
        form.reset();
        fields.forEach((f) => f.classList.remove("is-valid", "is-invalid"));
        if (submitBtn) submitBtn.disabled = false;
        if (status) {
          status.className = "form-status is-success";
          status.textContent = "WhatsApp opened. Send the pre-filled message to reach Solynx.";
        }
      }, 400);
    });
  }

  function initQuoteWizard() {
    const wizard = document.getElementById("quote-wizard");
    if (!wizard) return;

    const WHATSAPP_NUMBER = "919705699481";
    const steps = Array.from(wizard.querySelectorAll(".quote-step"));
    const progress = Array.from(wizard.querySelectorAll(".quote-progress__step"));
    const nextBtns = wizard.querySelectorAll("[data-quote-next]");
    const prevBtns = wizard.querySelectorAll("[data-quote-prev]");
    const reopenBtn = wizard.querySelector("[data-quote-whatsapp]");
    let current = 0;
    const data = {};
    let lastWhatsAppUrl = "";

    function show(index) {
      steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
      progress.forEach((p, i) => {
        p.classList.toggle("is-active", i === index);
        p.classList.toggle("is-done", i < index);
      });
      current = index;
    }

    function collectStepInputs(step) {
      step.querySelectorAll("input, select, textarea").forEach((inp) => {
        if (!inp.name) return;
        data[inp.name] = (inp.value || "").trim();
      });
    }

    function openQuoteWhatsApp() {
      const lines = [
        "Hello Solynx Innovations,",
        "",
        "I completed the quote wizard on the website:",
        "",
        "Service: " + (data.needLabel || data.need || "—"),
        "Project: " + (data.title || "—"),
        "",
        "Details:",
        data.details || "—",
        "",
        "Budget: " + (data.budgetLabel || data.budget || "—"),
        "Timeline: " + (data.timelineLabel || data.timeline || "—"),
        "",
        "Name: " + (data.name || "—"),
        "Email: " + (data.email || "—"),
        data.phone ? "Phone: " + data.phone : null,
        data.company ? "Company: " + data.company : null,
      ].filter(function (line) {
        return line !== null;
      });

      lastWhatsAppUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, lines.join("\n"));
      window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
      return lastWhatsAppUrl;
    }

    wizard.querySelectorAll(".quote-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const group = opt.closest(".quote-options");
        group.querySelectorAll(".quote-option").forEach((o) => o.classList.remove("is-selected"));
        opt.classList.add("is-selected");
        const field = group.getAttribute("data-field");
        data[field] = opt.getAttribute("data-value");
        data[field + "Label"] = (opt.textContent || "").trim();
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = steps[current];
        const fieldGroup = step.querySelector(".quote-options");
        if (fieldGroup && !fieldGroup.querySelector(".is-selected")) {
          fieldGroup.classList.add("shake");
          setTimeout(() => fieldGroup.classList.remove("shake"), 400);
          return;
        }

        const required = step.querySelectorAll("input[required], select[required], textarea[required]");
        let ok = true;
        required.forEach((inp) => {
          if (!validateField(inp)) ok = false;
        });
        if (!ok) return;

        collectStepInputs(step);

        // Leaving contact step (5th) → open WhatsApp, then show confirmation
        if (current === steps.length - 2) {
          openQuoteWhatsApp();
          show(current + 1);
          return;
        }

        if (current < steps.length - 1) show(current + 1);
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (current > 0) show(current - 1);
      });
    });

    if (reopenBtn) {
      reopenBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!lastWhatsAppUrl) openQuoteWhatsApp();
        else window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
      });
    }

    show(0);
  }

  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("is-open"));
        if (!open) item.classList.add("is-open");
      });
    });
  }

  function initFilters() {
    const bar = document.querySelector(".filter-bar");
    if (!bar) return;
    const chips = bar.querySelectorAll(".filter-chip");
    const cards = document.querySelectorAll("[data-category]");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const filter = chip.getAttribute("data-filter");
        cards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          const show = filter === "all" || cat === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  window.SolynxForms = {
    initContactForm,
    initQuoteWizard,
    initFAQ,
    initFilters,
    validateField,
  };
})();
