// JJSPCBuilds homepage scripts: budget slider, build request buttons, forms, nav.

// ---- Budget slider on the custom PC form ----
const budget = document.getElementById('budget');
const budgetValue = document.getElementById('budgetValue');
function showBudget() {
    if (!budget || !budgetValue) return;
    const value = Number(budget.value);
    const atMax = value >= Number(budget.max);
    budgetValue.textContent = '$' + value.toLocaleString('en-US') + (atMax ? '+' : '');
}
if (budget) budget.addEventListener('input', showBudget);
showBudget();

// ---- "Request this build" buttons fill in the form ----
document.querySelectorAll('.tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tierField = document.getElementById('tierField');
        if (tierField) tierField.value = btn.dataset.tier || '';
        if (budget && btn.dataset.budget) {
            budget.value = btn.dataset.budget;
            showBudget();
        }
    });
});

// ---- Hide the cart button when nothing on the page can be added to a cart ----
if (!document.querySelector('.snipcart-add-item')) {
    document.querySelectorAll('.cart-item').forEach(item => { item.hidden = true; });
}

// ---- Formspree (@formspree/ajax loaded from CDN in index.html) ----
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
formspree('initForm', { formElement: '#customForm', formId: 'maqldgaw' });
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
