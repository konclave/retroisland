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
      <time>{item.date}</time>
      {item.text}
    </article>
  );
};
