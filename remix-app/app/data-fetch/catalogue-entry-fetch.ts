import { client } from './contentful-client';
import { mapToDto } from './catalogue-list-fetch';
import type { ICatalogueEntryFields } from '~/types/generated/contentful';
import type { CatalogueEntryDto } from './catalogue-list-fetch';

export async function fetchCatalogueEntry(
  slug: string
): Promise<CatalogueEntryDto> {
  const response = await client.getEntries<ICatalogueEntryFields>({
    content_type: 'catalogueEntry',
    'fields.slug': slug,
    select: 'sys.id,fields',
    include: 2,
  });
  return mapToDto(response.items[0]);
}
