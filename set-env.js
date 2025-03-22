const fs = require('fs');
const dotenv = require('dotenv');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: ${process.env.APP_ENV === 'production'},
  apiUrl: '${process.env.API_URL}',
  googleMapsKey: '${process.env.GOOGLE_MAPS_KEY}'
};`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`Variables de entorno escritas en ${targetPath}`);
