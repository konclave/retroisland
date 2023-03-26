import { Fragment } from 'react';

interface ContentfulPictureConfigItem {
  media: string;
  width: number;
  height?: number;
  quality?: number;
}

interface ContentfulPictureProps {
  src: string;
  title: string;
  config: ContentfulPictureConfigItem[];
  className?: string;
}

function getSrc({
  src,
  format,
  width,
}: {
  src: string;
  format: string;
  width: number;
}): string {
  return `${src}?fm=${format}&q=85&w=${width}, ${src}?fm=${format}${
    format === 'jpg' ? '&fl=progressive' : ''
  }&q=75&w=${width * 2} 2x, ${src}?fm=${format}&q=65&w=${width * 3} 3x`;
}

export const ContentfulPicture = ({
  src,
  title,
  config,
  className,
}: ContentfulPictureProps) => {
  const defaultEntry = config.find((entry) => entry.media === 'default');
  if (!defaultEntry) {
    return null;
  }
  return (
    <picture>
      {config.map((entry) => {
        const { media, width } = entry;
        const mediaProps = {
          ...(media !== 'default' && { media }),
        };
        console.log(getSrc({ src, format: 'webp', width }));
        return (
          <Fragment key={media}>
            <source
              srcSet={getSrc({ src, format: 'avif', width })}
              type="image/avif"
              {...mediaProps}
            />
            <source
              srcSet={getSrc({ src, format: 'webp', width })}
              type="image/webp"
              {...mediaProps}
            />
            <source
              srcSet={getSrc({ src, format: 'jpg', width })}
              type="image/jpeg"
              {...mediaProps}
            />
          </Fragment>
        );
      })}
      <img
        src={`${src}?w=${defaultEntry.width}`}
        alt={title}
        className={className}
      />
    </picture>
  );
};
