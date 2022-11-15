#!/usr/bin/env node
import { config } from 'dotenv';
import contentfulExport from 'contentful-export';
import contentfulImport from 'contentful-import';
import { writeFileSync, existsSync } from 'fs';
import yargs from 'yargs';

config();

const options = {
  spaceId: process.env['CONTENTFUL_SPACE_ID'],
  managementToken: process.env['CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN'],
};

const argv = yargs(process.argv.slice(2))
  .command('export', 'Export data from Contentful', exportData)
  .command(
    'import',
    'Import local data to Contentful',
    {
      filename: {
        describe: 'Path to data file',
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
  const { filename } = argv;
  if (!existsSync(filename)) {
    console.log(`File ${filename} not found.`);
    process.exit(1);
  }

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
