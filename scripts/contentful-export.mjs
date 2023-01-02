#!/usr/bin/env node
import { config } from 'dotenv';
import contentfulExport from 'contentful-export';
import contentfulImport from 'contentful-import';
import contentful from 'contentful-management';
import { existsSync, readFileSync } from 'fs';
import yargs from 'yargs';

config();

const options = {
  spaceId: process.env['CONTENTFUL_SPACE_ID'],
  managementToken: process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN'],
};

const locale = 'ru-RU';

const contentType = {
  newsItem: 'newsItem',
  singer: 'catalogueEntry',
  album: 'album',
  track: 'requestedTrack',
  otherLink: 'outerLink',
  video: 'video',
};

const argv = yargs(process.argv.slice(2))
  .command('export', 'Export data from Contentful', exportData)
  .command(
    'import',
    'Import local data to Contentful',
    {
      'contentful-data': {
        describe: 'Path to contentful data file',
        type: 'string',
        required: true,
      },
      'contentful-env': {
        describe: 'Contentful environment',
        type: 'string',
        default: 'develop',
      },
    },
    importData
  )
  .command(
    'merge',
    'Merge local data to Contentful',
    {
      'scrapped-data': {
        describe: '',
        type: 'string',
        require: true,
      },
      'contentful-env': {
        describe: 'Contentful environment',
        type: 'string',
        default: 'develop',
      },
    },
    mergeData
  )
  .command(
    'publish-singers',
    'Publish all singer entries',
    {
      'contentful-env': {
        describe: 'Contentful environment',
        type: 'string',
        default: 'develop',
      },
    },
    publishAllSingers
  )
  .help()
  .parse();

function exportData() {
  if (!process.env['CONTENTFUL_SPACE_ID']) {
    console.log('CONTENTFUL_SPACE_ID environment variable not defined.');
    process.exit(1);
  }
  if (!process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN']) {
    console.log(
      'CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN environment variable not defined.'
    );
    process.exit(1);
  }

  contentfulExport({
    ...options,
    exportDir: './generated',
    contentFile: 'contentful-data.json',
  })
    .then(() => {
      console.log('Contentful data successfully exported.');
    })
    .catch((err) => {
      console.log('Oh no! Some errors occurred!', err);
    });
}

function importData(argv) {
  if (!existsSync(argv['contentful-data'])) {
    console.log(`File ${argv['contentful-data']} not found.`);
    process.exit(1);
  }

  const sourceContentful = readFileSync(argv['contentful-data']).toString();

  contentfulImport({
    ...options,
    contentFile: filename,
    environmentId: argv['contentful-env'] || 'develop',
  })
    .then(() => {
      console.log('Data imported successfully');
    })
    .catch((err) => {
      console.log('Oh no! Some errors occurred!', err);
    });
}

async function getContentfulClient(contentfulEnv) {
  if (getContentfulClient.client) {
    return getContentfulClient.client;
  }
  const clientInstance = contentful.createClient({
    accessToken: process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN'],
  });
  const spaceInstance = await clientInstance.getSpace(
    process.env['CONTENTFUL_SPACE_ID']
  );
  const client = await spaceInstance.getEnvironment(contentfulEnv);
  getContentfulClient.client = client;
  return client;
}

async function mergeData(argv) {
  if (!existsSync(argv.scrappedData)) {
    console.log(`File not found: ${argv.scrappedData}`);
    process.exit(1);
  }

  const scrappedData = JSON.parse(readFileSync(argv.scrappedData).toString());
  const client = await getContentfulClient(argv.contentfulEnv);
  mergeNews(scrappedData, client);
  mergeSingers(scrappedData, client);
}

async function mergeNews(scrappedData, client) {
  const newsEntries = Object.entries(scrappedData.news.items);
  for (let i = 0; i < scrappedData.news.items.length; i++) {
    const [, scrappedEntry] = newsEntries[i];
    const existing = news.items.find(isSameNews(scrappedEntry));
    if (!existing) {
      const draft = await client.createEntry(contentType.newsItem, {
        fields: {
          published: { [locale]: scrappedEntry.published },
          text: { [locale]: scrappedEntry.text },
        },
      });
      await draft.publish();
      console.log(
        `[news] Published entry: ${
          scrappedEntry.published
        } ${scrappedEntry.text.slice(0, 30)}...`
      );
    }
  }
}

