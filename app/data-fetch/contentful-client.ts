import * as contentful from 'contentful';
import * as dotenv from 'dotenv';

dotenv.config();

export const client = contentful.createClient({
  space: process.env['CONTENTFUL_SPACE_ID'] as string,
  accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'] as string,
  environment: process.env['CONTENTFUL_ENV'] || 'master',
});
