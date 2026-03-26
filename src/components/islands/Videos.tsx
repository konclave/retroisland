import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import VideoPlayer from './VideoPlayer';

interface VideoItem {
  url: string;
  thumbUrl: string;
  localThumbUrl?: string;
  title?: string;
}

interface Props {
  entries: VideoItem[];
}

export default function Videos({ entries }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!entries?.length) return null;

  return (
    <article className="catalogue-item-videos">
      <h2 className="catalogue-item-videos__title section-title">Видео</h2>
      <ul className="videos-list">
        {entries.map((video, idx) => (
          <li className="videos-list__item" key={video.url}>
            <div className="video-item">
              <a
                className="video-item__link"
                href={video.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={(e) => { e.preventDefault(); setOpenIndex(idx); }}
              >
                <img className="video-item__thumbnail" src={video.localThumbUrl ?? video.thumbUrl} alt={video.title || ''} />
                <span className="video-item__overlay" />
              </a>
              {video.title && <h4 className="video-item__title">{video.title}</h4>}
            </div>
          </li>
        ))}
      </ul>

      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        index={openIndex ?? 0}
        carousel={{ finite: true }}
        slides={entries.map((v) => ({ type: 'custom-slide' as const, ...v }))}
        render={{
          slide: ({ slide }) =>
            (slide as any).type === 'custom-slide'
              ? <VideoPlayer url={(slide as any).url} />
              : undefined,
        }}
      />
    </article>
  );
}
