/**
 * SMART DIGITAL WINGS - INTERACTIVE ROI & GROWTH CALCULATOR
 * Real-time marketing forecasting engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  const budgetSlider = document.getElementById('calcBudgetSlider');
  const budgetDisplay = document.getElementById('calcBudgetValue');
  const projectedRevenueEl = document.getElementById('calcProjectedRevenue');
  const roasMultiplierEl = document.getElementById('calcRoasMultiplier');
  const estimatedClicksEl = document.getElementById('calcClicks');
  const estimatedConversionsEl = document.getElementById('calcConversions');
  const avgDealValueEl = document.getElementById('calcAvgDeal');
  
  if (!budgetSlider) return;

  const goalsConfig = {
    b2b: { label: 'B2B Appointments & Retainers', avgDealValue: 45000, convRate: 2.5 },
    ecommerce: { label: 'E-Commerce Store Sales', avgDealValue: 2800, convRate: 3.4 },
    local: { label: 'Local High-Intent Leads', avgDealValue: 35000, convRate: 3.0 },
    enterprise: { label: 'Enterprise Retainers', avgDealValue: 160000, convRate: 1.8 }
  };

  const channelMultipliers = {
    smm: 1.25,
    seo: 1.45,
    web: 1.35,
    ppc: 1.20
  };

  let currentGoal = 'b2b';
  let selectedChannels = ['smm', 'seo', 'web'];

  function formatRupees(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
  }

  function recalculate() {
    const budget = Number(budgetSlider.value);
    budgetDisplay.textContent = formatRupees(budget);

    const goalData = goalsConfig[currentGoal];
    
    // Combined channel synergy multiplier
    let combinedMult = 1;
    selectedChannels.forEach(ch => {
      combinedMult *= (channelMultipliers[ch] || 1);
    });

    const estimatedClicks = Math.max(10, Math.round((budget / 18) * (combinedMult * 0.8)));
    const estimatedConversions = Math.max(1, Math.round(estimatedClicks * (goalData.convRate / 100)));
    const projectedRevenue = Math.round(estimatedConversions * goalData.avgDealValue);
    const roas = (projectedRevenue / budget).toFixed(1);

    // Update DOM
    if (projectedRevenueEl) projectedRevenueEl.textContent = formatRupees(projectedRevenue);
    if (roasMultiplierEl) roasMultiplierEl.textContent = `${roas}x Projected ROAS`;
    if (estimatedClicksEl) estimatedClicksEl.textContent = estimatedClicks.toLocaleString('en-IN') + ' Visitors';
    if (estimatedConversionsEl) estimatedConversionsEl.textContent = estimatedConversions.toLocaleString('en-IN') + ' Leads/Sales';
    if (avgDealValueEl) avgDealValueEl.textContent = formatRupees(goalData.avgDealValue);
  }

  // Event: Budget Slider
  budgetSlider.addEventListener('input', recalculate);

  // Event: Goal Selection Buttons
  const goalButtons = document.querySelectorAll('.goal-btn');
  goalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      goalButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGoal = btn.getAttribute('data-goal');
      recalculate();
    });
  });

  // Event: Channel Checkboxes
  const channelLabels = document.querySelectorAll('.channel-checkbox-label');
  channelLabels.forEach(lbl => {
    lbl.addEventListener('click', (e) => {
      e.preventDefault();
      const channelId = lbl.getAttribute('data-channel');
      if (selectedChannels.includes(channelId)) {
        if (selectedChannels.length > 1) {
          selectedChannels = selectedChannels.filter(c => c !== channelId);
          lbl.classList.remove('checked');
        } else {
          showToast('At least one channel must remain active', 'error');
        }
      } else {
        selectedChannels.push(channelId);
        lbl.classList.add('checked');
      }
      recalculate();
    });
  });

  // Initial calculation
  recalculate();
});
