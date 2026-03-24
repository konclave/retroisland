interface Props {
  url: string;
}

function getEmbedUrl(url: string): string {
  if (/youtu\.be/.test(url)) {
    const id = url.split('/').at(-1);
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (/youtube\.com/.test(url)) {
    const id = url.split('/').at(-1);
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (/ok\.ru/.test(url)) {
    const id = url.split('/').at(-1);
    return `https://ok.ru/videoembed/${id}?autoplay=1`;
  }
  return url;
}

export default function VideoPlayer({ url }: Props) {
  return (
    <div className="video-player">
      <iframe
        src={getEmbedUrl(url)}
        className="video-player__iframe"
        allowFullScreen
        allow="autoplay; encrypted-media"
        frameBorder="0"
      />
    </div>
  );
}
