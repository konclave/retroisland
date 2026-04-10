import AliceCarouselCommonJs from 'react-alice-carousel';

const AliceCarousel = (AliceCarouselCommonJs as any).default ?? AliceCarouselCommonJs;

interface ImageAsset {
  url: string;
  title: string;
}

interface Props {
  images: ImageAsset[];
  title?: string;
}

function GalleryButton({ type, isDisabled }: { type: 'prev' | 'next'; isDisabled?: boolean }) {
  return (
    <button
      className={`catalogue-gallery__button${type === 'prev' ? ' catalogue-gallery__button_prev' : ' catalogue-gallery__button_next'}`}
      disabled={isDisabled}
      type="button"
      aria-label={type === 'prev' ? 'Предыдущий слайд' : 'Следующий слайд'}
    >
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none">
        <path
          fill="#626262"
          d="M7.707 1.707A1 1 0 0 0 6.293.293l-6 6a1 1 0 0 0-.03 1.383l5.5 6a1 1 0 0 0 1.474-1.352L2.384 7.03l5.323-5.323Z"
        />
      </svg>
    </button>
  );
}

export default function CatalogueGallery({ images, title }: Props) {
  if (!images?.length) return null;

  return (
    <article className="catalogue-gallery">
      <h2 className="section-title catalogue-gallery__title">Галерея исполнителя</h2>
      <AliceCarousel
        ssrSilentMode={true}
        autoWidth
        mouseTracking
        renderPrevButton={({ isDisabled }: { isDisabled?: boolean }) => (
          <GalleryButton type="prev" isDisabled={isDisabled} />
        )}
        renderNextButton={({ isDisabled }: { isDisabled?: boolean }) => (
          <GalleryButton type="next" isDisabled={isDisabled} />
        )}
        items={images.map((image) => (
          <span className="catalogue-gallery__item" key={image.url}>
            <img className="catalogue-gallery__image" src={image.url} alt={image.title || title} />
          </span>
        ))}
      />
    </article>
  );
}
