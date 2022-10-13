import { useLoaderData } from '@remix-run/react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getLinks } from '~/utils';
import { Image, links as imageLinks } from '~/ui/shared/image';

import styles from './about-author.css';

const localLinks = getLinks(styles);

export const links = () => [...imageLinks(), ...localLinks()];

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split('/')[0];
      switch (mimeGroup) {
        case 'image':
          return <Image title={title} src={file.url} />;
      }
    },
  },
};

export const AboutAuthor = () => {
  const data = useLoaderData();
  return (
    <div className="padded-wrap about-author">
      {documentToReactComponents(data.fields.text, options)}
    </div>
  );
};
