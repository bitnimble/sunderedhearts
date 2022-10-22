export const enum RoutePath {
  HOME = '',
  INFO = 'info',
  MENU = 'menu',
  STAFF = 'staff',
  PRICING = 'pricing',
  VENUE = 'venue',
  SCHEDULE = 'schedule',
  NOT_FOUND = '404',
  /** reserved path, for Prismic previewing */
  PREVIEW = 'preview'
};

export type RouteSegments =
  | [RoutePath.HOME]
  | [RoutePath.INFO]
  | [RoutePath.MENU]
  | [RoutePath.STAFF, string?]
  | [RoutePath.VENUE]
  | [RoutePath.SCHEDULE]
  | [RoutePath.NOT_FOUND]
  /** reserved path, for Prismic previewing */
  | [RoutePath.PREVIEW]
;

export const routeFor = (segments: RouteSegments) => {
  return '/' + segments.join('/');
};
