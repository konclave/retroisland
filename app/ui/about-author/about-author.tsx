import { useLoaderData } from '@remix-run/react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getLinks } from '~/utils';
import { Image, links as imageLinks } from '~/ui/shared/image';
import { Gallery, links as galleryLinks } from '~/ui/shared/gallery';

import styles from './about-author.css';
import desktopStyles from './about-author.d.css';
import type { aboutAuthorLoader } from '~/loaders';
import type { Asset } from 'contentful';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...imageLinks(),
  ...galleryLinks(),
  ...localLinks(),
];

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, file } = node.data.target.fields;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split('/')[0];
      switch (mimeGroup) {
        case 'image':
          return (
            <div className="about-author__image">
              <Image title={title} src={file.url} />
            </div>
          );
      }
    },
  },
};

export const AboutAuthor = () => {
  const data = useLoaderData<typeof aboutAuthorLoader>();
  const galleryImages = data.fields.gallery?.filter((image: Asset) =>
    Boolean(image.fields)
  );
  if (galleryImages?.length === 0) {
    return null;
  }
  return (
    <div className="padded-wrap about-author">
      {data.fields.text && documentToReactComponents(data.fields.text, options)}
      {data.fields.gallery && (
        <div className="about-author__gallery">
          <Gallery images={galleryImages} withCaption withNav />
        </div>
      )}
    </div>
  );
};
