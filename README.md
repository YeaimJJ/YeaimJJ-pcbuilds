# JJSPCBuilds

Static storefront and service site for JJSPCBuilds. The site is deployable to any static host; there is no server-side application or secret required.

## Enable Snipcart checkout

1. Create a Snipcart account and add the production domain in the Snipcart dashboard.
2. Copy the **public API key** from the dashboard.
3. In `snipcart.js`, replace `YOUR-SNIPCART-PUBLIC-KEY` with that public key. The key is intentionally client-side; never add a private key, webhook secret, or payment credential to this repository.
4. Deploy the site over HTTPS and open the storefront once so Snipcart can validate the domain.
5. In the Snipcart dashboard, configure payment providers, taxes, shipping/pickup rules, order emails, and inventory before accepting orders. Adding the loader and buttons alone does not enable checkout.

Products live in the `#builds` section of `index.html`. When adding a sellable PC, keep its `data-item-id` stable and provide `data-item-price`, `data-item-url`, `data-item-description`, `data-item-image`, and `data-item-name` on the `.snipcart-add-item` button. Use `disabled` and an explicit sold-out label for unavailable inventory.
