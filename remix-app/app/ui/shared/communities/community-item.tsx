import { Link } from '@remix-run/react';
import { IconNext } from '~/ui/shared/icons/icon-next';

interface CommunityItemProps {
  title: string;
  description?: string;
  link: string;
}

export const CommunityItem = ({
  title,
  description,
  link,
}: CommunityItemProps) => {
  return (
    <article className="community">
      <h3 className="community__title">{title}</h3>
      <p className="community__text">{description}</p>
      <Link
        className="community__link"
        target="_blank"
        rel="nofollow, noindex, noreferrer"
        to={link}
      >
        <IconNext />
      </Link>
    </article>
  );
};
