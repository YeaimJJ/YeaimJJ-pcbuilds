# JJSPCBuilds

Static storefront and service site for JJSPCBuilds. The site is deployable to any static host; there is no server-side application or secret required.

## Enable Snipcart checkout

1. Create a Snipcart account and add the production domain in the Snipcart dashboard.
2. Copy the **public API key** from the dashboard.
3. The production public API key is configured in `snipcart.js` and the page containers. It is intentionally client-side; never add a private key, webhook secret, or payment credential to this repository.
4. Deploy the site over HTTPS and open the storefront once so Snipcart can validate the domain.
5. In the Snipcart dashboard, configure payment providers, taxes, shipping/pickup rules, order emails, and inventory before accepting orders. Adding the loader and buttons alone does not enable checkout.
6. Add `jjspcbuilds.com` as the production domain in Snipcart's dashboard/domain settings before accepting live orders. The site uses the official Snipcart v3.7.1 settings bootstrap; if the cart remains on “Getting your cart ready,” verify that the dashboard key is the public key for this site and that the domain is enabled.

## Homepage layout

`index.html` is a product-first storefront. Styles are in `home.css` and scripts are in `site.js`. Gallery photos and the video are real files in `assets/gallery/`.

- `#in-stock`: hidden right now because nothing is in stock. See "Adding an in-stock PC" below.
- `#built-to-order`: the four fixed tiers. Their IDs (`entry-level-gaming`, `sweet-spot-gaming`, `premium-4k`, `creator-workstation`) are also used in `Builds.html`, so keep IDs and prices the same in both.
- Every `.snipcart-add-item` button needs `data-item-id`, `data-item-price`, `data-item-url`, `data-item-description`, `data-item-image`, and `data-item-name`.

## Adding an in-stock PC

When you have a PC ready to sell, paste this into `index.html` where the comment says "In-stock PCs" (right above the built-to-order section). Fill in the name, price, and specs. Give each PC its own `data-item-id`, and keep `data-item-price` the same as the price shown. Copy the `<article>` for each extra PC and delete it when it sells. `data-item-max-quantity="1"` stops two people from buying the same PC. You can also point the nav "Shop" link and the hero "Shop Builds" button at `#in-stock`.

```html
    <section class="section" id="in-stock">
        <div class="wrap">
            <div class="section-head">
                <div class="kicker">In stock</div>
                <h2>Ready-to-go PCs</h2>
                <p>Built, tested, and ready for pickup or shipping. When one sells, it's gone.</p>
            </div>
            <div class="product-grid">
                <article> to add another one.
                     Give each PC its own data-item-id. Keep data-item-price the same as the price shown. -->
                <article class="product" id="instock-CHANGE-ME">
                    <div class="product-art" aria-hidden="true">🖥️<span class="tag stock">In stock</span></div>
                    <div class="product-body">
                        <h3>CPU NAME + GPU NAME</h3>
                        <div class="price">$000</div>
                        <ul class="specs">
                            <li><span>CPU</span>...</li>
                            <li><span>GPU</span>...</li>
                            <li><span>RAM</span>...</li>
                            <li><span>Storage</span>...</li>
                            <li><span>PSU</span>...</li>
                            <li><span>Case</span>...</li>
                            <li><span>OS</span>...</li>
                        </ul>
                        <button class="btn btn-primary btn-block snipcart-add-item"
                            data-item-id="instock-CHANGE-ME"
                            data-item-price="000"
                            data-item-url="/"
                            data-item-description="In-stock gaming PC with ..."
                            data-item-image="assets/images/pc-build-placeholder.svg"
                            data-item-name="CPU NAME + GPU NAME"
                            data-item-max-quantity="1">Add to cart</button>
                    </div>
                </article>
            </div>
        </div>
    </section>
```

## Shipping

The site advertises two options: free local pickup in San Antonio and $99 flat insured shipping to the lower 48. These must also exist in the Snipcart dashboard under Store configurations → Shipping → Custom shipping methods, or checkout will not show them. If the price changes, update the announcement bar, the hero badge, and the `#shipping` section in `index.html`.

## Configurator

The homepage `#custom` configurator is quote-only. Each `<option>` has a `data-price` number that the total is calculated from, so when a price changes, update both the label text and `data-price`. GPU options and the 20% `configMarkup` live in `site.js`. The estimate is written into the quote form; it does not create a Snipcart item.

## Catalog pricing assumptions

The four customer-facing tier prices were rounded from a September 9, 2026 market snapshot using live Newegg search listings plus AMD/NVIDIA manufacturer references, then applying the requested 20% parts markup. The snapshot sources include [Ryzen 5 7600X](https://www.newegg.com/p/pl?d=Ryzen+5+7600X), [Radeon RX 7600](https://www.newegg.com/p/pl?d=Radeon+RX+7600+graphics+card), [Ryzen 7 9800X3D](https://www.newegg.com/p/pl?d=Ryzen+7+9800X3D), [Radeon RX 9070 XT](https://www.newegg.com/p/pl?d=Radeon+RX+9070+XT+graphics+card), [GeForce RTX 5090](https://www.newegg.com/p/pl?d=GeForce+RTX+5090+graphics+card), [Threadripper 7960X](https://www.newegg.com/p/pl?d=Threadripper+7960X), and supporting motherboard, memory, storage, cooling, PSU, and case searches. Prices are planning figures and exclude shipping, tax, payment fees, Windows, peripherals, and assembly add-ons; re-check availability before accepting an order.
