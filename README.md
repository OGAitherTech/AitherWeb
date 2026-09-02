# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v16.2

- Added a real mobile tab switcher for phones
- Mobile tab overview shows every open tab in a 2-column card layout
- Shows the active tab clearly
- Tap a tab card to switch instantly
- Close individual tabs directly from the mobile overview
- New Tab button is available inside the mobile tab overview
- Tab count updates automatically as tabs are opened and closed
- Mobile tab switcher respects iPhone safe-area insets
- Improved mobile touch targets and tap feedback
- Added smoother result and interaction animations
- Added reduced-motion accessibility support
- Improved mobile scrolling and browser controls
- Fixed Bookmarks and History tab navigation
- Live search keeps its Wi-Fi recommendation
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

On a phone, use the tab button in the browser toolbar to open the tab overview. Each open tab appears as a card. Tap a card to switch to it, use its close button to remove it, or choose **+ New tab** to open the Aither Web home tab.

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
