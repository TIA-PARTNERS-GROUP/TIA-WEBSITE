# TIA Partners Website

A full-stack web application built with React (Frontend) and Node.js/Express (Backend) for TIA Partners, featuring AI-powered chat via TIA-LLM and graph neural network operations via GNN-Service.

## Prerequisites
- Node.js (v22 recommended)
- npm
- Docker (for database setup)
- AWS CLI (for deployment, see the TIA-DEPLOYMENT repo)

## Installation
Ensure you are in the `TIA-WEBSITE/Backend/` or `TIA-WEBSITE/Frontend/` directory.

### Install Dependencies
```bash
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
