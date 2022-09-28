import { IconPlay, IconPause } from '~/ui/shared/icons';
import cx from 'classnames';
import styles from './button-play.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

interface ButtonPlayProps {
  children: React.ReactNode;
  isPlaying: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonPlay = ({
  children,
  onClick,
  isPlaying,
}: ButtonPlayProps) => {
  return (
    <button
      className={cx('button-play', { 'button-play_is-playing': isPlaying })}
      type="button"
      onClick={onClick}
    >
      <IconPlay className="button-play__icon-play" />
      <IconPause className="button-play__icon-pause" />
      {children}
    </button>
  );
};
