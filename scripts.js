document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("[data-mobile-menu]");
    const nav = document.querySelector(".site-nav");
    if (menu && nav) {
        menu.addEventListener("click", () => {
            const expanded = menu.getAttribute("aria-expanded") === "true";
            menu.setAttribute("aria-expanded", String(!expanded));
            nav.classList.toggle("is-open", !expanded);
        });
    }
});
