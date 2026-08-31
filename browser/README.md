# Aither Browser

Aither Browser is the standalone desktop browser version of the Aither Web project.

## Current features

- Electron desktop app
- Chromium-powered web rendering through Electron WebView
- Google search from the address bar
- Direct website navigation
- Tabs and new-tab button
- Back, forward, reload, and home controls
- Aither Web as the built-in homepage
- Basic bookmark/star action
- Windows installer configuration through electron-builder

## Run

Install Node.js, open this `browser` directory, then run:

```bash
npm install
npm start
```

## Build for Windows

```bash
npm run build
```

The first release targets Windows with an NSIS installer. macOS and Linux targets can be added later.

## Important

Aither Browser uses Electron's Chromium engine. It is an Aither browser application, but it does not implement a browser rendering engine from scratch.
