# Quiet Zone

A QR code generator that runs entirely in the browser. Paste a link and get a QR code you can download as PNG or SVG. No server or database is involved, and nothing you type is uploaded.

## What it makes

- **Link**: any website, menu, form, video or map pin
- **Instagram**: type a username, get a code that opens the profile
- **WhatsApp**: a phone number plus an optional first message (`wa.me` link)
- **Wi‑Fi**: guests scan to join without typing the password
- **Contact**: scanning opens "Add contact" with name, phone, email, company and website filled in (a static vCard, so no server is needed)

You can pick the dot shape (square, soft, dots), the colors and the damage tolerance. The page warns you when the colors will be hard to scan, and shows the smallest size that still prints safely.

## Contact page (`card/`)

`card/index.html` is a digital business card: a mobile page with a photo or initials, a **Save contact** button (downloads a `.vcf` file), and buttons for call, WhatsApp, email, website, Instagram, TikTok, LinkedIn, Facebook and a map. It also shows a QR code of itself so someone can scan it from your screen.

**To make your own:** edit the `CARD` block near the bottom of `card/index.html`. Empty fields are hidden. For a photo, put e.g. `photo.jpg` in the `card/` folder and set `photo: "photo.jpg"`. Also update the `<title>` and `og:` lines at the top, which control what shows when the link is shared.

**Then make its QR code:** once the site is online, open Quiet Zone, choose **Link**, and paste the card's address (e.g. `https://<your-username>.github.io/<repo-name>/card/`). You can edit the card later and the printed QR keeps working, because the address inside it doesn't change.

**For several people:** copy the folder (`card/` → `sara/`, `omar/` …) and edit each copy. Each card gets its own address. If you copy it one level deeper, fix the `../qrcode.js` and `../vcard.js` paths.

## Run it

Open `index.html` in a browser. That's it.

## Put it online for free (GitHub Pages)

1. On GitHub, open this repository → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick your branch and the `/ (root)` folder, then **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Good to know

These are **static** QR codes: the link is stored inside the image itself. They never expire and need no server, but you can't change the destination after printing. If you need that, you need a "dynamic" QR (a short link on your own server that redirects).

The QR encoding uses [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT), bundled as `qrcode.js`, so the page works offline. Keep `qrcode.js` next to `index.html`.
