import 'dotenv/config';
import app from './app.js';
import config from './config/index.js';

const PORT = config.port;

// ENTRY POINT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});