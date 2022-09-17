import type { IsoDate } from '~/loaders/news';

interface NewsDateProps {
  date: IsoDate;
}
export const NewsDate = ({ date }: NewsDateProps) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' } as const;
  return <>{Intl.DateTimeFormat('ru', options).format(new Date(date))}</>;
};
