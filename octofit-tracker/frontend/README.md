# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker, built with Vite, React Router, and Bootstrap.

## API configuration

When running in Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the value of the Codespace name. For example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests `https://<codespace-name>-8000.app.github.dev/api/`. If the variable is unset, API requests use `http://localhost:8000/api/` for local development. Restart the Vite server after changing environment values.

## Development

Run `npm run dev` from this directory, or use `npm run dev --prefix octofit-tracker/frontend` from the workspace root. The app is served on port `5173`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