function isSameNews(scrappedEntry) {
  return (contentfulNewsItem) => {
    return (
      contentfulNewsItem.fields.text[locale].trim() ===
      scrappedEntry.text.trim()
    );
  };
}

async function mergeSingers(scrappedData, client) {
  const singers = Object.values(scrappedData.singers);
  for (let singer of singers) {
    const contentfulSinger = await getContentfulSinger(singer.singer, client);

    if (!contentfulSinger) {
      console.log(
        `[Singer] Failed fetching singer with title "${singer.singer}"`
      );
      continue;
    }
    const { albums } = singer;

    const albumLinks = [];
    const otherLinks = [];
    let videos = [];
    for (let album of albums) {
      const tracks = album.tracks;
      let trackLinks = [];
      for (let track of tracks) {
        const { title, subtitle, link } = track;

        const createdTrack = await client.createEntry(contentType.track, {
          fields: {
            title: l(title),
            shortDescription: l(subtitle),
            link: l(link),
          },
        });
        trackLinks.push(linkEntry(createdTrack.sys.id));
        await createdTrack.publish();
        console.log(`[Track] "${title}" published`);
      }

      const createdAlbum =
        album.tracks.length > 0
          ? await client.createEntry(contentType.album, {
              fields: {
                title: l(album.title),
                tracks: l(trackLinks),
              },
            })
          : null;

      for (let otherLink of album.otherLinks) {
        const { title, link } = otherLink;

        const createdLink = await client.createEntry(contentType.otherLink, {
          fields: {
            title: l(title),
            link: l(link),
          },
        });

        otherLinks.push(linkEntry(createdLink.sys.id));

        await createdLink.publish();
        console.log(`[Other link] "${title}" published`);
      }
      videos = videos.concat(await createVideos(album.videos, client));
      if (createdAlbum) {
        await createdAlbum.publish();
        albumLinks.push(linkEntry(createdAlbum.sys.id));
        console.log(`[Album] "${album.title}" published`);
      }
    }

    const existingAlbums = contentfulSinger.fields.albums?.[locale] || [];
    const mergedAlbums = [...existingAlbums, ...albumLinks];
    contentfulSinger.fields.albums = { [locale]: mergedAlbums };
    contentfulSinger.fields.videos = l(videos);
    contentfulSinger.fields.links = l(otherLinks);

    await contentfulSinger.update();
    // await contentfulSinger.publish();
    console.log(`[Singer] "${singer.singer}" updated`);
  }
}

function l(field) {
  return { [locale]: field };
}

function linkEntry(id) {
  return {
    sys: {
      type: 'Link',
      linkType: 'Entry',
      id,
    },
  };
}

async function getContentfulSinger(title, client) {
  const response = await client.getEntries({
    content_type: contentType.singer,
    'fields.title': title,
  });

  const id = response.items[0]?.sys.id;
  if (id) {
    return client.getEntry(id);
  }
  return null;
}

async function createVideos(videos, client) {
  let createdArr = [];
  for (let video of videos) {
    const { title, url } = video;

    const created = await client.createEntry(contentType.video, {
      fields: {
        title: l(title),
        url: l(url),
      },
    });
    createdArr.push(linkEntry(created.sys.id));
    await created.publish();
    console.log(`[Video] "${title}" published`);
  }
  return createdArr;
}

async function publishAllSingers(argv) {
  const client = await getContentfulClient(argv.contentfulEnv);
  const response = await client.getEntries({
    content_type: contentType.singer,
  });

  response.items?.reduce(async (acc, item) => {
    await acc;
    const id = item.sys.id;
    const entry = await client.getEntry(id);
    return entry.publish();
  }, Promise.resolve());
}
