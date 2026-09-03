# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v17.1

- Reworked the mobile tab overview for a cleaner iPhone-style experience
- Added a polished full-screen tab overview with backdrop and safe-area support
- Added clear **Tabs** header with live tab count
- Added an improved layered tab icon and live tab counter in the mobile toolbar
- Added active-tab badges and site initials for easier tab recognition
- Improved tab cards with better spacing, depth, previews, and touch feedback
- Added accessible keyboard activation for tab cards
- Improved close-tab controls and prevented the Home tab from showing a useless close button
- Added a larger, easier-to-use **New Tab** button
- Added reduced-motion support
- Added light-theme support for the new mobile tab overview
- Fixed the tab overview hidden state so it cannot cover the browser when closed
- Preserved iPhone safe-area handling and mobile scrolling
- Dark, light, and system themes
- Force Update with cache-busting
- LocalStorage persistence
- No search-engine API key required

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `enhancements.css` — touch, accessibility, animation, and mobile polish
- `mobile-tabs.js` — mobile tab overview/switcher
- `app.js` — search, navigation, bookmarks, history, themes, and settings
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## Mobile tabs

On a phone, use the overlapping-tab button in the browser toolbar to open the tab overview. Open tabs appear as polished cards with a preview, title, site, and active indicator. Tap a card to switch instantly, use **×** to close a tab, or choose **New Tab** to return to the Aither Web home tab.

## GitHub Pages

The project is a static website and can be published with GitHub Pages using the `main` branch and repository root (`/`).

## Search & connectivity

Aither Web retrieves live search results through public web-accessible connection fallbacks. Because GitHub Pages is static, the browser cannot directly host a private search backend. Aither Web therefore needs an internet connection for live search and generally works better on Wi-Fi, especially on mobile or weak cellular connections.

## Privacy

Bookmarks, settings, and history are stored locally in the browser's LocalStorage. Search queries are sent to the live search service when a search is performed.

## Desktop app

The optional Electron desktop app loads the published GitHub Pages version of Aither Web. This keeps the desktop app synchronized with the web version after the site is deployed. Windows builds can produce an installer and portable executable through the repository's GitHub Actions workflow.

## Roadmap

Future versions can add tab persistence after closing the app, pinned tabs, private tabs, bookmark folders, downloads UI, and additional Aither integrations.

## License

See the repository for licensing information.
