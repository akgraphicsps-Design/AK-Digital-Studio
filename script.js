/**
 * AK DIGITAL STUDIO — JAVASCRIPT CONTROLLER
 * Lightweight, vanilla JavaScript for interactive components & GitHub Pages compatibility.
 * Features: Mobile menu, FAQ accordion, smooth anchor scrolling, booking modal,
 * case study deep-dives, scoping estimator, newsletter validation & token copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initDiscoveryModal();
  initCaseStudyFilter();
  initCaseStudyDetails();
  initScopingEstimator();
  initNewsletterForm();
  initTokenCopy();
  initEmailCopy();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   01. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking nav links inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   02. FAQ ACCORDION (Figma System Atlas Spec)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyOpen = item.getAttribute('data-open') === 'true';

      // Optional: Close sibling accordions for clean focus
      faqItems.forEach(sibling => {
        if (sibling !== item) {
          sibling.setAttribute('data-open', 'false');
          const siblingBtn = sibling.querySelector('.faq-question');
          if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isCurrentlyOpen) {
        item.setAttribute('data-open', 'false');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('data-open', 'true');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   03. DISCOVERY CALL MODAL
   -------------------------------------------------------------------------- */
function initDiscoveryModal() {
  const openButtons = document.querySelectorAll('[data-open-modal="discovery"]');
  const modalBackdrop = document.getElementById('discovery-modal');
  if (!modalBackdrop) return;

  const closeButton = modalBackdrop.querySelector('.modal-close');
  const form = document.getElementById('discovery-form');
  const successState = document.getElementById('discovery-success');

  const openModal = () => {
    modalBackdrop.style.display = 'flex';
    requestAnimationFrame(() => {
      modalBackdrop.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    const firstInput = modalBackdrop.querySelector('input');
    if (firstInput) firstInput.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    setTimeout(() => {
      modalBackdrop.style.display = 'none';
      document.body.style.overflow = '';
      if (form && successState) {
        form.reset();
        form.style.display = 'block';
        successState.style.display = 'none';
      }
    }, 200);
  };

  openButtons.forEach(btn => btn.addEventListener('click', openModal));

  if (closeButton) closeButton.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.classList.add('loading');

      const name = form.querySelector('#discovery-name')?.value || 'Client';
      const email = form.querySelector('#discovery-email')?.value || '';
      const timezone = form.querySelector('#discovery-timezone')?.value || 'IST';

      setTimeout(() => {
        if (submitBtn) submitBtn.classList.remove('loading');
        form.style.display = 'none';
        if (successState) {
          successState.style.display = 'block';
          const confirmText = successState.querySelector('.confirmed-client-info');
          if (confirmText) {
            confirmText.textContent = `A discovery invitation has been scheduled for ${name} (${email}) calibrated for your timezone (${timezone}). We will reach out within 4 business hours.`;
          }
        }
        showToast(`Discovery call request sent for ${email}`);
      }, 700);
    });
  }
}

/* --------------------------------------------------------------------------
   04. CASE STUDY FILTER (Tabs)
   -------------------------------------------------------------------------- */
function initCaseStudyFilter() {
  const tabs = document.querySelectorAll('.filter-tab[data-filter]');
  const cards = document.querySelectorAll('.case-card[data-category]');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   05. CASE STUDY DEEP DIVE MODAL
   -------------------------------------------------------------------------- */
const CASE_STUDY_DATA = {
  fintech: {
    title: "Zenith Treasury: Multi-Currency Liquidity Architecture",
    client: "Zenith Corp (London / New York)",
    domain: "B2B Enterprise FinTech",
    problem: "Corporate treasurers struggled with 47 fragmented spreadsheets across 8 banking portals, resulting in costly FX exposure lags and delayed liquidity forecasting.",
    solution: "Designed a centralized high-density dashboard with real-time currency position matrices, automated hedging action triggers, and strict keyboard-navigable tabular data.",
    outcome: "+320% Daily Active Usage, 42% Reduction in Execution Latency, $14.2M Weekly Managed Liquidity across 14 currencies.",
    deliverables: "Design System Tokens, High-Density Data Tables, Dark/Light Theme System, Micro-Interaction Specs, Storybook Integration Docs"
  },
  logistics: {
    title: "Global Route AI: Autonomous Fleet & Maritime Telemetry",
    client: "Maritime Freight Partners (Singapore / Rotterdam)",
    domain: "Enterprise Supply Chain / Logistics",
    problem: "Global dispatchers faced cognitive overload handling over 1,200 active maritime vessels across volatile weather nodes with unstandardized legacy interfaces.",
    solution: "Engineered a low-contrast dark mode geospatial interface with progressive route disclosure, automated ETA recalculation widgets, and milestone alerts.",
    outcome: "99.4% On-Time Routing Compliance, 68% Reduction in Dispatcher Cognitive Fatigue, 4-Week Rapid MVP Deployment from day zero.",
    deliverables: "Geospatial UI Map Overlays, Alert Priority Taxonomy, Responsive Tablet Dispatch View, React Component Library"
  },
  design_system: {
    title: "Aurora Design System: Multi-Brand Enterprise Component Atlas",
    client: "TechEngine Group (Hyderabad / San Francisco)",
    domain: "Design System Engineering",
    problem: "Three disparate business units maintained duplicate codebases with 140+ unstandardized button styles and divergent accessibility practices.",
    solution: "Architected a unified design token schema (JSON-to-CSS/Tailwind) featuring 28 foundation variables, 14 typographic roles, and automated WCAG contrast validation.",
    outcome: "55% Faster Engineering Handoff, 0 Accessibility Regression Errors in Production, 100% Shared Component Adoption across 8 engineering teams.",
    deliverables: "Figma Token Matrix, CSS/Tailwind Token Pipelines, Accessible Living Atlas, Production-Ready Handoff Guide"
  }
};

function initCaseStudyDetails() {
  const triggerButtons = document.querySelectorAll('[data-case-slug]');
  const modal = document.getElementById('case-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');

  const openDetails = (slug) => {
    const data = CASE_STUDY_DATA[slug];
    if (!data) return;

    modal.querySelector('#modal-case-title').textContent = data.title;
    modal.querySelector('#modal-case-client').textContent = data.client;
    modal.querySelector('#modal-case-domain').textContent = data.domain;
    modal.querySelector('#modal-case-problem').textContent = data.problem;
    modal.querySelector('#modal-case-solution').textContent = data.solution;
    modal.querySelector('#modal-case-outcome').textContent = data.outcome;
    modal.querySelector('#modal-case-deliverables').textContent = data.deliverables;

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 200);
  };

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = btn.getAttribute('data-case-slug');
      openDetails(slug);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDetails);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDetails();
  });
}

