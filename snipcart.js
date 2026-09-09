/*
 * Snipcart storefront bootstrap.
 * Production public key is configured below from the Snipcart dashboard.
 * Never put a private/payment secret in this file.
 */
(function loadSnipcart() {
    const publicKey = "MjFiNjU1MmEtYjQzNC00NDJmLWJlYjgtNzJmYjIxZGIxMmVmNjM5MjQ0NDk5MzcyNTYxMTY1";
    const container = document.getElementById("snipcart");
    if (!container) return;

    container.dataset.apiKey = publicKey;
    container.dataset.configModalStyle = "side";

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css";
    document.head.appendChild(stylesheet);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js";
    document.head.appendChild(script);
})();
