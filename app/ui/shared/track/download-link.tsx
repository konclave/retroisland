interface Props {
  url?: string;
  title?: string;
}
export const DownloadLink = ({ url, title }: Props) => {
  if (!url) {
    return null;
  }
  return (
    <a href={url} download title={`Скачать «${title}»`} target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="-9 0 32 32"><path d="M13.48 17.6a.82.82 0 0 0-.84.84v3.92c0 .48-.36.84-.84.84H2.52a.82.82 0 0 1-.84-.84v-3.92c0-.44-.36-.84-.84-.84S0 18 0 18.44v3.92c0 1.4 1.12 2.52 2.52 2.52h9.28c1.4 0 2.52-1.12 2.52-2.52v-3.92c0-.44-.36-.84-.84-.84zm-6.92.88c.04.04.2.28.6.28s.56-.24.6-.28l3.52-3.52c.32-.32.32-.84 0-1.2-.32-.32-.84-.32-1.2 0L8 15.88V7.96c0-.48-.36-.84-.84-.84s-.84.36-.84.84v7.92L4.24 13.8c-.32-.32-.84-.32-1.2 0-.32.32-.32.84 0 1.2l3.52 3.48z"/></svg>
    </a>
  )
}
