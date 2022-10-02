import type { ThrownResponse } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { getLinks } from '~/utils';
import { Header, links as headerLinks } from '~/ui/shared/header';
import styles from './error-page.css';

const localLinks = getLinks(styles);

export const links = () => [...localLinks(), ...headerLinks()];

interface ErrorPageProps {
  error: ThrownResponse;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <>
      <section className="error-page">
        <header className="padded-wrap">
          <Header title="" />
        </header>
        <div className="error-page-content">
          <div className="error-page-content__inner">
            <h1 className="error-page__title">
              Ошибка
              <strong>{error.status}</strong>
            </h1>
            {error.status === 404 && (
              <p className="error-page__text">Страница не найдена</p>
            )}
            <p className="error-page__text">
              Попробуйте вернуться на главную страницу сайта
            </p>
            <Link className="error-page__link" to="/">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
