# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v15

- More reliable live web searching with multiple no-key connection fallbacks
- Improved result parsing for different response formats
- Automatic retry option when a search connection fails
- One-click fallback to open the live search directly
- Clear connection guidance for mobile users
- Wi-Fi recommendation for the best search experience
- Browser-style tabs, navigation, bookmarks, and history
- Website addresses open directly inside Aither Web when embedding is allowed
- Dark, light, and system themes
- Force Update with cache-busting
- Responsive iPhone, iPad, and desktop layout
- LocalStorage persistence
- No search-engine API key required

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `app.js` — search, navigation, bookmarks, history, themes, and settings
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## GitHub Pages

The project is a static website and can be published with GitHub Pages using the `main` branch and repository root (`/`).

## Search & connectivity

Aither Web retrieves live search results through public web-accessible connection fallbacks. Because GitHub Pages is static, the browser cannot directly host a private search backend. Aither Web therefore needs an internet connection for live search and generally works better on Wi-Fi, especially on mobile or weak cellular connections.

## Privacy

Bookmarks, settings, and history are stored locally in the browser's LocalStorage. Search queries are sent to the live search service when a search is performed.

## Roadmap

Future versions can add more search sources, customizable quick links, import/export, keyboard shortcuts, downloads, and additional Aither integrations.

## License

See the repository for licensing information.
