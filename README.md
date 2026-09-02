# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v16

- Fixed Bookmarks and History tab navigation
- Improved mobile touch targets and tap feedback
- Added smoother result and interaction animations
- Added reduced-motion accessibility support
- Improved mobile safe-area handling for iPhone
- Added smoother scrolling and scrollbar polish
- Improved bookmark/history rows on small screens
- Added iPhone web-app metadata
- Kept live search connection guidance and Wi-Fi recommendation
- Browser-style tabs, navigation, bookmarks, and history
- Dark, light, and system themes
- Force Update with cache-busting
- LocalStorage persistence
- No search-engine API key required

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `enhancements.css` — v16 touch, accessibility, animation, and mobile polish
- `app.js` — search, navigation, bookmarks, history, themes, and settings
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## GitHub Pages

The project is a static website and can be published with GitHub Pages using the `main` branch and repository root (`/`).

## Search & connectivity

Aither Web retrieves live search results through public web-accessible connection fallbacks. Because GitHub Pages is static, the browser cannot directly host a private search backend. Aither Web therefore needs an internet connection for live search and generally works better on Wi-Fi, especially on mobile or weak cellular connections.

## Privacy

Bookmarks, settings, and history are stored locally in the browser's LocalStorage. Search queries are sent to the live search service when a search is performed.

## Desktop app

The optional Electron desktop app loads the published GitHub Pages version of Aither Web. This keeps the desktop app synchronized with the web version after the site is deployed. Windows builds can produce an installer and portable executable through the repository's GitHub Actions workflow.

## Roadmap

Future versions can add customizable quick links, import/export, stronger tab management, downloads, and additional Aither integrations.

## License

See the repository for licensing information.
