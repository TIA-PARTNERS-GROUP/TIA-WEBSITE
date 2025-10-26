# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# TIA Partners Project
Make sure that you are in the `TIA-WEBSITE/Backend/` or `TIA-WEBSITE/Frontend/` directory before running these commands.

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

## Deployment
Deployment is handled using the `docker-compose.yml` file on AWS. To deploy, update the `docker-compose.yml` with appropriate cloud URLs (e.g., change the AWS URL to your specific EC2 instance or load balancer URL). Ensure environment variables are set correctly for production, such as database credentials and API endpoints.

## Services Connection
This project connects to the TIA-LLM service for AI-powered chat functionality and the GNN-Service for graph neural network operations. The backend communicates with these services via HTTP APIs, configured in the environment variables (e.g., `ADK_API_URL` for TIA-LLM and `GNN_API_URL` for GNN-Service).

## Database Setup
To set up the database, use the following commands based on your operating system:
- Linux: `npm run setup-db:linux`
- Windows: `npm run setup-db:win`

These commands create the database container and run migrations.

## Running in Development and Production
- **Development**: Run `npm run dev` to start the development server with hot reloading.
- **Production**: Use Docker Compose to build and run the services in production mode. Ensure environment variables are configured for production (e.g., `NODE_ENV=production`).

## Testing
Using the Jest testing framework
[jest](https://jestjs.io/)
### How to run tests
```console
npm run test
```
### How to run tests without middleware validation
```console
npm run test-no-validation
```
