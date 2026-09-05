# Aither Web

Aither Web is a fast, clean, responsive browser-style web experience for the Aither project family. It works on iPhone, iPad, and desktop browsers and can be hosted directly with GitHub Pages.

## v17.8

- Added Aither Account creation and sign-in UI
- Connected account registration to AitherBackend `POST /api/auth/register`
- Connected sign-in to AitherBackend `POST /api/auth/login`
- Added session restoration with `GET /api/auth/session`
- Added logout with `POST /api/auth/logout`
- Uses credentialed requests so the backend HttpOnly session cookie can persist
- Added mobile-friendly account modal
- Added configurable backend URL for deployments
- Added cache-busting version v17.8

## AitherBackend accounts

Aither Web now uses the authentication foundation in the AitherBackend repository for account creation and sessions. The backend requires a name, email, and password of at least 8 characters. Passwords are processed server-side by AitherBackend; they are not stored by the Aither Web frontend.

The frontend defaults to the planned Render service URL `https://aither-backend.onrender.com`. If your actual deployment uses another HTTPS URL, open the Account panel and change **Backend connection**. A deployed backend must allow `https://ogaithertech.github.io` through CORS and have secure cross-site cookies enabled.

## v17.7

- Fixed the main search form so submitting a search cannot reload the page
- Fixed search submission on iPhone and desktop
- Added an inline search fallback so the Search button remains tied to Aither Web's search handler
- Added stronger event cancellation for dynamically created search forms
- Added unique IDs for rapid consecutive searches and website tabs
- Updated cache-busting version to v17.7

## Files

- `index.html` — application structure and browser-style UI
- `style.css` — responsive Aither Web interface
- `enhancements.css` — touch, accessibility, animation, and mobile polish
- `mobile-tabs.js` — mobile tab overview/switcher
- `app.js` — search, navigation, tabs, bookmarks, history, themes, and settings
- `account.js` — AitherBackend account registration, login, sessions, and logout
- `api/search.js` — optional server-side Brave Search endpoint for deployments that provide `BRAVE_API_KEY`
- `desktop/` — optional Electron desktop app that loads the GitHub Pages version

## GitHub Pages

The project is designed to run as a static website from the `main` branch and repository root (`/`). GitHub Pages does not execute server-side JavaScript. AitherBackend must therefore be deployed separately as a real HTTPS API for account creation and authentication to work from the public Pages site.

## Security

Aither Web does not receive or store the user's plaintext password after the registration/login request. Authentication is handled by AitherBackend using its server-side password hashing and HttpOnly session cookie system. Never put backend/provider secrets or private API keys into the GitHub Pages frontend.

## Tabs

Aither Web has functional browser-style tabs. **+ New Tab** creates a separate blank tab, searches can open their own result tabs, website results open in separate website tabs, and each tab can be closed without destroying the other open tabs.

## Search & connectivity

Aither Web attempts live search through multiple public web-accessible connection fallbacks. Live search requires an internet connection, and cellular networks or content blockers may prevent public proxy routes from responding.

## Desktop app

The optional Electron desktop app loads the published GitHub Pages version of Aither Web. This keeps the desktop app synchronized with the web version after the site is deployed.

## License

See the repository for licensing information.
