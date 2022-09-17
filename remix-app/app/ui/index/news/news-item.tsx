import { NewsDate } from './news-date';
interface NewsEntry {
  date: string;
  text: string;
}

interface NewsItemProps {
  item: NewsEntry;
}

export const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <article className="news-item">
      <time dateTime="item.date">
        <NewsDate date={item.date} />
      </time>
      {item.text}
    </article>
  );
};
