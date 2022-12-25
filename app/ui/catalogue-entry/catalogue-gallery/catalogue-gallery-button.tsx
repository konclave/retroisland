import cx from 'classnames';

export type GalleryButtonType = 'prev' | 'next';

export const renderCatalogueGalleryButton =
  ({ type }: { type: GalleryButtonType }) =>
  ({ isDisabled }: { isDisabled?: boolean }): React.ReactNode => {
    return (
      <button
        className={cx('catalogue-gallery__button', {
          'catalogue-gallery__button_prev': type === 'prev',
          'catalogue-gallery__button_next': type === 'next',
        })}
        disabled={isDisabled}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          fill="none"
        >
          <path
            fill="#626262"
            d="M7.707 1.707A1 1 0 0 0 6.293.293l-6 6a1 1 0 0 0-.03 1.383l5.5 6a1 1 0 0 0 1.474-1.352L2.384 7.03l5.323-5.323Z"
          />
        </svg>
      </button>
    );
  };
