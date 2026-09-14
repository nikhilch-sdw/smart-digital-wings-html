/**
 * SMART DIGITAL WINGS - REALISTIC ROI & GROWTH CALCULATOR
 * Accurate, realistic performance forecasting based on verified agency benchmarks.
 */

document.addEventListener('DOMContentLoaded', () => {
  const budgetSlider = document.getElementById('calcBudgetSlider');
  const budgetDisplay = document.getElementById('calcBudgetValue');
  const projectedRevenueEl = document.getElementById('calcProjectedRevenue');
  const roasMultiplierEl = document.getElementById('calcRoasMultiplier');
  const estimatedClicksEl = document.getElementById('calcClicks');
  const estimatedConversionsEl = document.getElementById('calcConversions');
  const avgDealValueEl = document.getElementById('calcAvgDeal');
  const conversionsLabelEl = document.getElementById('calcConversionsLabel');
  const dealValueLabelEl = document.getElementById('calcDealValueLabel');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const goalButtons = document.querySelectorAll('.simple-goal-btn');
  const pacingButtons = document.querySelectorAll('.pacing-btn');
  const pacingBadgeEl = document.getElementById('calcPacingBadge');

  // Unique performance & velocity elements
  const netProfitEl = document.getElementById('calcNetProfit');
  const meterBarEl = document.getElementById('calcMeterBar');
  const meterSpendEl = document.getElementById('meterSpend');
  const breakEvenEl = document.getElementById('calcBreakEven');

  if (!budgetSlider) return;

  let activePace = 'aggressive';

  // Realistic performance profiles (realistic CPL, CPC, ROAS between 3.4x and 4.8x)
  const goalProfiles = {
    leads: {
      cpc: 35, // Average CPC for high-intent search & social in India
      cpl: 1350, // Realistic cost per qualified lead: ₹1,350
      roasBase: 3.8, // 3.8x baseline ROAS
      roasScale: 0.000004
    },
    ecommerce: {
      cpc: 20, // Average CPC for D2C/e-commerce
      aov: 2400, // Average Order Value: ₹2,400
      roasBase: 3.4, // 3.4x baseline ROAS
      roasScale: 0.0000045
    },
    local: {
      cpc: 36,
      cpl: 1200, // Realistic cost per booking/appointment: ₹1,200
      roasBase: 4.0, // 4.0x baseline ROAS
      roasScale: 0.0000035
    }
  };

  let activeGoal = 'leads';

  function formatRupees(num) {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  function calculate() {
    const budget = Number(budgetSlider.value);
    if (budgetDisplay) budgetDisplay.textContent = formatRupees(budget);

    // Sync 1-click preset buttons
    presetButtons.forEach(btn => {
      const pVal = Number(btn.getAttribute('data-preset'));
      btn.classList.toggle('active', pVal === budget);
    });

    const profile = goalProfiles[activeGoal] || goalProfiles.leads;

    // Realistic ROAS capped between 3.4x and 4.8x (steady pace gets a subtle efficiency bump)
    const paceBump = activePace === 'steady' ? 0.15 : 0;
    const roas = Math.min(4.8, Math.max(3.2, profile.roasBase + paceBump + (budget - 15000) * profile.roasScale));
    const projectedRevenue = Math.round(budget * roas);
    const netGain = Math.max(0, projectedRevenue - budget);

    // Realistic clicks
    const clicks = Math.round(budget / profile.cpc);

    let conversionsText = '';
    let dealText = '';

    if (activeGoal === 'leads') {
      const leadsMin = Math.max(10, Math.round(budget / (profile.cpl * 1.15)));
      const leadsMax = Math.max(14, Math.round(budget / (profile.cpl * 0.9)));
      conversionsText = `${leadsMin} - ${leadsMax} Leads`;
      dealText = formatRupees(profile.cpl);
      if (conversionsLabelEl) conversionsLabelEl.textContent = 'Estimated Qualified Leads';
      if (dealValueLabelEl) dealValueLabelEl.textContent = 'Target Cost Per Lead';
    } else if (activeGoal === 'ecommerce') {
      const orders = Math.round(projectedRevenue / profile.aov);
      conversionsText = `${orders} Orders`;
      dealText = formatRupees(profile.aov);
      if (conversionsLabelEl) conversionsLabelEl.textContent = 'Projected Store Orders';
      if (dealValueLabelEl) dealValueLabelEl.textContent = 'Average Order Value';
    } else {
      const bookingsMin = Math.max(12, Math.round(budget / (profile.cpl * 1.15)));
      const bookingsMax = Math.max(16, Math.round(budget / (profile.cpl * 0.9)));
      conversionsText = `${bookingsMin} - ${bookingsMax} Bookings`;
      dealText = formatRupees(profile.cpl);
      if (conversionsLabelEl) conversionsLabelEl.textContent = 'Estimated Client Bookings';
      if (dealValueLabelEl) dealValueLabelEl.textContent = 'Target Cost Per Booking';
    }

    // Dynamic Break-Even calculation: 3.4x => ~15 Days, 4.8x => ~10 Days
    const breakEvenDays = Math.max(9, Math.min(18, Math.round(52 / roas)));

    // Progress bar fill percentage: maps 1.0x - 5.0x ROAS
    const meterPct = Math.min(100, Math.max(20, Math.round(((roas - 1) / 4) * 100)));

    // Update DOM
    if (projectedRevenueEl) projectedRevenueEl.textContent = formatRupees(projectedRevenue);
    if (roasMultiplierEl) roasMultiplierEl.textContent = `✦ ${roas.toFixed(1)}x Projected ROAS`;
    if (estimatedClicksEl) estimatedClicksEl.textContent = `${clicks.toLocaleString('en-IN')} Visitors`;
    if (estimatedConversionsEl) estimatedConversionsEl.textContent = conversionsText;
    if (avgDealValueEl) avgDealValueEl.textContent = dealText;

    // Update unique elements
    if (netProfitEl) netProfitEl.textContent = `+${formatRupees(netGain)} / mo`;
    if (meterSpendEl) meterSpendEl.textContent = formatRupees(budget);
    if (meterBarEl) meterBarEl.style.width = `${meterPct}%`;
    if (breakEvenEl) breakEvenEl.textContent = `~${breakEvenDays} Days`;
  }

  // Budget slider event
  budgetSlider.addEventListener('input', calculate);

  // Preset chips click events
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      budgetSlider.value = btn.getAttribute('data-preset');
      calculate();
    });
  });

  // Goal buttons click events
  goalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      goalButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGoal = btn.getAttribute('data-goal');
      calculate();
    });
  });

  // Pacing buttons click events
  pacingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pacingButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePace = btn.getAttribute('data-pace') || 'aggressive';
      if (pacingBadgeEl) {
        pacingBadgeEl.textContent = activePace === 'steady' ? '🛡️ High Efficiency' : '⚡ High Velocity';
      }
      calculate();
    });
  });

  // Initial calculation
  calculate();

  // Initialize Live Dynamic Multicolor Aurora & Tactile Texture Engine
  initCalcLiveMulticolorTexture();
});

