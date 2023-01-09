export function attachStorageUrl(link?: string): string {
  if (!link || /https?:\/\//.test(link)) {
    return link ?? '';
  }
  const base = process.env['FILE_STORAGE']?.replace(/\/$/, '');
  return `${base}${link}`;
}
