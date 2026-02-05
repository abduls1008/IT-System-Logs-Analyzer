# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # IT System Log Analyzer

    A lightweight React + TypeScript app for viewing and filtering IT system logs. Built with Vite, Material UI and Tailwind-style utility classes.

    ## Features
    - Browse logs in a paginated table-like view (client-side).
    - Search across ID, source, message, host, IP, module, event code, type and other fields.
    - Quick filters for severity (`INFO`, `WARN`, `ERROR`) and resolved status (`UNRESOLVED`).
    - Date filter: pick a date using the date input to show logs for that specific day.
    - View details for a selected log entry.

    ## Tech Stack
    - React 18 + TypeScript
    - Vite (dev server + build)
    - Material UI components
    - Tailwind-style utility classes for layout

    ## Quick Start

    1. Install dependencies

    ```bash
    npm install
    ```

    2. Run the dev server

    ```bash
    npm run dev
    ```

    3. Build for production

    ```bash
    npm run build
    ```

    4. Preview production build

    ```bash
    npm run preview
    ```

    ## How to use the app
    - Use the search box at the top to filter logs by text (ID, source, message, etc.).
    - Click the `Info`, `Warning`, `Error` buttons to filter by severity.
    - Click `Unresolved` to filter by unresolved logs.
    - Use the date input (top-right of controls) to select a date — the table will show only logs whose timestamp falls on that date.
    - Click `View` on a row to open the log details view.

    ## Important Files
    - [client/src/components/LogTable.tsx](client/src/components/LogTable.tsx) — main table and filters.
    - [client/src/components/LogDetails.tsx](client/src/components/LogDetails.tsx) — detailed log view.
    - [client/src/Context.tsx](client/src/Context.tsx) — log context and selected log handling.
    - [client/src/Data/logs.json](client/src/Data/logs.json) — sample logs used by the app.

    ## Notes for Developers
    - Date filtering matches the `YYYY-MM-DD` value produced by the browser date input to the log timestamp converted to the same format.
    - Text and button filters are combined with the date filter (i.e., both apply together).

    ## Contributing
    Feel free to open issues or submit PRs. Keep changes focused and include tests where appropriate.

    ## License
    MIT
