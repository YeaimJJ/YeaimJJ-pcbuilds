/*
 * Official Snipcart v3 settings bootstrap.
 * The public API key is safe client-side; never add a private/payment secret.
 */
(function loadSnipcart() {
    const publicApiKey = "MjFiNjU1MmEtYjQzNC00NDJmLWJlYjgtNzJmYjIxZGIxMmVmNjM5MjQ0NDk5MzcyNTYxMTY1";
    const container = document.getElementById("snipcart");
    if (!container) return;

    window.SnipcartSettings = {
        publicApiKey,
        version: "3.7.1",
        loadStrategy: "on-user-interaction",
        modalStyle: "side"
    };
    container.dataset.apiKey = publicApiKey;
    container.dataset.configModalStyle = "side";

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css";
    document.head.prepend(stylesheet);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js";
    script.addEventListener("error", () => {
        console.error("Snipcart failed to load. Check the dashboard domain and public API key.");
    });
    document.head.appendChild(script);
})();
