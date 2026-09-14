/**
 * SMART DIGITAL WINGS - MAIN APPLICATION SCRIPT
 * Orchestrates navigation, modals, form workflows, accordions, and interactive services.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Sticky Navigation & Mobile Menu
  // ------------------------------------------------------------------------
  const header = document.querySelector('.main-header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer upon link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 1.1 Navigation Dropdowns & Scrollspy
  // ------------------------------------------------------------------------
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 || 'ontouchstart' in window) {
          const isOpen = dropdown.classList.contains('open');
          navDropdowns.forEach(d => d.classList.remove('open'));
          if (!isOpen) {
            e.preventDefault();
            dropdown.classList.add('open');
          }
        }
      });
    }

    if (menu) {
      menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          dropdown.classList.remove('open');
        });
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      navDropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  // Active Link Scrollspy (only for index.html with live section IDs)
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const sections = [
      { id: 'hero', selector: '.desktop-nav a[href="index.html"], .desktop-nav a[href="#hero"]' },
      { id: 'services', selector: '.desktop-nav .nav-dropdown:nth-child(2) .nav-dropdown-toggle' },
      { id: 'calculator', selector: '.desktop-nav .nav-dropdown:nth-child(2) .nav-dropdown-toggle' },
      { id: 'packages', selector: '.desktop-nav .nav-dropdown:nth-child(2) .nav-dropdown-toggle' },
      { id: 'process', selector: '.desktop-nav .nav-dropdown:nth-child(2) .nav-dropdown-toggle' },
      { id: 'portfolio', selector: '.desktop-nav a[href="our-work.html"], .desktop-nav a[href="case-studies.html"], .desktop-nav a[href="#portfolio"]' },
      { id: 'reviews', selector: '.desktop-nav .nav-dropdown:nth-child(4) .nav-dropdown-toggle' },
      { id: 'about', selector: '.desktop-nav .nav-dropdown:nth-child(4) .nav-dropdown-toggle' },
      { id: 'faq', selector: '.desktop-nav .nav-dropdown:nth-child(4) .nav-dropdown-toggle' },
      { id: 'contact', selector: '.desktop-nav a[href="contact.html"], .desktop-nav a[href="#contact"]' }
    ];

    const allNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          allNavLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(sections[i].selector);
          if (activeLink) activeLink.classList.add('active');
          break;
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // 1.2 Clockwise Motion Animation & Dynamic Metric Stream
  // ------------------------------------------------------------------------
  const metricsStage = document.getElementById('aboutMetricsStage');
  if (metricsStage) {
    const cards = Array.from(metricsStage.querySelectorAll('.about-metric-card'));

    // 4 Dynamic Content Streams (One for each card, rotating each cycle)
    const metricStreams = [
      // Card 0 (Blue)
      [
        { num: '500+', label: 'Campaigns Scaled', sub: 'Across E-commerce, B2B, Health & Real Estate.', badge: '✦ Verified Scale' },
        { num: '₹400 Cr+', label: 'Tracked Revenue', sub: 'Engineered for enterprise brands worldwide.', badge: '✦ Multi-Crore Impact' },
        { num: '150+', label: 'Enterprise Clients', sub: 'Scaling across US, UK, UAE & India.', badge: '✦ Global Reach' },
        { num: '45M+', label: 'Organic Impressions', sub: 'Top-3 search dominance & viral reach.', badge: '✦ Organic Surge' }
      ],
      // Card 1 (White)
      [
        { num: '99.4%', label: 'Client Retention', sub: 'Long-term brand growth partnership model.', badge: '✦ Retention Rate' },
        { num: '99.8%', label: 'Sprint Delivery', sub: 'Agile 72-hour campaign execution.', badge: '✦ Fast Execution' },
        { num: '98.6%', label: 'Satisfaction Score', sub: 'Audited across 500+ verified partner reviews.', badge: '✦ 4.9★ Rated' },
        { num: '100%', label: 'Account Ownership', sub: 'Direct ad access & transparent GA4 control.', badge: '✦ Full Control' }
      ],
      // Card 2 (Blue)
      [
        { num: '₹400 Cr+', label: 'Client Revenue', sub: 'Engineered for enterprise clients worldwide.', badge: '✦ Client Volume' },
        { num: '₹18 Cr+', label: 'Monthly Ad Spend', sub: 'Audited across Meta, Google & TikTok.', badge: '✦ Media Scale' },
        { num: '2.4M+', label: 'Qualified Leads', sub: 'High-intent B2B & D2C buyer acquisitions.', badge: '✦ Buyer Leads' },
        { num: '5.2x', label: 'Peak Ad ROAS', sub: 'Precision targeting & proprietary bidding.', badge: '✦ High ROAS' }
      ],
      // Card 3 (White)
      [
        { num: '10.4x', label: 'Average ROAS', sub: 'Across Meta, Google Search, & TikTok Ads.', badge: '✦ Media ROAS' },
        { num: '3.8x', label: 'Conversion Lift', sub: 'Sub-second speed & bespoke CRO funnels.', badge: '✦ CRO Boost' },
        { num: '14 Days', label: 'To First Scale Win', sub: 'Rapid onboarding blueprint execution.', badge: '✦ Fast Wins' },
        { num: '24/7', label: 'Live Looker Sync', sub: 'Real-time multi-channel ROI tracking.', badge: '✦ Live Sync' }
      ]
    ];

    const cardStates = [
      { quad: 0, dataIdx: 0 },
      { quad: 1, dataIdx: 0 },
      { quad: 2, dataIdx: 0 },
      { quad: 3, dataIdx: 0 }
    ];

    let isPaused = false;
    metricsStage.addEventListener('mouseenter', () => { isPaused = true; });
    metricsStage.addEventListener('mouseleave', () => { isPaused = false; });

    function advanceClockwiseMotion() {
      if (isPaused) return;

      cards.forEach((card, i) => {
        // 1. Advance Quadrant Clockwise (0 -> 1 -> 2 -> 3 -> 0)
        card.classList.remove(`quad-${cardStates[i].quad}`);
        cardStates[i].quad = (cardStates[i].quad + 1) % 4;
        card.classList.add(`quad-${cardStates[i].quad}`);

        // 2. Dynamically Update Data with smooth fade
        cardStates[i].dataIdx = (cardStates[i].dataIdx + 1) % metricStreams[i].length;
        const nextData = metricStreams[i][cardStates[i].dataIdx];

        card.classList.add('metric-updating');
        setTimeout(() => {
          const badgeEl = card.querySelector('.about-metric-badge');
          const numEl = card.querySelector('.about-metric-num');
          const labelEl = card.querySelector('.about-metric-label');
          const subEl = card.querySelector('.about-metric-sub');

          if (badgeEl) badgeEl.textContent = nextData.badge;
          if (numEl) numEl.textContent = nextData.num;
          if (labelEl) labelEl.textContent = nextData.label;
          if (subEl) subEl.textContent = nextData.sub;

          card.classList.remove('metric-updating');
        }, 220);
      });
    }

    // Run clockwise motion continuously every 3.8s
    setInterval(advanceClockwiseMotion, 3800);
  }

  // ------------------------------------------------------------------------
  // 2. Consultation Booking Modal (<dialog> + 3-Step Wizard)
  // ------------------------------------------------------------------------
  const consultModal = document.getElementById('consultationModal');
  const openConsultBtns = document.querySelectorAll('.open-consultation-btn');
  const closeConsultBtn = document.getElementById('closeConsultModal');

  // Open modal triggers
  openConsultBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultModal && typeof consultModal.showModal === 'function') {
        consultModal.showModal();
      }
    });
  });

  // Close modal trigger
  if (closeConsultBtn && consultModal) {
    closeConsultBtn.addEventListener('click', () => consultModal.close());
  }
  const closeInternalModalBtn = document.getElementById('closeModalBtn');
  if (closeInternalModalBtn && consultModal) {
    closeInternalModalBtn.addEventListener('click', () => consultModal.close());
  }
  document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (consultModal) consultModal.close();
      const sModal = document.getElementById('serviceDetailModal');
      if (sModal) sModal.close();
    });
  });

  // Light dismiss: click outside modal content
  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      const dialogDimensions = consultModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        consultModal.close();
      }
    });
  }

  // Wizard Step Navigation
  let currentStep = 1;
  const stepPanels = document.querySelectorAll('.wizard-panel');
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const toStep2Btn = document.getElementById('toStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const toStep3Btn = document.getElementById('toStep3Btn');
  const backToStep2Btn = document.getElementById('backToStep2Btn');

  function goToStep(step) {
    currentStep = step;
    stepPanels.forEach(panel => {
      panel.style.display = panel.getAttribute('data-step') === String(step) ? 'block' : 'none';
    });
    stepNodes.forEach((node, idx) => {
      if (idx + 1 === step) {
        node.classList.add('active');
        node.classList.remove('completed');
      } else if (idx + 1 < step) {
        node.classList.remove('active');
        node.classList.add('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    });
  }

  if (toStep2Btn) toStep2Btn.addEventListener('click', () => goToStep(2));
  if (backToStep1Btn) backToStep1Btn.addEventListener('click', () => goToStep(1));
  if (toStep3Btn) toStep3Btn.addEventListener('click', () => goToStep(3));
  if (backToStep2Btn) backToStep2Btn.addEventListener('click', () => goToStep(2));

  // Consultation Service Select Pill Toggles
  const servicePills = document.querySelectorAll('.service-select-pill');
  let selectedBookingServices = ['SEO Dominance', 'Social Media & Meta Ads'];

  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const val = pill.getAttribute('data-val');
      if (selectedBookingServices.includes(val)) {
        if (selectedBookingServices.length > 1) {
          selectedBookingServices = selectedBookingServices.filter(s => s !== val);
          pill.classList.remove('active');
        } else {
          showToast('Select at least one growth service', 'error');
        }
      } else {
        selectedBookingServices.push(val);
        pill.classList.add('active');
      }
    });
  });

  // Full Consultation Booking Form Submission
  const consultForm = document.getElementById('consultationBookingForm');
  if (consultForm) {
    consultForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Securing Slot...</span>';
      submitBtn.disabled = true;

      const payload = {
        services: selectedBookingServices,
        budget: document.getElementById('consultBudgetSelect')?.value || '₹25,000 - ₹50,000',
        booking_date: document.getElementById('consultDateInput')?.value || new Date().toISOString().split('T')[0],
        booking_time: document.getElementById('consultTimeSelect')?.value || '10:00 AM EST',
        full_name: document.getElementById('consultFullName')?.value,
        company: document.getElementById('consultCompany')?.value,
        email: document.getElementById('consultEmail')?.value,
        country_code: document.getElementById('consultCountryCode')?.value || '+91',
        phone: document.getElementById('consultPhone')?.value,
        website: document.getElementById('consultWebsite')?.value
      };

      const res = await submitConsultationBooking(payload);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (res.success) {
        triggerConfetti();
        showToast('Strategy session confirmed! Our team will send meeting calendar links.');
        const successView = document.getElementById('consultSuccessView');
        const wizardBody = document.getElementById('consultWizardBody');
        if (successView && wizardBody) {
          wizardBody.style.display = 'none';
          successView.style.display = 'block';
        }
        setTimeout(() => {
          if (consultModal) consultModal.close();
          // Reset view
          setTimeout(() => {
            goToStep(1);
            if (wizardBody) wizardBody.style.display = 'block';
            if (successView) successView.style.display = 'none';
            consultForm.reset();
          }, 400);
        }, 3000);
      } else {
        showToast(res.message || 'Submission error', 'error');
      }
    });
  }

  // Simple Consultation Form (Internal Pages Modal)
  const simpleConsultForm = document.getElementById('consultationForm');
  if (simpleConsultForm) {
    simpleConsultForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = simpleConsultForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Reserving Consultation...</span>';
        submitBtn.disabled = true;
      }

      const name = document.getElementById('leadName')?.value || document.getElementById('consultName')?.value || 'Valued Brand';
      const email = document.getElementById('leadEmail')?.value || document.getElementById('consultEmail')?.value || 'N/A';
      const phone = document.getElementById('leadPhone')?.value || document.getElementById('consultPhone')?.value || 'N/A';
      const service = document.getElementById('leadService')?.value || document.getElementById('consultService')?.value || 'Growth Strategy Audit';
      const notes = document.getElementById('leadNotes')?.value || 'Brand growth consultation request';

      const payload = {
        name,
        email,
        phone,
        service,
        notes
      };

      const res = (typeof submitProposalEnquiry === 'function')
        ? await submitProposalEnquiry(payload)
        : { success: true };

      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      if (res.success) {
        if (typeof triggerConfetti === 'function') triggerConfetti();
        showToast('Growth audit reserved! Dispatching to WhatsApp desk...');

        // Direct WhatsApp Lead Dispatch
        const waMsg = encodeURIComponent(
          `*✦ GROWTH AUDIT REQUEST | Smart Digital Wings*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📧 *Email:* ${email}\n` +
          `📞 *Phone:* ${phone}\n` +
          `🎯 *Service:* ${service}\n` +
          `📝 *Challenge/Target:* ${notes}\n\n` +
          `_Submitted via Private Strategy Desk on Smart Digital Wings._`
        );
        window.open(`https://api.whatsapp.com/send?phone=917017281826&text=${waMsg}`, '_blank');

        simpleConsultForm.reset();
        setTimeout(() => {
          if (consultModal) consultModal.close();
        }, 1500);
      } else {
        showToast(res.message || 'Submission error', 'error');
      }
    });
  }

  // ------------------------------------------------------------------------
  // Case Studies Category Filtering (Meta, SEO, Web Design, All)
  // ------------------------------------------------------------------------
  const csFilterBtns = document.querySelectorAll('.case-study-filters .filter-btn');
  const csCards = document.querySelectorAll('.case-study-detail-card');

  if (csFilterBtns.length > 0 && csCards.length > 0) {
    csFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        csFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        csCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.35s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Hero Section Quick Proposal Form (With Direct WhatsApp Dispatch)
  // ------------------------------------------------------------------------
  const heroForm = document.getElementById('heroProposalForm');
  if (heroForm) {
    heroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = heroForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Generating Your Roadmap...</span>';
      submitBtn.disabled = true;

      const payload = {
        name: document.getElementById('heroName')?.value || '',
        phone: document.getElementById('heroPhone')?.value || '',
        email: document.getElementById('heroEmail')?.value || '',
        service: document.getElementById('heroService')?.value || '',
        budget: document.getElementById('heroBudget')?.value || ''
      };

      // 1. Submit to lead repository/API
      await submitProposalEnquiry(payload);

      // 2. Construct clean formatted WhatsApp message for direct dispatch
      const agencyWhatsApp = '917017281826';
      const waMessage = 
`🚀 *NEW GROWTH PROPOSAL ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${payload.name}
📱 *Phone / WhatsApp:* ${payload.phone}
✉️ *Work Email:* ${payload.email}
💼 *Monthly Budget:* ${payload.budget}
🎯 *Primary Growth Goal:* ${payload.service}
━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* Smart Digital Wings Instant Proposal Audit
⏱️ *Timestamp:* ${new Date().toLocaleString('en-IN')}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${agencyWhatsApp}&text=${encodeURIComponent(waMessage)}`;

      // 3. Reset button state & show celebratory feedback
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      triggerConfetti();
      showToast('Proposal request received! Our Growth Director will connect with your roadmap shortly.');

      // 4. Dispatch WhatsApp message directly
      window.open(waUrl, '_blank');

      heroForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 3.1 Internal Service Pages Fast-Track Quote Forms
  // ------------------------------------------------------------------------
  const fastTrackForms = document.querySelectorAll('.internal-fast-track-form');
  fastTrackForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Generating Proposal...</span>';
      submitBtn.disabled = true;

      const nameInput = form.querySelector('.ft-name');
      const phoneInput = form.querySelector('.ft-phone');
      const budgetInput = form.querySelector('.ft-budget');
      const serviceName = form.getAttribute('data-service') || 'Comprehensive Growth';

      const payload = {
        name: nameInput?.value || '',
        phone: phoneInput?.value || '',
        budget: budgetInput?.value || '',
        service: serviceName
      };

      // 1. Submit lead to local API/tracker
      await submitProposalEnquiry(payload);

      // 2. Format WhatsApp message
      const agencyWhatsApp = '917017281826';
      const waMessage = 
`🚀 *FAST-TRACK PROPOSAL ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━
🎯 *Service Requested:* ${payload.service}
👤 *Full Name:* ${payload.name}
📱 *Phone / WhatsApp:* ${payload.phone}
💼 *Monthly Budget:* ${payload.budget}
━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* Smart Digital Wings Internal Service Audit
⏱️ *Timestamp:* ${new Date().toLocaleString('en-IN')}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${agencyWhatsApp}&text=${encodeURIComponent(waMessage)}`;

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      triggerConfetti();
      showToast(`Audit request received for ${serviceName}! Our Director will connect shortly.`);

      // 3. Dispatch to WhatsApp
      window.open(waUrl, '_blank');

      form.reset();
    });
  });

  // ------------------------------------------------------------------------
  // 4. Services Deep-Dive Modal
  // ------------------------------------------------------------------------
  const serviceModal = document.getElementById('serviceDetailModal');
  const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
  const serviceDetailBtns = document.querySelectorAll('.open-service-modal-btn');

  const serviceScopes = {
    smm: {
      title: 'Social Media Marketing & Meta Ads',
      tagline: 'Scale organic reach, craft viral reels & drive high-ROAS paid funnels.',
      metric: '4.8x Avg ROAS',
      timeline: '2-4 Weeks Initial Lift',
      price: 'Starting at ₹45,000 / mo',
      deliverables: [
        'High-Converting Meta (Instagram/Facebook) & TikTok Ad Strategies',
        'Custom 4K Video Reel & Short-Form Motion Creative Production',
        'B2B LinkedIn Lead Generation & Executive Thought Leadership',
        'Influencer Partnership Management & Content Rights Licensing',
        '24/7 Community Moderation, DM Automation & Retargeting'
      ]
    },
    seo: {
      title: 'Technical SEO & Search Dominance',
      tagline: 'Outrank competitors on Google & capture ready-to-buy organic intent.',
      metric: '340% Traffic Lift',
      timeline: '60-90 Days Rank Jump',
      price: 'Starting at ₹35,000 / mo',
      deliverables: [
        'Full Core Web Vitals, Crawlability & Indexation Optimization',
        'High-Intent Buyer Keyword Mapping & Search Intent Clusters',
        'Tier-1 Authority Backlink Acquisition & PR Link Outreach',
        'Google Business Profile & Multi-Location Local SEO Domination',
        'Structured Schema Markup & Semantic Search (SGE) GEO Readiness'
      ]
    },
    web: {
      title: 'High-Converting Bespoke Web Design',
      tagline: 'Sub-second mobile speed, luxury UI/UX & conversion-focused layouts.',
      metric: '99/100 Speed Index',
      timeline: '2-3 Weeks Turnaround',
      price: 'Starting at ₹60,000 / project',
      deliverables: [
        'Custom Luxury Dark & Gold Responsive Web Design Architecture',
        'Conversion Rate Optimization (CRO) Copywriting & Layouts',
        'Interactive Custom Calculators, Booking Engines & Lead Tools',
        'Next.js / Vite Headless Modern CMS Integration',
        'Cross-Browser Accessibility & Flawless Mobile Responsiveness'
      ]
    },
    ppc: {
      title: 'Google Ads & Performance PPC',
      tagline: 'High-intent search, Shopping, and YouTube Ad campaigns at scale.',
      metric: 'Sub-₹1,500 CPL',
      timeline: '7-14 Days Launch',
      price: 'Starting at ₹40,000 / mo',
      deliverables: [
        'High-Intent Exact Match Search Campaign Setup',
        'Google Performance Max & Shopping Feed Optimization',
        'Negative Keyword Shielding to Eliminate Wasted Spend',
        'Advanced Conversion Tracking & Offline Call Attribution',
        'Bi-Weekly ROAS Analytics & Bid Strategy Scaling'
      ]
    },
    branding: {
      title: 'Brand Identity & Content Studio',
      tagline: 'Unified visual prestige, 3D assets, and luxury brand design.',
      metric: '100% Brand Unity',
      timeline: '3 Weeks Delivery',
      price: 'Starting at ₹30,000 / project',
      deliverables: [
        'Complete Luxury Brand Guidelines Book & Color Tokens',
        'Vector Logo Suite & 4K 3D Animated Logo Stingers',
        'Social Media Creative Templates & Iconography Kits',
        'Pitch Deck, Business Card & Corporate Stationary Design',
        'Copyright Ownership & Complete Vector Source File Delivery'
      ]
    },
    cro: {
      title: 'Analytics, Heatmaps & CRO Growth',
      tagline: 'Turn existing traffic into double the revenue with split testing.',
      metric: '+120% Conversion Lift',
      timeline: 'Continuous Optimization',
      price: 'Starting at ₹25,000 / mo',
      deliverables: [
        'User Session Recording & Heatmap Click Analysis',
        'Checkout & Form Drop-off Friction Reduction',
        'A/B Split Testing for Landing Page Headlines & CTAs',
        'Google Analytics 4 Enhanced Ecommerce Tracking',
        'Monthly Actionable Growth & UX Experiment Reports'
      ]
    }
  };

  serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      const data = serviceScopes[serviceId];
      if (!data) return;

      document.getElementById('serviceModalTitle').textContent = data.title;
      document.getElementById('serviceModalTagline').textContent = data.tagline;
      document.getElementById('serviceModalMetric').textContent = data.metric;
      document.getElementById('serviceModalTimeline').textContent = data.timeline;
      document.getElementById('serviceModalPrice').textContent = data.price;

      const listEl = document.getElementById('serviceModalDeliverables');
      listEl.innerHTML = data.deliverables.map(d => `
        <li style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;font-size:0.9375rem;color:var(--text-main);">
          <span style="color:var(--gold-light);flex-shrink:0;">✦</span>
          <span>${d}</span>
        </li>
      `).join('');

      if (serviceModal && typeof serviceModal.showModal === 'function') {
        serviceModal.showModal();
      }
    });
  });

  if (closeServiceModalBtn && serviceModal) {
    closeServiceModalBtn.addEventListener('click', () => serviceModal.close());
  }

  // ------------------------------------------------------------------------
  // 5. Case Studies Portfolio Category Filter
  // ------------------------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip-btn');
  const caseStudyCards = document.querySelectorAll('.case-study-card');
  let currentFilter = 'all';

  function updateCaseStudiesVisibility() {
    caseStudyCards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      const matchesFilter = currentFilter === 'all' || cat === currentFilter;
      card.classList.toggle('is-hidden', !matchesFilter);
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter') || 'all';
      updateCaseStudiesVisibility();
    });
  });

  // Pre-decode all case study images in the background for zero-latency tab switching
  caseStudyCards.forEach((card) => {
    const img = card.querySelector('img');
    if (img && typeof img.decode === 'function') {
      img.decode().catch(() => {});
    }
  });

  // Initial call on page load: ensures all cards in the section are active
  updateCaseStudiesVisibility();

  // ------------------------------------------------------------------------
  // 6. FAQ Accordions
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. Contact Form Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactEnquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Message...</span>';
      submitBtn.disabled = true;

      const payload = {
        name: document.getElementById('contactName')?.value,
        email: document.getElementById('contactEmail')?.value,
        phone: document.getElementById('contactPhone')?.value,
        website: document.getElementById('contactWebsite')?.value,
        service: document.getElementById('contactService')?.value,
        message: document.getElementById('contactMessage')?.value
      };

      const res = await submitContactEnquiry(payload);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (res.success) {
        triggerConfetti();
        showToast('Enquiry sent successfully! Our executive will contact you shortly.');
        contactForm.reset();
      } else {
        showToast(res.message || 'Submission error', 'error');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. Testimonials Carousel Next/Prev
  // ------------------------------------------------------------------------
  const prevReviewBtn = document.getElementById('prevReviewBtn');
  const nextReviewBtn = document.getElementById('nextReviewBtn');
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (prevReviewBtn && nextReviewBtn && reviewsContainer) {
    nextReviewBtn.addEventListener('click', () => {
      const firstChild = reviewsContainer.firstElementChild;
      if (firstChild) {
        reviewsContainer.appendChild(firstChild);
      }
    });
    prevReviewBtn.addEventListener('click', () => {
      const lastChild = reviewsContainer.lastElementChild;
      if (lastChild) {
        reviewsContainer.insertBefore(lastChild, reviewsContainer.firstElementChild);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. Headquarters Contact Page Form
  // ------------------------------------------------------------------------
  const hqContactForm = document.getElementById('contactHeadquartersForm');
  if (hqContactForm) {
    hqContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = hqContactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Enquiry';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmitting Dossier...</span>';
        submitBtn.disabled = true;
      }

      const payload = {
        name: document.getElementById('contactName')?.value,
        email: document.getElementById('contactEmail')?.value,
        phone: document.getElementById('contactPhone')?.value,
        service: document.getElementById('contactService')?.value,
        budget: document.getElementById('contactBudget')?.value,
        message: document.getElementById('contactMessage')?.value
      };

      const res = (typeof submitContactEnquiry === 'function')
        ? await submitContactEnquiry(payload)
        : { success: true };

      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      if (res.success) {
        if (typeof triggerConfetti === 'function') triggerConfetti();
        showToast('Official enquiry registered! An account director will reach out shortly.');
        hqContactForm.reset();
      } else {
        showToast(res.message || 'Submission error', 'error');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. Case Studies Hub Category Filters
  // ------------------------------------------------------------------------
  const csTabs = document.querySelectorAll('.cs-tab');
  const csDetailCards = document.querySelectorAll('.cs-detail-card');
  if (csTabs.length > 0) {
    csTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        csTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        csDetailCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
