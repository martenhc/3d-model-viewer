# Routing

The routing is set up using [navigo](https://github.com/krasimir/navigo).

## Routes

Each route is defined in `./src/router/routes.ts`.

A route consists of the following:

- `name`: is used to navigate to a specific route within the application.
- `path`: speaks for itself.
- `tag`: is the name of page that should be rendered

For example:

```typescript
{
  name: RouteNames.HOME;
  path: '/';
  tag: literal`home-page`;
}
```

### Adding a route

First, add a new route name to the `RouteNames` enum in `./src/data/enum/route.ts` like so:

```typescript
export enum RouteNames {
  ...,
  NAME_OF_PAGE = 'name-of-page', // This is the new route
}
```

Then go to `./src/router/routes.ts` to make the route accessible to the router:

```typescript
...
import `../page/name-of-page`;

export const routes: ReadonlyArray<RouteType> = [
  ...,
  {
    name: RouteNames.NAME_OF_PAGE,
    path: '/path-to-name-of-page',
    tag: literal`name-of-page`,
  },
];
```

After that, the router will have access to the new route.

### Adding parameters to a route

Some routes will require a dynamic route based on, for example, an id or slug. This is possible by doing the following:

```typescript
path: `/path-to-name-of-page/:${RouteDataParam.ID || RouteDataParam.SLUG}`,
```

By default `ID` and `SLUG` are defined as valid parameters.

Other parameters can be added by editing `enum RouteDataParam`, in `./src/data/enum/route.ts`.

### Accessing parameters from a route

Make your page component extend from `PageElement`. This way, route data can be accessed as follows:

```typescript
this.routeData[RouteDataParam.ID];
```

## Localized routes

Set `VAR_IS_LOCALE_ENABLED` to `true` in the `.env` file to enable localized routes.

This will automatically prefix the route with the set default locale.

## Navigation

### External navigation

For external navigation, please use `<a href="">`.

### Internal navigation

The `<router-link>` element is preferred for internal navigation. It provides two different implementations:

- Use of destination route's path.

```typescript jsx
<router-link to="/path-to-name-of-page" title="Name of page">
  Go to name of page
</router-link>
```

- Use of destination route's assigned name.

```typescript jsx
<router-link
  to=${{ name: RouteNames.NAME_OF_PAGE }}
  title="Name of page"
>
  Go to name of page
</router-link>
```

### Internal navigation with parameters

Navigating with parameters can be done as follows:

```typescript jsx
<router-link to="/path-to-name-of-page/parameter" title="Name of page">
  Go to name of page
</router-link>
```

or

```typescript jsx
<router-link
  to=${{
    name: RouteNames.NAME_OF_PAGE,
    routeData: {
      [RouteDataParam.ID]: 'parameter',
    },
  }}
  title="Name of page"
>
  Go to name of page
</router-link>
```
