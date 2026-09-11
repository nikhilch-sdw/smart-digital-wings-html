/**
 * SMART DIGITAL WINGS - PACKAGE & CUSTOM RETAINER BUILDER
 * Manages tiered plans and dynamic modular retainer pricing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switcher (Tiered vs Custom)
  const tabTieredBtn = document.getElementById('tabTiered');
  const tabCustomBtn = document.getElementById('tabCustom');
  const viewTiered = document.getElementById('viewTieredPlans');
  const viewCustom = document.getElementById('viewCustomBuilder');

  if (tabTieredBtn && tabCustomBtn) {
    tabTieredBtn.addEventListener('click', () => {
      tabTieredBtn.classList.add('active');
      tabCustomBtn.classList.remove('active');
      if (viewTiered) viewTiered.style.display = 'grid';
      if (viewCustom) viewCustom.style.display = 'none';
    });

    tabCustomBtn.addEventListener('click', () => {
      tabCustomBtn.classList.add('active');
      tabTieredBtn.classList.remove('active');
      if (viewTiered) viewTiered.style.display = 'none';
      if (viewCustom) viewCustom.style.display = 'grid';
    });
  }

  // Custom Retainer Add-on Selection
  const addonCards = document.querySelectorAll('.addon-card');
  const customTotalEl = document.getElementById('customTotalDisplay');
  const customItemsCountEl = document.getElementById('customItemsCount');
  const customItemsListEl = document.getElementById('customItemsList');
  const bookCustomBtn = document.getElementById('bookCustomPackageBtn');

  const addonsData = {
    smm: { name: 'Social Media Management & Meta Ads', price: 14500 },
    seo: { name: 'Technical SEO & Keyword Ranking', price: 12500 },
    web: { name: 'Luxury Website Redesign & Maintenance', price: 11000 },
    ppc: { name: 'Google Search & Shopping PPC', price: 9500 },
    email: { name: 'Email & SMS Automation Funnels', price: 6500 },
    cro: { name: 'Conversion Rate Optimization (CRO)', price: 7500 }
  };

  let selectedAddons = ['smm', 'seo', 'web'];

  function updateCustomBuilder() {
    let total = 0;
    let selectedNames = [];

    selectedAddons.forEach(id => {
      const item = addonsData[id];
      if (item) {
        total += item.price;
        selectedNames.push(item.name);
      }
    });

    if (customTotalEl) customTotalEl.textContent = '₹' + total.toLocaleString('en-IN');
    if (customItemsCountEl) customItemsCountEl.textContent = `${selectedAddons.length} Modules Included`;

    if (customItemsListEl) {
      customItemsListEl.innerHTML = selectedNames.map(name => `
        <li style="display:flex;align-items:center;gap:8px;font-size:0.8125rem;color:var(--text-muted);margin-bottom:8px;">
          <span style="color:var(--gold-light);">✓</span> ${name}
        </li>
      `).join('');
    }
  }

  addonCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-addon');
      if (selectedAddons.includes(id)) {
        if (selectedAddons.length > 1) {
          selectedAddons = selectedAddons.filter(item => item !== id);
          card.classList.remove('selected');
        } else {
          showToast('Select at least one growth module', 'error');
        }
      } else {
        selectedAddons.push(id);
        card.classList.add('selected');
      }
      updateCustomBuilder();
    });
  });

  if (bookCustomBtn) {
    bookCustomBtn.addEventListener('click', () => {
      const modal = document.getElementById('consultationModal');
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
        showToast('Custom retainer loaded into strategy session booking!');
      }
    });
  }

  // Initial update
  updateCustomBuilder();
});
