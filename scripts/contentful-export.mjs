#!/usr/bin/env node
import { config } from 'dotenv';
import contentfulExport from 'contentful-export';
import contentfulImport from 'contentful-import';
import contentful from 'contentful-management';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import yargs from 'yargs';

config();

const options = {
  spaceId: process.env['CONTENTFUL_SPACE_ID'],
  managementToken: process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN'],
};

const locale = 'ru-RU';

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
    .then((result) => {
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

async function mergeData(argv) {
  const contentType = {
    newsItem: 'newsItem',
  };

  const clientInstance = contentful.createClient({
    accessToken: process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN'],
  });
  const spaceInstance = await clientInstance.getSpace(
    process.env['CONTENTFUL_SPACE_ID']
  );
  const client = await spaceInstance.getEnvironment(argv.contentfulEnv);

  if (!existsSync(argv.scrappedData)) {
    console.log(`File not found: ${argv.scrappedData}`);
    process.exit(1);
  }

  const scrappedData = JSON.parse(readFileSync(argv.scrappedData).toString());

  const news = await client.getEntries({
    content_type: contentType.newsItem,
  });

  Object.entries(scrappedData.news.items).forEach(
    async ([hash, scrappedEntry]) => {
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
  );

  return {};
}

function isSameNews(scrappedEntry) {
  return (contentfulNewsItem) => {
    return (
      contentfulNewsItem.fields.text[locale].trim() ===
      scrappedEntry.text.trim()
    );
  };
}
