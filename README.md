# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v17.4

- Updated all visible app/version labels from v17.3 to v17.4
- Added cache-busting to the main stylesheet, enhancement stylesheet, app script, and mobile tabs script
- Improved live-search connection fallbacks across multiple public search providers
- Supports HTML and Markdown-style results returned by connection fallbacks
- Added request timeouts so failed search routes do not hang indefinitely
- Filters search-engine redirect URLs before displaying results
- Keeps mobile tab overview, bookmarks, history, downloads, themes, and Force Update
- No search-engine API key is exposed in the browser

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `enhancements.css` — touch, accessibility, animation, and mobile polish
- `mobile-tabs.js` — mobile tab overview/switcher
- `app.js` — search, navigation, bookmarks, history, themes, and settings
- `api/search.js` — optional server-side Brave Search endpoint for deployments that provide `BRAVE_API_KEY`
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## Mobile tabs

On a phone, use the overlapping-tab button in the browser toolbar to open the tab overview. Open tabs appear as polished cards with a preview, title, site, and active indicator. Tap a card to switch instantly, use **×** to close a tab, or choose **New Tab** to return to the Aither Web home tab.

## GitHub Pages

The project is designed to run as a static website from the `main` branch and repository root (`/`). GitHub Pages does not execute server-side JavaScript, so the optional `api/search.js` endpoint requires a separate serverless deployment if you want to connect it to a private Brave Search API key.

## Search & connectivity

Aither Web attempts live search through multiple public web-accessible connection fallbacks. The browser version does not contain a private search API key. Live search requires an internet connection, and cellular networks or content blockers may prevent public proxy routes from responding.

For a more reliable production search backend, deploy `api/search.js` to a compatible serverless platform and configure `BRAVE_API_KEY` as a server-side environment variable. Never place that key in client-side JavaScript.

## Privacy

Bookmarks, settings, downloads, and history are stored locally in the browser's LocalStorage. Search queries are sent to the live search service when a search is performed.

## Desktop app

The optional Electron desktop app loads the published GitHub Pages version of Aither Web. This keeps the desktop app synchronized with the web version after the site is deployed. Windows builds can produce an installer and portable executable through the repository's GitHub Actions workflow.

## Roadmap

Future versions can add tab persistence after closing the app, pinned tabs, private tabs, bookmark folders, and a first-party search backend deployment.

## License

See the repository for licensing information.
