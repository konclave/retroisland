import { BREAKPOINT_DESKTOP } from '~/config';
import { RequestedItem } from './components/requested-item/requested-item';
import styles from './tracks-on-request.css';
import desktopStyles from './tracks-on-request.d.css';

if (typeof document !== 'undefined') {
  Promise.all([import('howler'), import('jquery')]).then(
    ([
      {
        default: { Howl },
      },
      { default: jQuery },
    ]) => {
      (window as any).Howl = Howl;
      (window as any).jQuery = (window as any).$ = jQuery;
      import('ilyabirman-jouele');
    }
  );
}

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

export const TracksOnRequest = () => {
  const tracks: any[] = [
    {
      id: 1,
      artist: 'Тринадцатое Созвездие',
      album: '',
      title: '',
      tracks: [
        {
          title: 'Хотят ли русские войны (Э.Колмановский-Е.Евтушенко)',
          link: '/music/13-sozvezdie/13S-Hotyat_Li_Russkie.mp3',
          length: '',
        },
        {
          title: 'Спокойной ночи, старики (К.Арбенин)',
          link: '/music/13-sozvezdie/13S-Spokoynoy_Nochi.mp3',
          length: '',
        },
        {
          title: 'Баллада о борьбе (В.Высоцкий)',
          link: '/music/13-sozvezdie/13S_Balada_O_Borbe.mp3',
          length: '',
        },
        {
          title: 'За того парня (М.Фрадкин-Р.Рождественский)',
          link: '/music/13-sozvezdie/13S_Za_Togo_Parnya.mp3',
          length: '',
        },
        {
          title: 'Дружба',
          link: '/music/13-sozvezdie/13_S_Druzhba.mp3',
          length: '',
        },
      ],
    },
  ];

  return (
    <section className="tracks-on-request">
      <ul className="requested-list">
        {tracks.map((entry) => (
          <li
            className="requested-list__item"
            data-collapsed="true"
            key={entry.id}
          >
            <RequestedItem item={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
};
