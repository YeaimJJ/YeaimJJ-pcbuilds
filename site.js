// JJSPCBuilds homepage scripts: configurator, quiz, forms, nav.

// ---- Build configurator (quote tool only, not a cart product) ----
// To change a price, edit the number here AND the matching label text.
const configuratorOptions = {
    nvidia: [
        { value: 'rtx5060', label: 'GeForce RTX 5060 — $400', price: 400 },
        { value: 'rtx5070', label: 'GeForce RTX 5070 — $650', price: 650 },
        { value: 'rtx5090', label: 'GeForce RTX 5090 — $5,500', price: 5500 }
    ],
    radeon: [
        { value: 'rx7600', label: 'Radeon RX 7600 — $340', price: 340 },
        { value: 'rx9070xt', label: 'Radeon RX 9070 XT — $730', price: 730 },
        { value: 'rx7900xtx', label: 'Radeon RX 7900 XTX — $900', price: 900 }
    ]
};
const configMarkup = 1.2;
const configLabels = {
    cpuTier: 'CPU', ramTier: 'Memory', storageTier: 'Storage',
    coolingTier: 'Cooling', caseTier: 'Case & power', setupTier: 'OS & setup'
};
const configMoney = value => '$' + Math.round(value).toLocaleString('en-US');

// Reads the price from data-price. Every option must have one.
function optionPrice(option) {
    const price = Number(option.dataset.price);
    return Number.isFinite(price) ? price : 0;
}

function updateConfigurator() {
    const form = document.getElementById('buildConfigurator');
    if (!form) return;
    const brand = form.querySelector('input[name="gpuBrand"]:checked').value;
    const gpu = document.getElementById('gpuTier');
    const currentGpu = gpu.value;
    gpu.innerHTML = configuratorOptions[brand].map(option =>
        `<option value="${option.value}" data-price="${option.price}">${option.label}</option>`
    ).join('');
    if ([...gpu.options].some(option => option.value === currentGpu)) gpu.value = currentGpu;

    const selected = [gpu, ...Object.keys(configLabels).map(id => document.getElementById(id))];
    const parts = selected.map(select => {
        const option = select.options[select.selectedIndex];
        return {
            label: select === gpu ? 'GPU' : configLabels[select.id],
            name: option.textContent.split(' — ')[0],
            price: optionPrice(option)
        };
    });
    const total = parts.reduce((sum, part) => sum + part.price, 0) * configMarkup;

    document.getElementById('configTotal').textContent = configMoney(total);
    document.getElementById('configBreakdown').innerHTML = parts.map(part =>
        `<li><span>${part.label}</span><strong>${part.name}</strong></li>`
    ).join('');

    const summary = `Configured ${brand === 'nvidia' ? 'NVIDIA' : 'Radeon'} build: ${parts.map(part => part.name).join(', ')}. Estimated total: ${configMoney(total)} before shipping and tax.`;
    const hidden = document.getElementById('configSummary');
    if (hidden) hidden.value = summary;
}
document.querySelectorAll('#buildConfigurator input, #buildConfigurator select')
    .forEach(control => control.addEventListener('change', updateConfigurator));
updateConfigurator();

// ---- Find My PC quiz ----
const quizAnswers = {};
function quizAnswer(step, val, el) {
    quizAnswers[step] = val;
    document.querySelectorAll('#step' + step + ' .quiz-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    setTimeout(() => {
        document.getElementById('step' + step).classList.remove('active');
        if (step < 3) {
            document.getElementById('step' + (step + 1)).classList.add('active');
            document.getElementById('dot' + (step + 1)).classList.add('done');
        } else {
            showQuizResult();
        }
    }, 250);
}

function showQuizResult() {
    const use = quizAnswers[1], budget = quizAnswers[2], res = quizAnswers[3];
    let build, price, specs, link = '#quote', linkText = 'Get a quote for this build';

    if (budget === 'low') {
        build = 'Custom budget build';
        price = 'Custom quote';
        specs = "Under $800 works best with smart used parts. Tell me your budget and I'll find the best parts for it.";
    } else if (budget === 'mid') {
        build = 'In-stock builds';
        price = 'See what\'s ready now';
        specs = 'My in-stock PCs are built for this budget. Check what\'s available, or ask for a custom quote.';
        link = '#in-stock'; linkText = 'See in-stock PCs';
    } else if (budget === 'high' && res === '1080') {
        build = 'RX 7600 Budget 1080p';
        price = '$1,560';
        specs = 'Ryzen 5 7600X + Radeon RX 7600. A strong 1080p build on a current platform.';
        link = '#built-to-order'; linkText = 'See this build';
    } else if (budget === 'high') {
        build = 'Custom 1440p build';
        price = 'Custom quote';
        specs = "For $1,500 to $2,500 I'll put together a parts list aimed at your resolution and games.";
    } else if (use === 'creative') {
        build = 'RTX 5090 Creator Tower';
        price = '$14,520';
        specs = 'Threadripper 7960X + RTX 5090. Built for video editing and 3D rendering.';
        link = '#built-to-order'; linkText = 'See this build';
    } else if (res === '4k') {
        build = 'RTX 5090 Premium 4K';
        price = '$9,420';
        specs = 'Ryzen 7 9800X3D + RTX 5090. Premium 4K performance.';
        link = '#built-to-order'; linkText = 'See this build';
    } else {
        build = 'RX 9070 XT Balanced 1440p';
        price = '$2,880';
        specs = 'Ryzen 7 9800X3D + Radeon RX 9070 XT. Balanced high-refresh 1440p gaming.';
        link = '#built-to-order'; linkText = 'See this build';
    }

    document.getElementById('quizResult').innerHTML =
        `<div class="kicker">My pick for you</div><h3>${build}</h3><div class="price">${price}</div><p class="muted small">${specs}</p>`;
    const cta = document.getElementById('quizCta');
    cta.href = link;
    cta.textContent = linkText;
    document.getElementById('step3').classList.remove('active');
    document.getElementById('stepResult').classList.add('active');
}

function resetQuiz() {
    Object.keys(quizAnswers).forEach(k => delete quizAnswers[k]);
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.quiz-dot').forEach(d => d.classList.remove('done'));
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    document.getElementById('step1').classList.add('active');
    document.getElementById('dot1').classList.add('done');
}

// ---- Quote form budget buttons ----
const budgetOptions = document.querySelector('.budget-options');
if (budgetOptions) {
    budgetOptions.addEventListener('click', function (e) {
        const btn = e.target.closest('.budget-btn');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.budget-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('budget').value = btn.dataset.value;
    });
}

// ---- Formspree (@formspree/ajax loaded from CDN in index.html) ----
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
formspree('initForm', { formElement: '#quoteForm', formId: 'maqldgaw' });
formspree('initForm', { formElement: '#tradeinForm', formId: 'maqldgaw' });
formspree('initForm', { formElement: '#newsletterForm', formId: 'maqldgaw' });

// ---- Mobile menu ----
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        const open = navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', e => {
        if (e.target.closest('a')) {
            navLinks.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}
