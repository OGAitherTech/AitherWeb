# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v17.7

- Fixed the main search form so submitting a search cannot reload the page
- Fixed search submission on iPhone and desktop
- Added an inline search fallback so the Search button remains tied to Aither Web's search handler
- Added stronger event cancellation for dynamically created search forms
- Added unique IDs for rapid consecutive searches and website tabs
- Updated cache-busting version to v17.7
- Kept live-search fallbacks, bookmarks, history, downloads, themes, tabs, and Force Update

## v17.6

- Improved search form handling and Search Again behavior
- Kept New Tab, tab switching, closing, and address-bar search behavior

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `enhancements.css` — touch, accessibility, animation, and mobile polish
- `mobile-tabs.js` — mobile tab overview/switcher
- `app.js` — search, navigation, tabs, bookmarks, history, themes, and settings
- `api/search.js` — optional server-side Brave Search endpoint for deployments that provide `BRAVE_API_KEY`
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## Tabs

Aither Web has functional browser-style tabs. **+ New Tab** creates a separate blank tab, searches can open their own result tabs, website results open in separate website tabs, and each tab can be closed without destroying the other open tabs.

On a phone, use the overlapping-tab button in the browser toolbar to open the full-screen tab overview. Tap a tab card to switch, use **×** to close a tab, or choose **New Tab** to create another tab.

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
