/**
 * SMART DIGITAL WINGS - MAIN APPLICATION SCRIPT
 * Orchestrates navigation, modals, form workflows, accordions, and interactive services.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 0. Clean URL Handler: Prevent '#' from showing in browser address bar
  // ------------------------------------------------------------------------
  if (window.location.hash) {
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
  }

  // Intercept all hash-based anchor clicks so browser URL bar remains clean without '#'
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href*="#"]');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (href.length > 1) {
          try {
            const targetEl = document.querySelector(href);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          } catch (err) {
            // Ignore invalid selector
          }
        }
        if (window.location.hash) {
          history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      } else if (href && href.includes('#') && !href.startsWith('http') && !href.startsWith('//')) {
        const [page, hash] = href.split('#');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (page === '' || page === currentPage) {
          e.preventDefault();
          if (hash) {
            try {
              const targetEl = document.getElementById(hash);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            } catch (err) {}
          }
          if (window.location.hash) {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
          }
        }
      }
    }
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  });

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

    const colorThemes = ['card-blue', 'card-emerald', 'card-gold', 'card-cyan'];

    const cardStates = [
      { quad: 0, dataIdx: 0, colorIdx: 0 },
      { quad: 1, dataIdx: 0, colorIdx: 1 },
      { quad: 2, dataIdx: 0, colorIdx: 2 },
      { quad: 3, dataIdx: 0, colorIdx: 3 }
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

        // 2. Cycle Colors: Each card takes a different distinct color when changing position
        card.classList.remove(colorThemes[cardStates[i].colorIdx]);
        cardStates[i].colorIdx = (cardStates[i].colorIdx + 1) % colorThemes.length;
        card.classList.add(colorThemes[cardStates[i].colorIdx]);

        // 3. Dynamically Update Data with smooth fade
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

    // Run clockwise motion continuously every 3.8s (restored original smooth timer)
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
  let selectedBookingServices = ['SEO Dominance', 'Social Media Marketing'];

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
  // 7. Minimalist Contact Form Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactEnquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span> <span>&rarr;</span>';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Sending Message...</span>';
        submitBtn.disabled = true;
      }

      const payload = {
        name: document.getElementById('contactName')?.value || '',
        email: document.getElementById('contactEmail')?.value || '',
        phone: document.getElementById('contactPhone')?.value || '',
        website: document.getElementById('contactWebsite')?.value || '',
        service: document.getElementById('contactService')?.value || 'General Consultation',
        message: document.getElementById('contactMessage')?.value || ''
      };

      const res = await submitContactEnquiry(payload);
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      if (res.success) {
        if (typeof showToast === 'function') {
          showToast('Thank you! Your message has been sent successfully.');
        }
        contactForm.reset();
      } else {
        if (typeof showToast === 'function') {
          showToast(res.message || 'Submission error. Please email or message us directly.', 'error');
        }
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

  // ------------------------------------------------------------------------
  // High-Performance Interactive Living Cyber Particle Constellation Engine
  // ------------------------------------------------------------------------
  const heroCanvas = document.getElementById('heroLiveCanvas');
  const heroSectionRef = document.getElementById('hero');
  if (heroCanvas && heroSectionRef) {
    const ctx = heroCanvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;
    const mouse = { x: -1000, y: -1000, radius: 175 };

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = heroSectionRef.offsetWidth;
      height = heroSectionRef.offsetHeight;
      if (width <= 0 || height <= 0) return;
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.floor(Math.min(Math.max(width * 0.042, 35), 60));
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() > 0.62;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2 + 1.2,
          color: isGold ? 'rgba(245, 158, 11, ' : 'rgba(56, 189, 248, ',
          alpha: Math.random() * 0.45 + 0.45,
          pulseSpeed: Math.random() * 0.03 + 0.02,
          pulse: Math.random() * Math.PI
        });
      }
    }

    heroSectionRef.addEventListener('mousemove', (e) => {
      const rect = heroSectionRef.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSectionRef.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function drawParticles() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const maxDist = 120;
      const maxDistSq = maxDist * maxDist;

      // 1. Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connection to cursor
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
        if (distMouseSq < mouse.radius * mouse.radius) {
          const distMouse = Math.sqrt(distMouseSq);
          const mouseAlpha = (1 - distMouse / mouse.radius) * 0.6;
          ctx.strokeStyle = `rgba(56, 189, 248, ${mouseAlpha})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.32;
            ctx.strokeStyle = p1.color + `${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; }

        p.pulse += p.pulseSpeed;
        const currentAlpha = Math.min(Math.max(p.alpha + Math.sin(p.pulse) * 0.2, 0.2), 1);
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.4;

        // Glowing outer halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + `${currentAlpha * 0.35})`;
        ctx.fill();

        // Bright solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + `${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(drawParticles);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSectionRef);
    }

    window.addEventListener('resize', () => {
      clearTimeout(window._heroCanvasTimer);
      window._heroCanvasTimer = setTimeout(resizeCanvas, 100);
    });

    resizeCanvas();
    animationFrameId = requestAnimationFrame(drawParticles);
  }

  // ------------------------------------------------------------------------
  // 13. Service Internal Pages Results Multi-Card Slider
  // ------------------------------------------------------------------------
  document.querySelectorAll('.results-slider-section').forEach(section => {
    const track = section.querySelector('.results-slider-track');
    const prevBtn = section.querySelector('.slider-prev-btn');
    const nextBtn = section.querySelector('.slider-next-btn');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const card = track.querySelector('.result-slide-card');
        const scrollAmount = card ? card.offsetWidth + 20 : 340;
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const card = track.querySelector('.result-slide-card');
        const scrollAmount = card ? card.offsetWidth + 20 : 340;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // ------------------------------------------------------------------------
  // 14. Ultra-Cinema Golden Wings Video Hero Banner Controller (1080p)
  // ------------------------------------------------------------------------
  const heroCinemaVideo = document.getElementById('heroCinemaVideo');
  const videoPlayPauseBtn = document.getElementById('videoPlayPauseBtn');
  const videoAudioBtn = document.getElementById('videoAudioBtn');

  if (heroCinemaVideo) {
    heroCinemaVideo.muted = true;
    heroCinemaVideo.defaultMuted = true;

    let userManuallyPaused = false;

    // Trigger autoplay safely
    const playPromise = heroCinemaVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        heroCinemaVideo.muted = true;
        heroCinemaVideo.play().catch(() => {});
      });
    }

    // Play / Pause Toggle Button
    if (videoPlayPauseBtn) {
      const pauseIcon = videoPlayPauseBtn.querySelector('.ctrl-icon-pause');
      const playIcon = videoPlayPauseBtn.querySelector('.ctrl-icon-play');
      const btnLabel = videoPlayPauseBtn.querySelector('.ctrl-btn-label');

      function updatePlayPauseUI(isPaused) {
        if (pauseIcon && playIcon) {
          pauseIcon.style.display = isPaused ? 'none' : 'block';
          playIcon.style.display = isPaused ? 'block' : 'none';
        }
        if (btnLabel) {
          btnLabel.textContent = isPaused ? 'Play' : 'Pause';
        }
        videoPlayPauseBtn.setAttribute('aria-label', isPaused ? 'Play Video' : 'Pause Video');
      }

      videoPlayPauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (heroCinemaVideo.paused) {
          userManuallyPaused = false;
          heroCinemaVideo.play();
          updatePlayPauseUI(false);
        } else {
          userManuallyPaused = true;
          heroCinemaVideo.pause();
          updatePlayPauseUI(true);
        }
      });

      heroCinemaVideo.addEventListener('play', () => updatePlayPauseUI(false));
      heroCinemaVideo.addEventListener('pause', () => {
        if (userManuallyPaused) {
          updatePlayPauseUI(true);
        }
      });
    }

    // Audio Mute / Unmute Toggle Button
    if (videoAudioBtn) {
      const mutedIcon = videoAudioBtn.querySelector('.ctrl-icon-muted');
      const unmutedIcon = videoAudioBtn.querySelector('.ctrl-icon-unmuted');
      const audioLabel = document.getElementById('audioBtnLabel');

      function updateAudioUI(isMuted) {
        if (mutedIcon && unmutedIcon) {
          mutedIcon.style.display = isMuted ? 'block' : 'none';
          unmutedIcon.style.display = isMuted ? 'none' : 'block';
        }
        if (audioLabel) {
          audioLabel.textContent = isMuted ? 'Sound On' : 'Mute';
        }
        videoAudioBtn.setAttribute('aria-label', isMuted ? 'Unmute Audio' : 'Mute Audio');
      }

      videoAudioBtn.addEventListener('click', (e) => {
        e.preventDefault();
        heroCinemaVideo.muted = !heroCinemaVideo.muted;
        updateAudioUI(heroCinemaVideo.muted);
      });
    }

    // Auto pause video when scrolled offscreen to conserve system resources
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            if (!heroCinemaVideo.paused) {
              heroCinemaVideo.pause();
            }
          } else {
            if (!userManuallyPaused && heroCinemaVideo.paused) {
              heroCinemaVideo.play().catch(() => {});
            }
          }
        });
      }, { threshold: 0.2 });

      videoObserver.observe(heroCinemaVideo);
    }
  }

  // ------------------------------------------------------------------------
  // Fallback: Ultra-Premium Cinema Auto Slider Banner (Infinite Loop)
  // ------------------------------------------------------------------------
  const sliderTrack = document.getElementById('mainSliderTrack');
  const heroSlider = document.querySelector('.premium-slider-banner, .full-screen-slider-banner');

  if (sliderTrack && heroSlider) {
    if (window.__heroSliderInitialized) return;
    window.__heroSliderInitialized = true;

    const slides = Array.from(sliderTrack.querySelectorAll('.slider-slide'));
    const prevBtn = document.getElementById('fullSliderPrev');
    const nextBtn = document.getElementById('fullSliderNext');
    const dotsContainer = document.getElementById('fullSliderDots');
    const counterEl = document.getElementById('fullSliderCounter');
    const currentNumEl = counterEl ? counterEl.querySelector('.current-slide') : null;
    const totalNumEl = counterEl ? counterEl.querySelector('.total-slides') : null;
    const segments = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.segment-btn')) : [];
    const pauseToggleBtn = document.getElementById('sliderPauseBtn');

    const SLIDE_DURATION = 4500; // 4.5 seconds per slide for an active, engaging auto-loop
    let currentSlide = 0;
    let autoSlideTimer = null;
    let isPaused = false;

    // Set initial total count
    if (totalNumEl) {
      totalNumEl.textContent = String(slides.length).padStart(2, '0');
    }
    if (currentNumEl) {
      currentNumEl.textContent = '01';
    }

    function updateSegments(activeIdx, duration) {
      segments.forEach((seg, idx) => {
        const fill = seg.querySelector('.segment-fill');
        if (!fill) return;

        if (idx < activeIdx) {
          seg.classList.remove('active');
          seg.classList.add('completed');
          seg.setAttribute('aria-selected', 'false');
          fill.style.transition = 'none';
          fill.style.width = '100%';
        } else if (idx > activeIdx) {
          seg.classList.remove('active', 'completed');
          seg.setAttribute('aria-selected', 'false');
          fill.style.transition = 'none';
          fill.style.width = '0%';
        } else {
          // Current active segment: smoothly fill from 0 to 100%
          seg.classList.add('active');
          seg.classList.remove('completed');
          seg.setAttribute('aria-selected', 'true');

          fill.style.transition = 'none';
          fill.style.width = '0%';
          void fill.offsetWidth; // Force synchronous reflow to reliably restart transition
          fill.style.transition = `width ${duration}ms linear`;
          fill.style.width = '100%';
        }
      });
    }

    function goToSlide(index) {
      if (slides.length <= 1) return;

      // Infinite loop math: wraps seamlessly back to 0 after last slide
      const targetIndex = ((index % slides.length) + slides.length) % slides.length;

      // Update slide active states
      slides.forEach((slide, idx) => {
        if (idx === targetIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      currentSlide = targetIndex;

      // Update numerical counter (01, 02, 03)
      if (currentNumEl) {
        currentNumEl.textContent = String(currentSlide + 1).padStart(2, '0');
      }

      // Always clear and reschedule next slide for continuous infinite loop
      clearTimeout(autoSlideTimer);

      if (!isPaused) {
        updateSegments(currentSlide, SLIDE_DURATION);
        scheduleNext(SLIDE_DURATION);
      } else {
        updateSegments(currentSlide, 0);
      }
    }

    function scheduleNext(duration) {
      clearTimeout(autoSlideTimer);
      autoSlideTimer = setTimeout(() => {
        if (!isPaused) {
          goToSlide(currentSlide + 1);
        }
      }, duration);
    }

    function pauseSlider() {
      if (isPaused) return;
      isPaused = true;
      clearTimeout(autoSlideTimer);
      segments.forEach(seg => {
        const fill = seg.querySelector('.segment-fill');
        if (fill && seg.classList.contains('active')) {
          const computedWidth = window.getComputedStyle(fill).width;
          fill.style.transition = 'none';
          fill.style.width = computedWidth;
        }
      });
      updatePauseButtonUI(true);
    }

    function resumeSlider() {
      if (!isPaused) return;
      isPaused = false;
      goToSlide(currentSlide);
      updatePauseButtonUI(false);
    }

    function updatePauseButtonUI(paused) {
      if (!pauseToggleBtn) return;
      const pauseIcon = pauseToggleBtn.querySelector('.pause-icon');
      const playIcon = pauseToggleBtn.querySelector('.play-icon');
      if (pauseIcon && playIcon) {
        pauseIcon.style.display = paused ? 'none' : 'block';
        playIcon.style.display = paused ? 'block' : 'none';
        pauseToggleBtn.setAttribute('aria-label', paused ? 'Resume Slideshow' : 'Pause Slideshow');
      }
    }

    // Explicit Play / Pause Button Toggle
    if (pauseToggleBtn) {
      pauseToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isPaused) {
          resumeSlider();
        } else {
          pauseSlider();
        }
      });
    }

    // Previous / Next button listeners (immediately jump and continue loop)
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      });
    }

    // Segment tab click listeners (jump directly and keep auto loop running)
    segments.forEach((seg, idx) => {
      seg.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
      });
    });

    // Keyboard navigation (ArrowLeft / ArrowRight)
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      }
    });

    // Mobile touch swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;
    heroSlider.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
          if (deltaX < 0) {
            goToSlide(currentSlide + 1);
          } else {
            goToSlide(currentSlide - 1);
          }
        }
      }
    }, { passive: true });

    // Handle tab visibility changes (pause when user switches away, resume on return)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(autoSlideTimer);
      } else if (!isPaused) {
        scheduleNext(1200);
      }
    });

    // Kick off initial slide and start continuous auto-play loop
    updateSegments(0, SLIDE_DURATION);
    scheduleNext(SLIDE_DURATION);
  }

  // Ensure Agency Showcase Video is explicitly muted by default
  const agencyVideo = document.getElementById('agencyVideoPlayer');
  if (agencyVideo) {
    agencyVideo.muted = true;
    agencyVideo.defaultMuted = true;
  }

  // ------------------------------------------------------------------------
  // Customer Reviews Carousel (Split Horizontal Card Slider)
  // ------------------------------------------------------------------------
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevReviewBtn = document.getElementById('prevReviewBtn');
  const nextReviewBtn = document.getElementById('nextReviewBtn');
  const reviewsViewport = document.getElementById('reviewsViewport');
  const reviewsDotsContainer = document.getElementById('reviewsDots');

  if (reviewsTrack && prevReviewBtn && nextReviewBtn) {
    let currentReviewSlide = 0;
    const cards = reviewsTrack.querySelectorAll('.testimonial-card-split');
    const totalCards = cards.length;
    let reviewAutoTimer = null;

    function getCardsPerView() {
      return window.innerWidth > 1024 ? 2 : 1;
    }

    function getMaxSlides() {
      const perView = getCardsPerView();
      return Math.ceil(totalCards / perView);
    }

    function renderDots() {
      if (!reviewsDotsContainer) return;
      const maxSlides = getMaxSlides();
      reviewsDotsContainer.innerHTML = '';
      for (let i = 0; i < maxSlides; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'review-dot' + (i === currentReviewSlide ? ' active' : '');
        dot.setAttribute('data-slide', i);
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => {
          updateReviewsSlider(i);
          resetReviewTimer();
        });
        reviewsDotsContainer.appendChild(dot);
      }
    }

    function updateReviewsSlider(targetIndex) {
      const maxSlides = getMaxSlides();
      const perView = getCardsPerView();

      if (targetIndex < 0) {
        currentReviewSlide = maxSlides - 1;
      } else if (targetIndex >= maxSlides) {
        currentReviewSlide = 0;
      } else {
        currentReviewSlide = targetIndex;
      }

      if (cards.length > 0) {
        const targetCardIndex = Math.min(currentReviewSlide * perView, cards.length - 1);
        const targetCard = cards[targetCardIndex];
        const firstCard = cards[0];
        
        // Exact pixel offset from first card's position inside track
        // Prevents over-translation that clips the left card's border radius
        const offset = targetCard.offsetLeft - firstCard.offsetLeft;
        reviewsTrack.style.transform = `translateX(-${offset}px)`;
      }

      // Update active dot
      if (reviewsDotsContainer) {
        const allDots = reviewsDotsContainer.querySelectorAll('.review-dot');
        allDots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentReviewSlide);
        });
      }
    }

    prevReviewBtn.addEventListener('click', () => {
      updateReviewsSlider(currentReviewSlide - 1);
      resetReviewTimer();
    });

    nextReviewBtn.addEventListener('click', () => {
      updateReviewsSlider(currentReviewSlide + 1);
      resetReviewTimer();
    });

    // Touch Swipe Support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    reviewsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    reviewsTrack.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          updateReviewsSlider(currentReviewSlide + 1);
        } else {
          updateReviewsSlider(currentReviewSlide - 1);
        }
        resetReviewTimer();
      }
    }, { passive: true });

    // Auto-advance every 3.5 seconds (in 3-4s range), pausing on hover
    function startReviewTimer() {
      stopReviewTimer();
      reviewAutoTimer = setInterval(() => {
        updateReviewsSlider(currentReviewSlide + 1);
      }, 3500);
    }

    function stopReviewTimer() {
      if (reviewAutoTimer) {
        clearInterval(reviewAutoTimer);
        reviewAutoTimer = null;
      }
    }

    function resetReviewTimer() {
      stopReviewTimer();
      startReviewTimer();
    }

    if (reviewsViewport) {
      reviewsViewport.addEventListener('mouseenter', stopReviewTimer);
      reviewsViewport.addEventListener('mouseleave', startReviewTimer);
    }

    renderDots();
    updateReviewsSlider(0);
    startReviewTimer();

    window.addEventListener('resize', () => {
      renderDots();
      updateReviewsSlider(currentReviewSlide);
    });
  }

  // ------------------------------------------------------------------------
  // Service Cards Click Delegation (Full Card Clickable)
  // ------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    // Only process primary (left) clicks
    if (e.button !== 0) return;

    // Preserve WhatsApp consultation button functionality completely
    if (e.target.closest('.service-btn-whatsapp') || e.target.closest('.service-btn-wa')) {
      return;
    }

    // If an anchor was clicked directly (title link, media link, explore button), let standard behavior handle it
    if (e.target.closest('a')) {
      return;
    }

    // Check if the click occurred on a service image card
    const card = e.target.closest('.service-image-card');
    if (!card) return;

    const targetUrl = card.getAttribute('data-card-href') ||
                      card.querySelector('.service-card-title-link')?.getAttribute('href') ||
                      card.querySelector('.service-btn-details')?.getAttribute('href');

    if (targetUrl) {
      if (e.ctrlKey || e.metaKey) {
        window.open(targetUrl, '_blank');
      } else {
        window.location.href = targetUrl;
      }
    }
  });

  // ------------------------------------------------------------------------
  // 15. 3D Perspective Coverflow Slider & Modern Gallery Lightbox
  // ------------------------------------------------------------------------
  let galleryModal = null;
  let galleryImg = null;
  let galleryCanvas = null;
  let galleryCounter = null;
  let galleryThumbsContainer = null;
  let currentGalleryIndex = 0;
  let currentGalleryImages = [];
  let onGalleryIndexChange = null;
  let currentZoom = 1;
  const minZoom = 0.8;
  const maxZoom = 3.5;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let translateX = 0;
  let translateY = 0;

  function initModernGalleryModal() {
    if (galleryModal) return;

    const existingModal = document.getElementById('modernCoverflowGallery');
    if (existingModal) {
      galleryModal = existingModal;
      galleryImg = existingModal.querySelector('.modern-gallery-img');
      galleryCanvas = existingModal.querySelector('.modern-gallery-canvas');
      galleryCounter = existingModal.querySelector('.modern-gallery-counter');
      galleryThumbsContainer = existingModal.querySelector('.modern-gallery-thumbs');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'modernCoverflowGallery';
    modal.className = 'modern-gallery-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="modern-gallery-backdrop"></div>
      <div class="modern-gallery-container">
        <div class="modern-gallery-toolbar">
          <div class="modern-gallery-counter" aria-live="polite">1 / 1</div>
          <div class="modern-gallery-tools">
            <button type="button" class="gallery-tool-btn" data-action="zoom-in" aria-label="Zoom in">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button type="button" class="gallery-tool-btn" data-action="zoom-out" aria-label="Zoom out">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button type="button" class="gallery-tool-btn" data-action="reset" aria-label="Reset zoom">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <polyline points="3 3 3 8 8 8"></polyline>
              </svg>
            </button>
            <button type="button" class="gallery-tool-btn" data-action="fullscreen" aria-label="Toggle fullscreen">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
            <button type="button" class="gallery-tool-btn gallery-close-btn" data-action="close" aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <button type="button" class="modern-gallery-arrow modern-gallery-prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button type="button" class="modern-gallery-arrow modern-gallery-next" aria-label="Next">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="modern-gallery-viewport">
          <div class="modern-gallery-canvas">
            <img class="modern-gallery-img" src="" alt="Gallery Image Preview">
          </div>
        </div>

        <div class="modern-gallery-thumbs"></div>
      </div>
    `;

    document.body.appendChild(modal);

    galleryModal = modal;
    galleryImg = modal.querySelector('.modern-gallery-img');
    galleryCanvas = modal.querySelector('.modern-gallery-canvas');
    galleryCounter = modal.querySelector('.modern-gallery-counter');
    galleryThumbsContainer = modal.querySelector('.modern-gallery-thumbs');

    modal.querySelector('[data-action="zoom-in"]').addEventListener('click', (e) => {
      e.stopPropagation();
      adjustZoom(0.35);
    });
    modal.querySelector('[data-action="zoom-out"]').addEventListener('click', (e) => {
      e.stopPropagation();
      adjustZoom(-0.35);
    });
    modal.querySelector('[data-action="reset"]').addEventListener('click', (e) => {
      e.stopPropagation();
      resetZoomTransform();
    });
    modal.querySelector('[data-action="fullscreen"]').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreen();
    });
    modal.querySelector('[data-action="close"]').addEventListener('click', (e) => {
      e.stopPropagation();
      closeGallery();
    });
    modal.querySelector('.modern-gallery-backdrop').addEventListener('click', closeGallery);

    modal.querySelector('.modern-gallery-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      prevGalleryImage();
    });
    modal.querySelector('.modern-gallery-next').addEventListener('click', (e) => {
      e.stopPropagation();
      nextGalleryImage();
    });

    // Double-click image to toggle zoom
    galleryImg.addEventListener('dblclick', () => {
      if (currentZoom > 1.05) {
        resetZoomTransform();
      } else {
        setZoom(2.0);
      }
    });

    // Mouse wheel zoom
    galleryModal.querySelector('.modern-gallery-viewport').addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      adjustZoom(delta);
    }, { passive: false });

    // Drag to pan when zoomed
    galleryCanvas.addEventListener('mousedown', (e) => {
      if (currentZoom <= 1.05) return;
      isDragging = true;
      dragStartX = e.clientX - translateX;
      dragStartY = e.clientY - translateY;
      galleryCanvas.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      translateX = e.clientX - dragStartX;
      translateY = e.clientY - dragStartY;
      applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (galleryCanvas) galleryCanvas.classList.remove('is-dragging');
      }
    });

    // Touch support for drag and swipe
    let touchStartX = 0;
    galleryCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        if (currentZoom > 1.05) {
          isDragging = true;
          dragStartX = e.touches[0].clientX - translateX;
          dragStartY = e.touches[0].clientY - translateY;
        }
      }
    }, { passive: true });

    galleryCanvas.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        translateX = e.touches[0].clientX - dragStartX;
        translateY = e.touches[0].clientY - dragStartY;
        applyTransform();
      }
    }, { passive: true });

    galleryCanvas.addEventListener('touchend', (e) => {
      if (isDragging) {
        isDragging = false;
      } else if (currentZoom <= 1.05 && e.changedTouches.length === 1) {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) nextGalleryImage();
          else prevGalleryImage();
        }
      }
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!galleryModal || !galleryModal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeGallery();
      else if (e.key === 'ArrowRight') nextGalleryImage();
      else if (e.key === 'ArrowLeft') prevGalleryImage();
      else if (e.key === '+' || e.key === '=') adjustZoom(0.35);
      else if (e.key === '-' || e.key === '_') adjustZoom(-0.35);
      else if (e.key === '0' || e.key === 'r') resetZoomTransform();
      else if (e.key === 'f') toggleFullscreen();
    });
  }

  function applyTransform() {
    if (!galleryImg) return;
    galleryImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    if (galleryCanvas) {
      if (currentZoom > 1.05) {
        galleryCanvas.classList.add('is-zoomed');
      } else {
        galleryCanvas.classList.remove('is-zoomed');
      }
    }
  }

  function setZoom(newZoom) {
    currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    if (currentZoom <= 1.05) {
      translateX = 0;
      translateY = 0;
    }
    applyTransform();
  }

  function adjustZoom(delta) {
    setZoom(currentZoom + delta);
  }

  function resetZoomTransform() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      galleryModal.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function updateGalleryView() {
    if (!currentGalleryImages.length) return;
    const item = currentGalleryImages[currentGalleryIndex];
    resetZoomTransform();

    galleryImg.src = item.src;
    galleryImg.alt = item.alt || '';
    if (galleryCounter) {
      galleryCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    }

    if (galleryThumbsContainer) {
      const thumbs = galleryThumbsContainer.querySelectorAll('.modern-gallery-thumb');
      thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('is-active', idx === currentGalleryIndex);
      });
    }

    if (onGalleryIndexChange) {
      onGalleryIndexChange(currentGalleryIndex);
    }
  }

  function nextGalleryImage() {
    if (!currentGalleryImages.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGalleryView();
  }

  function prevGalleryImage() {
    if (!currentGalleryImages.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGalleryView();
  }

  function closeGallery() {
    if (!galleryModal) return;
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
    resetZoomTransform();
  }

  function openModernGallery(items, index, syncCallback) {
    initModernGalleryModal();
    currentGalleryImages = items;
    currentGalleryIndex = (index + items.length) % items.length;
    onGalleryIndexChange = syncCallback;

    if (galleryThumbsContainer) {
      galleryThumbsContainer.innerHTML = '';
      items.forEach((item, idx) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'modern-gallery-thumb' + (idx === currentGalleryIndex ? ' is-active' : '');
        thumb.setAttribute('aria-label', `Thumbnail ${idx + 1}`);
        thumb.innerHTML = `<img src="${item.src}" alt="">`;
        thumb.addEventListener('click', (e) => {
          e.stopPropagation();
          currentGalleryIndex = idx;
          updateGalleryView();
        });
        galleryThumbsContainer.appendChild(thumb);
      });
    }

    updateGalleryView();
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
  }

  // Coverflow Slider Initializer
  document.querySelectorAll('.coverflow-slider-section').forEach((sliderSection) => {
    const stage = sliderSection.querySelector('.coverflow-stage');
    const slides = Array.from(sliderSection.querySelectorAll('.coverflow-slide'));
    const prevBtn = sliderSection.querySelector('.coverflow-prev');
    const nextBtn = sliderSection.querySelector('.coverflow-next');
    const paginationContainer = sliderSection.querySelector('.coverflow-pagination');

    if (!slides.length) return;

    let currentIndex = 0;
    const total = slides.length;
    let autoSlideTimer = null;
    const autoInterval = 3500;

    // Attach sleek zoom badge to each slide
    slides.forEach((slide) => {
      const card = slide.querySelector('.coverflow-card');
      if (card && !card.querySelector('.coverflow-zoom-badge')) {
        const badge = document.createElement('div');
        badge.className = 'coverflow-zoom-badge';
        badge.setAttribute('aria-hidden', 'true');
        badge.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        `;
        card.appendChild(badge);
      }
    });

    // Generate pagination dots
    if (paginationContainer) {
      paginationContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'coverflow-dot' + (i === 0 ? ' is-active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoSlide();
        });
        paginationContainer.appendChild(dot);
      });
    }

    function updateClasses() {
      slides.forEach((slide, i) => {
        slide.classList.remove('is-center', 'is-left-1', 'is-left-2', 'is-right-1', 'is-right-2', 'is-hidden');

        let diff = i - currentIndex;
        while (diff > total / 2) diff -= total;
        while (diff < -total / 2) diff += total;

        if (diff === 0) {
          slide.classList.add('is-center');
          slide.setAttribute('aria-hidden', 'false');
        } else if (diff === -1) {
          slide.classList.add('is-left-1');
          slide.setAttribute('aria-hidden', 'true');
        } else if (diff === -2) {
          slide.classList.add('is-left-2');
          slide.setAttribute('aria-hidden', 'true');
        } else if (diff === 1) {
          slide.classList.add('is-right-1');
          slide.setAttribute('aria-hidden', 'true');
        } else if (diff === 2) {
          slide.classList.add('is-right-2');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          slide.classList.add('is-hidden');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update active pagination dot
      if (paginationContainer) {
        const dots = paginationContainer.querySelectorAll('.coverflow-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('is-active', idx === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      currentIndex = (index + total) % total;
      updateClasses();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Clicking side slide focuses it; clicking center slide opens zoom gallery
    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (i !== currentIndex) {
          goToSlide(i);
          resetAutoSlide();
        } else {
          pauseAutoSlide();
          const items = slides.map(s => {
            const img = s.querySelector('.coverflow-img') || s.querySelector('img');
            return { src: img ? img.src : '', alt: img ? img.alt : '' };
          });
          openModernGallery(items, currentIndex, (newIdx) => {
            goToSlide(newIdx);
          });
        }
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    // Auto-Slider Timer
    function startAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => {
        nextSlide();
      }, autoInterval);
    }

    function pauseAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      pauseAutoSlide();
      startAutoSlide();
    }

    // Pause on mouse hover, resume on mouse leave
    sliderSection.addEventListener('mouseenter', pauseAutoSlide);
    sliderSection.addEventListener('mouseleave', startAutoSlide);

    // Touch swipe support for mobile/tablet
    let touchStartX = 0;
    let touchEndX = 0;

    sliderSection.addEventListener('touchstart', (e) => {
      pauseAutoSlide();
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoSlide();
    }, { passive: true });

    // Keyboard navigation
    sliderSection.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      }
    });

    // Initialize layout & start auto slider
    updateClasses();
    startAutoSlide();
  });

  // ------------------------------------------------------------------------
  // 16. Modern Single Image Auto Slider Banner (Pure Visuals, No Text/Tabs)
  // ------------------------------------------------------------------------
  document.querySelectorAll('.single-slider-banner-section').forEach((singleSlider) => {
    const wrapper = singleSlider.querySelector('.single-slider-wrapper');
    const track = singleSlider.querySelector('.single-slider-track');
    if (!wrapper || !track) return;

    const slides = Array.from(track.querySelectorAll('.single-slide'));
    const prevBtn = singleSlider.querySelector('.single-slider-prev');
    const nextBtn = singleSlider.querySelector('.single-slider-next');
    const dotsContainer = singleSlider.querySelector('.single-slider-dots');
    const progressBar = singleSlider.querySelector('.single-slider-progress-bar');

    // Lightbox Elements
    const lightbox = document.getElementById('singleGalleryLightbox') || singleSlider.querySelector('.single-gallery-lightbox');
    const lightboxImg = lightbox?.querySelector('#singleLightboxImg') || document.getElementById('singleLightboxImg');
    const lightboxClose = lightbox?.querySelector('#singleLightboxClose') || document.getElementById('singleLightboxClose');
    const lightboxPrev = lightbox?.querySelector('#singleLightboxPrev') || document.getElementById('singleLightboxPrev');
    const lightboxNext = lightbox?.querySelector('#singleLightboxNext') || document.getElementById('singleLightboxNext');
    const lightboxBackdrop = lightbox?.querySelector('#singleLightboxBackdrop') || document.getElementById('singleLightboxBackdrop');

    let currentSlide = 0;
    const slideDuration = 4000; // 4 seconds per image
    let isHovered = false;
    let animFrame = null;
    let startTime = 0;
    let elapsed = 0;
    let activeLightboxIndex = 0;

    // Render navigation dots
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `single-slider-dot ${idx === currentSlide ? 'active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlider(resetProgress = true) {
      if (slides.length === 0) return;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      if (currentSlide >= slides.length) currentSlide = 0;

      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.single-slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }

      if (resetProgress && !isHovered) {
        startProgress();
      }
    }

    function goToSlide(idx) {
      currentSlide = idx;
      updateSlider(true);
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider(true);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider(true);
    }

    // Auto-slide progress loop
    function startProgress() {
      stopProgress();
      startTime = performance.now() - elapsed;

      function step(now) {
        if (isHovered) return;
        elapsed = now - startTime;
        const progressPct = Math.min(100, (elapsed / slideDuration) * 100);

        if (progressBar) {
          progressBar.style.width = `${progressPct}%`;
        }

        if (elapsed >= slideDuration) {
          elapsed = 0;
          if (progressBar) progressBar.style.width = '0%';
          nextSlide();
        } else {
          animFrame = requestAnimationFrame(step);
        }
      }

      animFrame = requestAnimationFrame(step);
    }

    function stopProgress() {
      if (animFrame) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    }

    function pauseProgress() {
      stopProgress();
    }

    function resumeProgress() {
      if (!isHovered) {
        startProgress();
      }
    }

    // Pause on hover
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
        pauseProgress();
      });

      wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
        resumeProgress();
      });
    }

    // Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
      });
    }

    // Touch & Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isHovered = true;
      pauseProgress();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      isHovered = false;
      resumeProgress();
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // Mouse Drag Support
    let mouseStartX = 0;
    let isMouseDown = false;

    wrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diff = mouseStartX - e.clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    });

    // Lightbox Preview on Click
    function openLightbox(index) {
      if (!lightbox || slides.length === 0) return;
      activeLightboxIndex = (index + slides.length) % slides.length;
      const targetSlide = slides[activeLightboxIndex];
      const imgSrc = targetSlide.getAttribute('data-img') || targetSlide.querySelector('img')?.src;

      if (lightboxImg) {
        lightboxImg.src = imgSrc;
      }

      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      pauseProgress();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (!isHovered) {
        startProgress();
      }
    }

    function nextLightbox() {
      openLightbox(activeLightboxIndex + 1);
    }

    function prevLightbox() {
      openLightbox(activeLightboxIndex - 1);
    }

    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        openLightbox(idx);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);

    window.addEventListener('keydown', (e) => {
      if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    });

    // Initialize
    renderDots();
    updateSlider(true);
    startProgress();
  });

  // ------------------------------------------------------------------------
  // Our Work Page: Blueprint Selector and Case Modal
  // ------------------------------------------------------------------------

  // Interactive Growth Blueprint Selector
  const blueprintButtons = document.querySelectorAll('.blueprint-choice-btn');
  const blueprintTitle = document.getElementById('blueprintTitle');
  const blueprintDesc = document.getElementById('blueprintDesc');
  const blueprintWaBtn = document.getElementById('blueprintWaBtn');

  const blueprintData = {
    ecommerce: {
      title: "D2C Scaling & High-ROAS Media Machine",
      desc: "Comprehensive growth stack: Headless Shopify Plus UX re-engineering, high-velocity Meta & Google Ads creative testing, and automated Klaviyo retention flows designed to scale past ₹50L/month.",
      waText: "Hi Smart Digital Wings, I'm interested in the D2C Scaling & High-ROAS Media Machine package for my e-commerce brand."
    },
    web: {
      title: "Next.js Custom Web Engineering & CRO",
      desc: "Ultra-fast headless web architecture with 98+ Core Web Vitals, custom GSAP micro-animations, conversion-engineered user funnels, and enterprise CMS integration.",
      waText: "Hi Smart Digital Wings, I'm interested in Next.js Custom Web Engineering & CRO for my business."
    },
    seo: {
      title: "Programmatic Organic SEO Dominance Engine",
      desc: "Technical site architecture overhaul, high-intent transactional keyword clusters, authoritative digital PR backlinks, and E-E-A-T hub content driving steady organic pipelines.",
      waText: "Hi Smart Digital Wings, I'd like to consult on the Programmatic Organic SEO Dominance Engine."
    },
    ads: {
      title: "Omnichannel Paid Media & Lead Generation",
      desc: "Multi-touch Google PPC search funnels, Meta dynamic prospecting, retargeting funnels, and real-time ROAS dashboards minimizing acquisition cost while scaling volume.",
      waText: "Hi Smart Digital Wings, I need help scaling our omnichannel paid media with high ROAS."
    },
    video: {
      title: "Commercial 4K Filming & Viral Reel Studio",
      desc: "Full-scale on-location commercial filming, FPV drone cinematography, DaVinci Resolve color grading, and high-retention short-form video hooks designed for viral engagement.",
      waText: "Hi Smart Digital Wings, I'd like to book a Commercial 4K Filming & High-Retention Reel Production project."
    }
  };

  if (blueprintButtons.length > 0 && blueprintWaBtn) {
    blueprintButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        blueprintButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-blueprint');
        const data = blueprintData[key];
        if (data) {
          if (blueprintTitle) blueprintTitle.textContent = data.title;
          if (blueprintDesc) blueprintDesc.textContent = data.desc;
          blueprintWaBtn.href = `https://wa.me/917017281826?text=${encodeURIComponent(data.waText)}`;
        }
      });
    });
  }

  // Executive Case Study Modal Briefing System
  const workCaseModal = document.getElementById('workCaseModal');
  const closeCaseModalBtn = document.getElementById('closeCaseModalBtn');
  const caseTriggers = document.querySelectorAll('.open-case-modal-btn');

  const caseModalData = {
    aura: {
      brand: "Aura Luxury Apparel",
      media: "assets/portfolio-ecommerce.jpg",
      kpi1Num: "+340%",
      kpi1Lbl: "Revenue Growth",
      kpi2Num: "4.6x",
      kpi2Lbl: "Blended ROAS",
      kpi3Num: "68%",
      kpi3Lbl: "CAC Reduction",
      challenge: "Aura Luxury was struggling with high traffic acquisition costs and sub-1% mobile conversion rates on an unoptimized legacy store. Abandonment rates were exceeding 78% during checkout.",
      solution: "Smart Digital Wings engineered a headless Shopify Plus custom theme featuring 0.8s mobile load speeds, integrated 1-click UPI checkout, and launched high-conversion Meta dynamic catalog lookbooks paired with Google Smart Shopping retargeting.",
      result: "Within 9 months, monthly recurring revenue grew from ₹8.5L to over ₹38L, maintaining a 4.6x blended ROAS across all acquisition channels."
    },
    apex: {
      brand: "Apex Financial Partners",
      media: "assets/service-seo.jpg",
      kpi1Num: "#1 Rank",
      kpi1Lbl: "For 42 Keywords",
      kpi2Num: "+420%",
      kpi2Lbl: "Inbound Leads",
      kpi3Num: "₹12 Cr+",
      kpi3Lbl: "Asset Pipeline",
      challenge: "High competition from legacy banks made organic search visibility near impossible. Cost per click in Google Search Ads was exceeding ₹320 per lead.",
      solution: "Constructed an authoritative programmatic SEO architecture featuring interactive wealth calculators, semantic topical clusters, and verified digital PR backlinks.",
      result: "Apex surged to Page 1 for high-intent advisory searches, reducing paid ad dependency by 64% and originating ₹12 Cr in qualified wealth management inquiries."
    },
    verve: {
      brand: "Verve Health Clinics",
      media: "assets/service-web-design.jpg",
      kpi1Num: "1,850+",
      kpi1Lbl: "Bookings / Month",
      kpi2Num: "+185%",
      kpi2Lbl: "Conversion Rate",
      kpi3Num: "0.7s",
      kpi3Lbl: "Core Web Vitals",
      challenge: "A fragmented medical booking system caused high patient bounce rates and lost appointment opportunities.",
      solution: "Engineered a streamlined Next.js medical booking platform with direct doctor scheduling, localized Google Maps optimization, and automated WhatsApp appointment reminders.",
      result: "Patient appointments skyrocketed by 185% within 90 days, while patient acquisition cost dropped by 45% across all 3 regional branches."
    },
    solaria: {
      brand: "Solaria Clean Energy",
      media: "assets/service-ppc.jpg",
      kpi1Num: "₹28 Cr+",
      kpi1Lbl: "B2B Sales Pipeline",
      kpi2Num: "₹42",
      kpi2Lbl: "Cost Per Lead",
      kpi3Num: "5.2x",
      kpi3Lbl: "Total ROI",
      challenge: "Lengthy enterprise sales cycles and non-converting lead generation forms led to high customer acquisition friction.",
      solution: "Developed an interactive Commercial Solar Savings Estimator, deployed 4K commercial drone video creatives, and ran laser-targeted Google Search & LinkedIn ad sequences.",
      result: "Generated over 420 commercial rooftop solar evaluations, building a qualified ₹28 Cr pipeline at a remarkable ₹42 cost per lead."
    }
  };

  if (workCaseModal && caseTriggers.length > 0) {
    caseTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseKey = btn.getAttribute('data-case-key') || 'aura';
        const item = caseModalData[caseKey] || caseModalData.aura;

        const brandEl = document.getElementById('modalCaseBrand');
        const imgEl = document.getElementById('modalCaseImg');
        const kpi1N = document.getElementById('modalKpi1Num');
        const kpi1L = document.getElementById('modalKpi1Lbl');
        const kpi2N = document.getElementById('modalKpi2Num');
        const kpi2L = document.getElementById('modalKpi2Lbl');
        const kpi3N = document.getElementById('modalKpi3Num');
        const kpi3L = document.getElementById('modalKpi3Lbl');
        const chalEl = document.getElementById('modalCaseChallenge');
        const solEl = document.getElementById('modalCaseSolution');
        const resEl = document.getElementById('modalCaseResult');

        if (brandEl) brandEl.textContent = item.brand;
        if (imgEl) {
          imgEl.src = item.media;
          imgEl.alt = item.brand;
        }
        if (kpi1N) kpi1N.textContent = item.kpi1Num;
        if (kpi1L) kpi1L.textContent = item.kpi1Lbl;
        if (kpi2N) kpi2N.textContent = item.kpi2Num;
        if (kpi2L) kpi2L.textContent = item.kpi2Lbl;
        if (kpi3N) kpi3N.textContent = item.kpi3Num;
        if (kpi3L) kpi3L.textContent = item.kpi3Lbl;
        if (chalEl) chalEl.textContent = item.challenge;
        if (solEl) solEl.textContent = item.solution;
        if (resEl) resEl.textContent = item.result;

        workCaseModal.showModal();
      });
    });

    if (closeCaseModalBtn) {
      closeCaseModalBtn.addEventListener('click', () => workCaseModal.close());
    }

    workCaseModal.addEventListener('click', (e) => {
      const rect = workCaseModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        workCaseModal.close();
      }
    });
  }

  // ====================================================================
  // Modern Fullscreen Image Zoom Gallery Controller (Pure Image & Controls, Zero Text)
  // ====================================================================
  {
    const galleryLightbox = document.getElementById('workGalleryLightbox');
    const galleryImg = document.getElementById('workGalleryImg');
    const galleryCounter = document.getElementById('workGalleryCounter');
    const galleryCloseBtn = document.getElementById('workGalleryCloseBtn');
    const galleryBackdrop = document.getElementById('workGalleryBackdrop');
    const galleryPrevBtn = document.getElementById('workGalleryPrevBtn');
    const galleryNextBtn = document.getElementById('workGalleryNextBtn');
    const zoomInBtn = document.getElementById('galleryZoomInBtn');
    const zoomOutBtn = document.getElementById('galleryZoomOutBtn');
    const zoomResetBtn = document.getElementById('galleryZoomResetBtn');
    const fullscreenBtn = document.getElementById('galleryFullscreenBtn');
    const galleryStage = document.getElementById('workGalleryStage');

    const galleryItems = document.querySelectorAll('.bento-work-card.gallery-item');

    if (galleryLightbox && galleryImg && galleryItems.length > 0) {
      const imagesList = Array.from(galleryItems).map(card => {
        const img = card.querySelector('.bento-card-media img');
        return img ? img.src : '';
      });

      let activeGalleryIndex = 0;
      let zoomScale = 1;
      let panX = 0;
      let panY = 0;
      let isDragging = false;
      let startDragX = 0;
      let startDragY = 0;

      function applyZoomTransform(animate = true) {
        if (galleryImg) {
          galleryImg.style.transition = animate ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
          galleryImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
          if (zoomScale > 1) {
            galleryImg.classList.add('zoomed');
          } else {
            galleryImg.classList.remove('zoomed');
            panX = 0;
            panY = 0;
          }
        }
      }

      function resetZoom() {
        zoomScale = 1;
        panX = 0;
        panY = 0;
        applyZoomTransform(true);
      }

      function zoomIn() {
        zoomScale = Math.min(zoomScale + 0.5, 4);
        applyZoomTransform(true);
      }

      function zoomOut() {
        zoomScale = Math.max(zoomScale - 0.5, 1);
        if (zoomScale === 1) {
          panX = 0;
          panY = 0;
        }
        applyZoomTransform(true);
      }

      function setGalleryImage(index) {
        if (index < 0) index = imagesList.length - 1;
        if (index >= imagesList.length) index = 0;
        activeGalleryIndex = index;

        resetZoom();
        galleryImg.src = imagesList[activeGalleryIndex];
        if (galleryCounter) {
          galleryCounter.textContent = `${activeGalleryIndex + 1} / ${imagesList.length}`;
        }
      }

      function openGallery(index = 0) {
        setGalleryImage(index);
        galleryLightbox.classList.add('active');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeGallery() {
        galleryLightbox.classList.remove('active');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        resetZoom();
      }

      // Attach click triggers to all bento cards
      galleryItems.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          openGallery(idx);
        });
      });

      // Navigation & Toolbar Buttons
      if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGallery);
      if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGallery);
      if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', () => setGalleryImage(activeGalleryIndex - 1));
      if (galleryNextBtn) galleryNextBtn.addEventListener('click', () => setGalleryImage(activeGalleryIndex + 1));

      if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
      if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
      if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

      // Fullscreen Toggle
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            galleryLightbox.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        });
      }

      // Double Click to Toggle Zoom (1x <-> 2.2x)
      galleryImg.addEventListener('dblclick', (e) => {
        e.preventDefault();
        if (zoomScale > 1) {
          resetZoom();
        } else {
          zoomScale = 2.2;
          applyZoomTransform(true);
        }
      });

      // Mouse Wheel Zoom
      if (galleryStage) {
        galleryStage.addEventListener('wheel', (e) => {
          if (!galleryLightbox.classList.contains('active')) return;
          e.preventDefault();
          if (e.deltaY < 0) {
            zoomScale = Math.min(zoomScale + 0.25, 4);
          } else {
            zoomScale = Math.max(zoomScale - 0.25, 1);
            if (zoomScale === 1) {
              panX = 0;
              panY = 0;
            }
          }
          applyZoomTransform(true);
        }, { passive: false });
      }

      // Drag / Pan when Zoomed
      galleryImg.addEventListener('mousedown', (e) => {
        if (zoomScale <= 1) return;
        isDragging = true;
        startDragX = e.clientX - panX;
        startDragY = e.clientY - panY;
        e.preventDefault();
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging || zoomScale <= 1) return;
        panX = e.clientX - startDragX;
        panY = e.clientY - startDragY;
        applyZoomTransform(false);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Touch Support for Mobile (Swipe & Drag)
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      if (galleryStage) {
        galleryStage.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            if (zoomScale > 1) {
              isDragging = true;
              startDragX = e.touches[0].clientX - panX;
              startDragY = e.touches[0].clientY - panY;
            }
          }
        }, { passive: true });

        galleryStage.addEventListener('touchmove', (e) => {
          if (zoomScale > 1 && isDragging && e.touches.length === 1) {
            panX = e.touches[0].clientX - startDragX;
            panY = e.touches[0].clientY - startDragY;
            applyZoomTransform(false);
          }
        }, { passive: true });

        galleryStage.addEventListener('touchend', (e) => {
          isDragging = false;
          if (zoomScale === 1 && e.changedTouches.length === 1) {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;
            const timeDiff = Date.now() - touchStartTime;
            if (timeDiff < 400 && Math.abs(deltaX) > 45 && Math.abs(deltaY) < 60) {
              if (deltaX < 0) {
                setGalleryImage(activeGalleryIndex + 1);
              } else {
                setGalleryImage(activeGalleryIndex - 1);
              }
            }
          }
        });
      }

      // Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (!galleryLightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') setGalleryImage(activeGalleryIndex - 1);
        if (e.key === 'ArrowRight') setGalleryImage(activeGalleryIndex + 1);
        if (e.key === '+' || e.key === '=') zoomIn();
        if (e.key === '-' || e.key === '_') zoomOut();
        if (e.key === '0') resetZoom();
        if (e.key === 'f' || e.key === 'F') {
          if (!document.fullscreenElement) {
            galleryLightbox.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      });
    }
  }

  // ====================================================================
  // YouTube Shorts & Video Gallery Category Filter Controller
  // ====================================================================
  const videoFilterChips = document.querySelectorAll('#videoFilterRow .gallery-chip-btn');
  const ytShortCards = document.querySelectorAll('.yt-short-card');

  if (videoFilterChips.length > 0 && ytShortCards.length > 0) {
    videoFilterChips.forEach(chip => {
      chip.addEventListener('click', function () {
        videoFilterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');

        ytShortCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});



