import { useState, useEffect } from 'react';
import { getLinks } from '~/utils';
import { IconEnvelope } from '../icons/icon-envelope';
import { IconFb } from '../icons/icon-fb';
import { IconRss } from '../icons/icon-rss';

import styles from './about.css';
import desktopStyles from './about.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks()];

export const About = () => {
  const [email, setEmail] = useState<string>('noreply@gmail.com');
  useEffect(() => {
    const handler = setTimeout(() => {
      setEmail('rddra@gmail.com');
    }, 250);
    return () => {
      clearTimeout(handler);
    };
  }, []);
  return (
    <section className="about">
      <header className="about__header">
        <h1>Васильевский остров</h1>
        <h2>
          Авторский сайт о вокально-инструментальных ансамблях и музыке
          советской эпохи
        </h2>
      </header>
      <p className="about__disclaimer">
        Песни, представленные на этом сайте, выложены в пониженном битрейте
        и предназначены исключительно для ознакомления с творчеством
        исполнителей. Каждый законопослушный гражданин обязан после
        прослушивания немедленно стереть файл со своего компьютера и срочно
        бежать в магазин для покупки этих песен на легальных носителях (т.е.
        виниловых миньонов и гибких пластинок).
      </p>
      <address className="about__author author">
        <h3 className="author__header">Автор проекта</h3>
        <em className="author__name">Анатолий Васильев</em>
        <ul className="author__link social-links">
          <li className="social-links__item">
            <a className="social-link" href={`mailto:${email}`}>
              <IconEnvelope />
            </a>
          </li>
          <li className="social-links__item">
            <a className="social-link" href="https://www.facebook.com/rdddra">
              <IconFb />
            </a>
          </li>
          <li className="social-links__item">
            <a className="social-link" href="/rss.xml">
              <IconRss />
            </a>
          </li>
        </ul>
      </address>
    </section>
  );
};
