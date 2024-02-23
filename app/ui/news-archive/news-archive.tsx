import { useState, useMemo } from 'react';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { getLinks } from '~/utils';
import { NewsList, links as newsListLinks } from '~/ui/shared/news-list';
import { Spinner, links as spinnerLinks } from '~/ui/shared/spinner';
import {
  ButtonLoadMore,
  links as buttonLinks,
} from '~/ui/shared/buttons/button-load-more';

import type { NewsResponseDto, NewsItemDto } from '~/data-fetch';

import styles from './news-archive.css';
import desktopStyles from './news-archive.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...newsListLinks(),
  ...buttonLinks(),
  ...spinnerLinks(),
  ...localLinks(),
];

export const NewsArchive = () => {
  const [page, setPage] = useState<number>(0);
  const initialNews = useLoaderData<NewsResponseDto>();
  const [news, setNews] = useState<NewsItemDto[]>(initialNews.items);
  const newsFetcher = useFetcher<NewsResponseDto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(
    initialNews.items.length === initialNews.total
  );

  useMemo(() => {
    if (
      newsFetcher.data &&
      newsFetcher.data.skip + newsFetcher.data.items.length ===
        newsFetcher.data.total
    ) {
      setIsLoaded(true);
      return;
    }

    if (newsFetcher.data && newsFetcher.data.items.length > 0) {
      setNews((prevNews: NewsItemDto[]) => [
        ...prevNews,
        ...(newsFetcher.data?.items ?? []),
      ]);
    }
  }, [newsFetcher.data]);

  useMemo(() => {
    setIsLoading(newsFetcher.state !== 'idle');
  }, [newsFetcher.state]);

  function handlePageLoad() {
    if (isLoaded) {
      return;
    }
    setIsLoading(true);
    setPage(page + 1);
    const params = new URLSearchParams({ page: String(page + 1) });
    newsFetcher.submit(params);
  }

  return (
    <div className="news-archive">
      <div className="news-archive__list">
        <NewsList news={news} layout="archive" />
        {isLoading && <Spinner />}
        {!isLoaded && !isLoading && (
          <ButtonLoadMore onClick={handlePageLoad}>Показать ещё</ButtonLoadMore>
        )}
      </div>
    </div>
  );
};
