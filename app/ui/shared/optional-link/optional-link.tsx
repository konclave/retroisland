import type { ReactNode } from 'react';
import { Link } from '@remix-run/react';

interface OptionalLinkProps {
  link: string;
  children: ReactNode;
}

export const OptionalLink = ({ link, children }: OptionalLinkProps) => {
  if (link) {
    return <Link to={link}>{children}</Link>;
  }
  return <>{children}</>;
};
