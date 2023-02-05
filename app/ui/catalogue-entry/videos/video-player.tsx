import { useEffect } from 'react'; 

interface Props {
  url: string;
}

function getEmbeddedPlayerSrc(url: string): string {
  if (url.startsWith('https://ok.ru')) {
    return `https://ok.ru/videoembed/${url.split('/').at(-1)}`;
  }
  if (url.startsWith('https://youtube.com') || url.startsWith('https://www.youtube.com')) {
    const parsed = new URL(url);
    return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}?rel=0`;
  }
  if (url.startsWith('https://youtu.be')) {
    return `https://www.youtube.com/embed/${url.split('/').at(-1)}?rel=0`;
  }
  return '';
}

export const VideoPlayer = ({ url }: Props) => {
  const src = getEmbeddedPlayerSrc(url);
  return (
    <iframe 
      src={src} 
      width="1920px"
      height="1080px"
      frameBorder="0"
      allow="autoplay"
      allowFullScreen
    />
  )
}
