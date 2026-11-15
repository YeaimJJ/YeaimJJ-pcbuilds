// JJSPCBuilds shared scripts for every page: build links, budget slider, forms, nav.

const params = new URLSearchParams(window.location.search);

// ---- Budget slider on the custom PC form (custom.html) ----
const budget = document.getElementById('budget');
const budgetValue = document.getElementById('budgetValue');
function showBudget() {
    if (!budget || !budgetValue) return;
    const value = Number(budget.value);
    const atMax = value >= Number(budget.max);
    budgetValue.textContent = '$' + value.toLocaleString('en-US') + (atMax ? '+' : '');
}
if (budget) budget.addEventListener('input', showBudget);

// ---- Shop buttons link to custom.html?build=KEY and fill in the form ----
// Keep these names and prices the same as the cards in shop.html.
const builds = {
    'starter': { name: 'Starter Build ($500 to $700)', budget: 600 },
    'sweet-spot': { name: 'Sweet Spot Build ($700 to $950)', budget: 850 },
    '1440p': { name: '1440p Build ($950 to $1,300)', budget: 1100 }
};
const picked = builds[params.get('build')];
if (picked && budget) {
    budget.value = picked.budget;
    const tierField = document.getElementById('tierField');
    if (tierField) tierField.value = picked.name;
    const pickedNote = document.getElementById('pickedBuild');
    if (pickedNote) {
        pickedNote.textContent = 'You picked the ' + picked.name + '. Add anything else you want and send it.';
        pickedNote.hidden = false;
    }
}
showBudget();

// ---- Contact page: contact.html?topic=repair picks the topic for you ----
const topic = document.getElementById('topic');
if (topic && params.get('topic') && [...topic.options].some(o => o.value === params.get('topic'))) {
    topic.value = params.get('topic');
}

// ---- Hide the cart button when nothing on the page can be added to a cart ----
if (!document.querySelector('.snipcart-add-item')) {
    document.querySelectorAll('.cart-item').forEach(item => { item.hidden = true; });
}

// ---- Formspree (@formspree/ajax loaded from CDN on each page) ----
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
['#customForm', '#tradeinForm', '#newsletterForm', '#contactForm'].forEach(selector => {
    if (document.querySelector(selector)) {
        formspree('initForm', { formElement: selector, formId: 'maqldgaw' });
    }
});

// ---- After a form is sent, bring the success message into view ----
document.querySelectorAll('[data-fs-success]').forEach(box => {
    new MutationObserver(() => {
        if (box.hasAttribute('data-fs-active')) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }).observe(box, { attributes: true, attributeFilter: ['data-fs-active'] });
});

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