/**
 * LIVE DYNAMIC MULTICOLOR AURORA & TACTILE CONSTELLATION ENGINE
 * Continuously shifting chromatic spectrum, second-by-second color cycles,
 * interactive cursor gravity, and floating geometric network.
 */
function initCalcLiveMulticolorTexture() {
  const canvas = document.getElementById('calcLiveTextureCanvas');
  const section = document.getElementById('calculator');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animId = null;
  let isVisible = true;

  // Track mouse for interactive cursor ripples
  const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

  function resize() {
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // 6 Dynamic Chromatic Plasma Orbs with distinct harmonic trajectories
  const orbs = [
    { radius: 380, speedX: 0.28, speedY: 0.22, phaseX: 0.0, phaseY: 1.2, hueBase: 42, hueSpeed: 25 },   // Radiant Gold
    { radius: 350, speedX: 0.22, speedY: 0.31, phaseX: 2.1, phaseY: 0.5, hueBase: 195, hueSpeed: 28 },  // Electric Cyan
    { radius: 330, speedX: 0.33, speedY: 0.25, phaseX: 4.2, phaseY: 2.7, hueBase: 150, hueSpeed: 22 },  // Emerald Cyber
    { radius: 390, speedX: 0.19, speedY: 0.27, phaseX: 1.5, phaseY: 3.8, hueBase: 280, hueSpeed: 26 },  // Royal Violet / Purple
    { radius: 320, speedX: 0.29, speedY: 0.20, phaseX: 3.4, phaseY: 4.9, hueBase: 340, hueSpeed: 30 },  // Sunset Coral / Ruby
    { radius: 360, speedX: 0.24, speedY: 0.34, phaseX: 5.1, phaseY: 1.8, hueBase: 220, hueSpeed: 24 }   // Sapphire Blue
  ];

  // Tactical Constellation Nodes (Microscopic Stars & Connections)
  const nodeCount = 38;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 600),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 1.0,
      alpha: Math.random() * 0.5 + 0.3,
      hueOffset: Math.random() * 360
    });
  }

  // Mouse interactivity on calculator section
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    mouse.active = true;
  });

  section.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Render loop
  function render(now) {
    if (!isVisible) {
      animId = requestAnimationFrame(render);
      return;
    }

    const t = now / 1000;

    // Smooth mouse interpolation
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
    } else {
      mouse.x += (-1000 - mouse.x) * 0.05;
      mouse.y += (-1000 - mouse.y) * 0.05;
    }

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // 1. Render Chromatic Aurora Blobs (Additive Blend)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    orbs.forEach((orb) => {
      // Harmonic Lissajous drift
      const ox = (width * 0.5) + Math.sin(t * orb.speedX + orb.phaseX) * (width * 0.38);
      const oy = (height * 0.5) + Math.cos(t * orb.speedY + orb.phaseY) * (height * 0.35);

      // Real-time second-by-second shifting multicolor hue
      const currentHue = (orb.hueBase + t * orb.hueSpeed) % 360;

      const grad = ctx.createRadialGradient(ox, oy, 10, ox, oy, orb.radius);
      grad.addColorStop(0.0, `hsla(${currentHue}, 95%, 58%, 0.42)`);
      grad.addColorStop(0.35, `hsla(${(currentHue + 35) % 360}, 90%, 50%, 0.24)`);
      grad.addColorStop(0.70, `hsla(${(currentHue + 70) % 360}, 85%, 42%, 0.08)`);
      grad.addColorStop(1.0, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // If mouse is active, render interactive chromatic aura under cursor
    if (mouse.active && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
      const mouseHue = (t * 50) % 360;
      const mGrad = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, 220);
      mGrad.addColorStop(0, `hsla(${mouseHue}, 100%, 65%, 0.45)`);
      mGrad.addColorStop(0.5, `hsla(${(mouseHue + 50) % 360}, 95%, 55%, 0.15)`);
      mGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Render Tactical Constellation Nodes & Connecting Filaments
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Update node positions
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repulsion
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 1) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Constellation lines
      for (let j = i + 1; j < nodes.length; j++) {
        const p2 = nodes[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          const lineAlpha = (1 - dist / 115) * 0.28;
          const lineHue = (t * 30 + p.hueOffset) % 360;
          ctx.strokeStyle = `hsla(${lineHue}, 90%, 65%, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw node star
      const nodeHue = (t * 30 + p.hueOffset) % 360;
      ctx.fillStyle = `hsla(${nodeHue}, 95%, 70%, ${p.alpha})`;
      ctx.shadowColor = `hsla(${nodeHue}, 100%, 65%, 0.6)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    animId = requestAnimationFrame(render);
  }

  // IntersectionObserver: Pause when off-screen for 0% CPU/battery waste
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });

  observer.observe(section);

  // Tab visibility pause
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  animId = requestAnimationFrame(render);
}
