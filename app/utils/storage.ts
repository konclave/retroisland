export function attachStorageUrl(link?: string): string {
  if (!link || /http?s:\/\//.test(link)) {
    return link ?? '';
  }
  const base = process.env['FILE_STORAGE']?.replace(/\/$/, '');
  return `${base}${link}`;
}
