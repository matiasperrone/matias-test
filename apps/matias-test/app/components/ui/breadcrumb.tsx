import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { buildBreadcrumbTrail, resolvePathWithParams, RouteConfig } from '../../config/routes';
import { Button } from './button';
import { generateRandomPhrase } from '../../helpers/strings';

export interface BreadcrumbProps {
  className?: string;
}

export interface BreadcrumbLinkProps {
  href?: string | undefined;
  children: React.ReactNode;
  className?: string;
}

export interface BreadcrumbSeparatorProps {
  className?: string;
}

const BreadcrumbLink = React.forwardRef<
  HTMLLIElement,
  BreadcrumbLinkProps
>(({ href, children, className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn(
        'inline-flex items-center',
        className
      )}
      {...props}
    >
      {href ? (
        <Link
          to={href}
          className={cn(
            'inline-flex items-center text-sm font-medium transition-colors',
            'text-muted-foreground hover:text-foreground',
            'cursor-pointer'
          )}
        >
          {children}
        </Link>
      ) : (
        <span
          className={cn(
            'inline-flex items-center text-sm font-medium transition-colors',
            'text-foreground font-semibold',
            'select-none'
          )}
        >
          {children}
        </span>
      )}
    </li>
  );
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn('inline-flex items-center', className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </li>
));

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbItem = ({ randomize, isLast, item }: { randomize: boolean; isLast: boolean; item: RouteConfig }) => {
  const location = useLocation();
  const resolvedPath = resolvePathWithParams(item.path, location.pathname);
  const randomLabel = useMemo<string | null>(() => randomize  ? generateRandomPhrase() : null, [randomize]);

    return (
      <React.Fragment>
        <BreadcrumbLink href={isLast ? undefined : resolvedPath}>
          {randomize ? randomLabel : item.label}
        </BreadcrumbLink>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  };

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  BreadcrumbProps
>(({ className, ...props }, ref) => {
  const location = useLocation();
  const breadcrumbTrail = buildBreadcrumbTrail(location.pathname);
  const [randomize, setRandomize] = useState<boolean>(false);

  if (breadcrumbTrail.length === 0) {
    return null;
  }

  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn('flex', className)}
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbTrail.map((item, index) => (
          <BreadcrumbItem key={item.path} item={item} isLast={index === breadcrumbTrail.length - 1} randomize={randomize} />
        ))}
      </ol>
      <Button className="ml-20" variant="default" onClick={() => { setRandomize(randomize => !randomize); }}>{randomize ? 'Restore' : 'Randomize'}</Button>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