/* --------------------------------------------------------------------------
   06. INTERACTIVE PROJECT SCOPING ESTIMATOR
   -------------------------------------------------------------------------- */
function initScopingEstimator() {
  const typeSelect = document.getElementById('calc-type');
  const scopeSelect = document.getElementById('calc-scope');
  const timelineSelect = document.getElementById('calc-timeline');
  const resultWeeks = document.getElementById('calc-result-weeks');
  const resultSprints = document.getElementById('calc-result-sprints');
  const resultTeam = document.getElementById('calc-result-team');

  if (!typeSelect || !resultWeeks) return;

  function calculateEstimate() {
    const type = typeSelect.value;
    const scope = scopeSelect ? scopeSelect.value : 'full';
    const speed = timelineSelect ? timelineSelect.value : 'standard';

    let baseWeeks = 6;
    let sprintCycles = 3;
    let teamModel = "1 Principal UX Architect + 1 Senior UI Designer";

    if (type === 'mvp') {
      baseWeeks = speed === 'rush' ? 3 : 5;
      sprintCycles = speed === 'rush' ? 2 : 3;
      teamModel = "1 Lead UX Architect + 1 Rapid Prototyper";
    } else if (type === 'enterprise') {
      baseWeeks = speed === 'rush' ? 6 : 8;
      sprintCycles = speed === 'rush' ? 4 : 5;
      teamModel = "1 Principal UX Architect + 1 Design Systems Engineer + 1 Researcher";
    } else if (type === 'design_system') {
      baseWeeks = speed === 'rush' ? 4 : 6;
      sprintCycles = speed === 'rush' ? 3 : 4;
      teamModel = "1 Lead Design Token Architect + 1 Senior Component Designer";
    }

    if (scope === 'audit') {
      baseWeeks = Math.max(2, Math.round(baseWeeks * 0.4));
      sprintCycles = 1;
      teamModel = "1 Principal UX Auditor";
    }

    resultWeeks.textContent = `${baseWeeks} Weeks`;
    resultSprints.textContent = `${sprintCycles} Sprints (Bi-weekly)`;
    resultTeam.textContent = teamModel;
  }

  [typeSelect, scopeSelect, timelineSelect].forEach(el => {
    if (el) el.addEventListener('change', calculateEstimate);
  });

  calculateEstimate();
}

/* --------------------------------------------------------------------------
   07. NEWSLETTER FORM VALIDATION (Figma Reference Pattern 04)
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const errorMsg = form.querySelector('.newsletter-error');
  const successBox = document.getElementById('newsletter-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(val)) {
      emailInput.classList.add('error');
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Please provide a valid business email address.';
      }
      return;
    }

    // Valid
    emailInput.classList.remove('error');
    if (errorMsg) errorMsg.style.display = 'none';
    if (submitBtn) submitBtn.classList.add('loading');

    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove('loading');
      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        const targetEmail = successBox.querySelector('.confirmed-email');
        if (targetEmail) targetEmail.textContent = val;
      }
      showToast('Subscribed to AK Digital Studio insights!');
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   08. TOKEN COPY HELPER (For Living Design System Atlas)
   -------------------------------------------------------------------------- */
function initTokenCopy() {
  const swatches = document.querySelectorAll('[data-hex]');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Token copied: ${hex}`);
        }).catch(() => {
          showToast(`Token: ${hex}`);
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   09. COPY EMAIL BUTTON
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const emailButtons = document.querySelectorAll('[data-copy-email]');
  emailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = "hello@akdigitalstudio.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied: hello@akdigitalstudio.com");
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. SCROLL SPY & STICKY HEADER ACCENT
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 20) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Scroll spy for navigation
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   TOAST HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
