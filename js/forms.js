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

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const status = form.querySelector(".form-status");
    const fields = form.querySelectorAll("input, select, textarea");

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

      if (!status) return;

      if (!ok) {
        status.className = "form-status is-error";
        status.textContent = "Please fix the highlighted fields and try again.";
        return;
      }

      status.className = "form-status is-loading";
      status.textContent = "Sending your message…";

      setTimeout(() => {
        status.className = "form-status is-success";
        status.textContent = "Thank you. Your message has been received. We'll respond within one business day.";
        form.reset();
        fields.forEach((f) => f.classList.remove("is-valid", "is-invalid"));
      }, 1100);
    });
  }

  function initQuoteWizard() {
    const wizard = document.getElementById("quote-wizard");
    if (!wizard) return;

    const steps = Array.from(wizard.querySelectorAll(".quote-step"));
    const progress = Array.from(wizard.querySelectorAll(".quote-progress__step"));
    const nextBtns = wizard.querySelectorAll("[data-quote-next]");
    const prevBtns = wizard.querySelectorAll("[data-quote-prev]");
    let current = 0;
    const data = {};

    function show(index) {
      steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
      progress.forEach((p, i) => {
        p.classList.toggle("is-active", i === index);
        p.classList.toggle("is-done", i < index);
      });
      current = index;
    }

    wizard.querySelectorAll(".quote-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const group = opt.closest(".quote-options");
        group.querySelectorAll(".quote-option").forEach((o) => o.classList.remove("is-selected"));
        opt.classList.add("is-selected");
        data[group.getAttribute("data-field")] = opt.getAttribute("data-value");
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
        const inputs = step.querySelectorAll("input[required], select[required], textarea[required]");
        let ok = true;
        inputs.forEach((inp) => {
          if (!validateField(inp)) ok = false;
          else data[inp.name] = inp.value;
        });
        if (!ok) return;

        if (current < steps.length - 1) show(current + 1);
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (current > 0) show(current - 1);
      });
    });

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
