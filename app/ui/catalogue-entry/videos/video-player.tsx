import styles from './video-player.css';
import {getLinks} from "~/utils";

const localLinks = getLinks(styles);
export const links = () => [...localLinks()];

interface Props {
  url: string;
}

function getEmbeddedPlayerSrc(url: string): string {
  if (url.startsWith('https://ok.ru')) {
    return `https://ok.ru/videoembed/${url.split('/').at(-1)}?autoplay=1`;
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
      className="video-player-container"
      src={src} 
      width="100%"
      height="auto"
      allow="autoplay; fullscreen; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  )
}
