export const BREAKPOINT_DESKTOP = '800px';

const spaceId = typeof process !== 'undefined' ? process.env['CONTENTFUL_SPACE_ID'] : '';
const environment = typeof process !== 'undefined' ? process?.env['CONTENTFUL_ENVIRONMENT'] : '';
const accessToken = typeof process !== 'undefined' ? process?.env['CONTENTFUL_ACCESS_TOKEN'] : '';
export const CONTENTFUL_ENTRIES_URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}`;
