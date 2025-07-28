# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# TIA Partners Project
Make sure that your in the tia_partners_frontend/ or tia_partners_backend/ dir before running these commands

## Package Manager
Using npm
[npm](https://docs.npmjs.com/)
### How to install packages
```console
npm install
```
### How to run 
```console
npm run dev
```

## Documentation
Using storybook
[storybook](https://storybook.js.org/docs)
### How to run
```console
npm run storybook
```

### ENV Setup
# TODO: REMOVE ENV CONFIGURATIONS FROM README
## Frontend
```
NODE_ENV=development
PORT=5000
FRONTEND_BASE_URL=http://localhost:3000
MIDDLEWARE=True
DB_HOST=localhost
DB_USER=testuser
DB_PASS=testpass
DB_PORT=5432
DB_NAME=testdb
```

## Backend
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Testing
Using the Jest testing framework
[jest](https://jestjs.io/)
### How to run test 
```console
npm test
```
