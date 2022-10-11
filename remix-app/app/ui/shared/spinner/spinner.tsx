import { getLinks } from '~/utils';
import styles from './spinner.css';

export const links = getLinks(styles);

export const Spinner = () => {
  return (
    <div className="spinner-box">
      <div className="spinner"></div>
    </div>
  );
};
