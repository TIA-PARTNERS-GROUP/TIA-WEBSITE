import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import config from './config/index.js';
import routes from './routes/index.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
import { generalAPILimiter } from './middleware/rateLimiter.js';

// App setup
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL,
  credentials: true,
}))

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TIA API',
      version: '1.0.0',
      description: 'API documentation for endpoints',
    },
    servers: [
      { url: `http://localhost:${config.PORT}/api` },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);


// Middleware
if (config.MIDDLEWARE) {
  app.use(logger);
  app.use(errorHandler);
  app.use(generalAPILimiter);
  app.use(express.json());
  app.use(cookieParser())
}

// Routes
//app.use('/');
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// ENV mode error handling for redirecting. Better error handling formatting
if (config.env === 'production') {
  const redirectUrl = `${config.env.frontendBaseUrl}/dashboard`;
  app.use((req, res, next) => {
    res.status(404).render('redirect', {
      success: false,
      message: 'API route not found.',
      redirectUrl: redirectUrl,
      timeout: 2
    });
  });
} else if (config.env === 'development') {
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: 'API route not found.',
    });
  });
}

export default app;