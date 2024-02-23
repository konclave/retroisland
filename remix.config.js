import { createRoutesFromFolders } from '@remix-run/v1-route-convention';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['yet-another-react-lightbox'],
  future: {
    v2_routeConvention: true,
  },

  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes);
  },
};
