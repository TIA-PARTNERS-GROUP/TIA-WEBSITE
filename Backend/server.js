import 'dotenv/config';
import app from './app.js';
import config from './config/index.js';

const ENV = config.env
const PORT = config.PORT;

// ENTRY POINT
app.listen(PORT, () => {
  console.log(`Running in ${ENV}`);
  console.log(`Server running on http://localhost:${PORT}`);
});