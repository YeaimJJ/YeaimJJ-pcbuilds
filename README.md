# JJSPCBuilds

Static storefront and service site for JJSPCBuilds. The site is deployable to any static host; there is no server-side application or secret required.

## Enable Snipcart checkout

1. Create a Snipcart account and add the production domain in the Snipcart dashboard.
2. Copy the **public API key** from the dashboard.
3. The production public API key is configured in `snipcart.js` and the page containers. It is intentionally client-side; never add a private key, webhook secret, or payment credential to this repository.
4. Deploy the site over HTTPS and open the storefront once so Snipcart can validate the domain.
5. In the Snipcart dashboard, configure payment providers, taxes, shipping/pickup rules, order emails, and inventory before accepting orders. Adding the loader and buttons alone does not enable checkout.
6. Add `jjspcbuilds.com` as the production domain in Snipcart's dashboard/domain settings before accepting live orders. The site uses the official Snipcart v3.7.1 settings bootstrap; if the cart remains on “Getting your cart ready,” verify that the dashboard key is the public key for this site and that the domain is enabled.

Products live in the `#shop` and `#builds` sections of `index.html` and `Builds.html`. Keep the same stable IDs in both surfaces. Every sellable item must provide `data-item-price`, `data-item-url`, `data-item-description`, `data-item-image`, and `data-item-name` on its `.snipcart-add-item` button. Use `disabled` and an explicit sold-out label for unavailable inventory.

The homepage `#configurator` is intentionally quote-only. Its option prices and the `configMarkup` value live in the configurator script in `index.html`; update both the option label/price and the numeric value when market costs change. The configurator estimate applies the 20% markup and writes the selected parts into the quote form, but it does not create a Snipcart item. Keep stable Snipcart product metadata limited to the fixed catalog products.

## Catalog pricing assumptions

The four customer-facing tier prices were rounded from a September 9, 2026 market snapshot using live Newegg search listings plus AMD/NVIDIA manufacturer references, then applying the requested 20% parts markup. The snapshot sources include [Ryzen 5 7600X](https://www.newegg.com/p/pl?d=Ryzen+5+7600X), [Radeon RX 7600](https://www.newegg.com/p/pl?d=Radeon+RX+7600+graphics+card), [Ryzen 7 9800X3D](https://www.newegg.com/p/pl?d=Ryzen+7+9800X3D), [Radeon RX 9070 XT](https://www.newegg.com/p/pl?d=Radeon+RX+9070+XT+graphics+card), [GeForce RTX 5090](https://www.newegg.com/p/pl?d=GeForce+RTX+5090+graphics+card), [Threadripper 7960X](https://www.newegg.com/p/pl?d=Threadripper+7960X), and supporting motherboard, memory, storage, cooling, PSU, and case searches. Prices are planning figures and exclude shipping, tax, payment fees, Windows, peripherals, and assembly add-ons; re-check availability before accepting an order.
