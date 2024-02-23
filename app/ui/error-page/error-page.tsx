import type { useRouteError } from '@remix-run/react';
import { isRouteErrorResponse, Link } from '@remix-run/react';
import { getLinks } from '~/utils';
import { Header, links as headerLinks } from '~/ui/shared/header';
import styles from './error-page.css';
import desktopStyles from './error-page.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...headerLinks()];

interface ErrorPageProps {
  error: ReturnType<typeof useRouteError>;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
  const status = isRouteErrorResponse(error) ? error.status : 500;

  return (
    <section className="error-page padded-wrap">
      <header>
        <Header force={true} />
      </header>
      <div className="error-page-content">
        <div className="error-page-content__inner">
          <h1 className="error-page__title">
            Ошибка <strong>{status}</strong>
          </h1>
          {status === 404 && (
            <p className="error-page__text">Страница не найдена.</p>
          )}
          <p className="error-page__text">
            Попробуйте вернуться на главную страницу сайта.
          </p>
          <Link className="error-page__link" to="/">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
};
