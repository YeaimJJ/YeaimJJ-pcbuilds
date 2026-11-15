# JJSPCBuilds

Static site for JJSPCBuilds (jjspcbuilds.com). It works on any static host. There is no server and no secret keys.

## Homepage layout

`index.html` is the whole site. Styles are in `home.css` and scripts are in `site.js`. Gallery photos and the video are in `assets/gallery/`. The old pages (`Builds.html`, `Pricing.html`, `Services.html`, `Contact.html`) now just redirect to the homepage.

- `#buy`: three budget tiers. They are not cart items. "Request this build" fills in the custom PC form with that tier and budget. To change a price range, edit the text on the card plus the button's `data-tier` and `data-budget`.
- `#shipping`: pickup, shipping price, and warranty. If the shipping price or warranty changes, also update the announcement bar and the hero badges at the top of `index.html`.
- `#custom`: the custom PC request form. It goes to Formspree.
- `#sell`: the "sell me your PC or parts" form. It goes to Formspree.
- `#repairs`: the repair price list.

## Adding an in-stock PC

When you have a finished PC to sell, paste this into `index.html` inside the `#buy` section, where the comment says "In-stock PCs go here". Fill in the name, price, and specs. Give each PC its own `data-item-id`, and keep `data-item-price` the same as the price shown. Copy the `<article>` for each extra PC and delete it when it sells. `data-item-max-quantity="1"` stops two people from buying the same PC. The Cart button in the nav shows up by itself when the page has an "Add to cart" button.

```html
            <div class="section-head" id="in-stock">
                <div class="kicker">In stock</div>
                <h2>Ready-to-go PCs</h2>
                <p>Built, tested, and ready for pickup or shipping. When one sells, it's gone.</p>
            </div>
            <div class="product-grid">
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
```

## Enable Snipcart checkout

1. Create a Snipcart account and add the production domain in the Snipcart dashboard.
2. Copy the **public API key** from the dashboard.
3. The production public API key is configured in `snipcart.js` and the page containers. It is intentionally client-side; never add a private key, webhook secret, or payment credential to this repository.
4. Deploy the site over HTTPS and open the storefront once so Snipcart can validate the domain.
5. In the Snipcart dashboard, configure payment providers, taxes, shipping/pickup rules, order emails, and inventory before accepting orders. Adding the loader and buttons alone does not enable checkout.
6. Add `jjspcbuilds.com` as the production domain in Snipcart's dashboard/domain settings before accepting live orders. The site uses the official Snipcart v3.7.1 settings bootstrap; if the cart remains on “Getting your cart ready,” verify that the dashboard key is the public key for this site and that the domain is enabled.

## Shipping in Snipcart

The site advertises free local pickup in San Antonio and $99 flat insured shipping to the lower 48. For cart orders, both must also exist in the Snipcart dashboard under Store configurations → Shipping → Custom shipping methods, or checkout will not show them. Snipcart needs a business address saved before shipping can be turned on.
