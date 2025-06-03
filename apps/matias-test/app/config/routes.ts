// Route configuration for breadcrumb labels
export interface RouteConfig {
  path: string;
  label: string;
  parentPath?: string;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/about',
    label: 'About',
    parentPath: '/'
  },
  {
    path: '/users',
    label: 'Users',
    parentPath: '/'
  },
  {
    path: '/users-paginated',
    label: 'Users (Paginated)',
    parentPath: '/'
  },
  {
    path: '/users/:id',
    label: 'User Profile',
    parentPath: '/users'
  },
  {
    path: '/users/:id/edit',
    label: 'Edit User',
    parentPath: '/users/:id'
  }
];

// Helper function to get route config by exact path match
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return routeConfig.find(route => route.path === path);
};

// Helper function to get route config with dynamic path matching (supports :param syntax)
export const getRouteConfigByPattern = (currentPath: string): RouteConfig | undefined => {
  return routeConfig.find(route => {
    if (route.path === currentPath) return true;

    // Handle dynamic routes like /users/:id
    const routeParts = route.path.split('/');
    const pathParts = currentPath.split('/');

    if (routeParts.length !== pathParts.length) return false;

    return routeParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  });
};

// Helper function to resolve a path with parameters to an actual path
export const resolvePathWithParams = (routePath: string, currentPath: string): string => {
  const routeParts = routePath.split('/');
  const pathParts = currentPath.split('/');

  if (routeParts.length !== pathParts.length) return routePath;

  const resolvedParts = routeParts.map((part, index) => {
    console.log(`Resolving part: "${part}" with index: ${index} and pathPart: "${pathParts[index] ?? 'N/A'}"`, {routePath, currentPath});
    return part.startsWith(':') ? pathParts[index] : part;
  }).join('/');
  console.log(`Resolved path: "${resolvedParts}" from routePath: "${routePath}" and currentPath: "${currentPath}"`);
  return resolvedParts;
};

// Helper function to build breadcrumb trail from current path
export const buildBreadcrumbTrail = (currentPath: string): RouteConfig[] => {
  const trail: RouteConfig[] = [];
  const currentRoute = getRouteConfigByPattern(currentPath);

  if (!currentRoute) return trail;

  // Build trail by following parent paths recursively
  const buildTrailRecursive = (route: RouteConfig, path: string): void => {
    trail.unshift(route);

    if (route.parentPath) {
      // Resolve parent path if it contains parameters
      const resolvedParentPath = resolvePathWithParams(route.parentPath, path);
      const parentRoute = getRouteConfigByPattern(resolvedParentPath);

      if (parentRoute) {
        buildTrailRecursive(parentRoute, resolvedParentPath);
      }
    }
  };

  buildTrailRecursive(currentRoute, currentPath);
  return trail;
};
