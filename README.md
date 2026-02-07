# Miralia – Static Shop (First Version)

This is a **first version** of a jewellery shopping website: a single-page experience with a curated product grid, filters, and a simple cart stored in your browser.

## Features

- **Jewellery-focused layout**: hero, collections, bestsellers, about, care & sizing.
- **Static product catalogue**: products are defined in `app.js` with price, metal, stone, and collection.
- **Basic filters**: filter by collection, metal, and max price.
- **Client-side cart**:
  - Add/remove items, change quantities.
  - Cart drawer with subtotal and item count.
  - Cart persists in `localStorage` under the key `miralia-jewellery-cart`.
- **Demo checkout**: a placeholder alert explaining what a real checkout flow would do (payments, orders, emails).

## Project structure

- `index.html` – main page and layout.
- `styles.css` – styling and responsive layout.
- `app.js` – product data, filters, and cart logic.
- `package.json` – optional helper to run a local static server.

## Running the site locally

### Option 1 – Open directly in your browser

1. Open the `jewellery-shop` folder.
2. Double-click `index.html` (or open it in your browser).

> Note: some browsers restrict `localStorage` or some features when opened as a `file://` URL. If anything behaves oddly, use Option 2.

### Option 2 – Run a simple static server (recommended)

You will need **Node.js** and **npm** installed.

```bash
cd jewellery-shop
npm install serve --save-dev
npm run start
```

Then open the URL printed in the terminal (usually `http://localhost:3000` or similar).

## Next steps / how to extend this

- **Real product data**: move the product list into a JSON file or API.
- **Real checkout**: integrate Stripe, PayPal, or a local gateway and create an orders backend.
- **Product detail pages**: turn each product into its own page with more photography and certificates.
- **CMS integration**: plug into a headless CMS (Sanity, Contentful, Strapi, etc.) to manage content without editing code.

