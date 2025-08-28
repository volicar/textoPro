// textUtils.js
export const textUtils = {
  toUpperCase: (text) => text.toUpperCase(),

  toLowerCase: (text) => text.toLowerCase(),

  capitalize: (text) =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),

  removeAccents: (text) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),

  countStats: (text) => ({
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).length : 0,
    sentences: text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0
  }),

  generateSlug: (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'),

  toCamelCase: (text) =>
    text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(''),

  toSnakeCase: (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_'),

  toKebabCase: (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-'),

  cleanFormatting: (text) =>
    text
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width chars
      .replace(/\u00A0/g, ' ') // non-breaking spaces
      .replace(/\r\n/g, '\n') // normalize line breaks
      .replace(/\t/g, '    ') // replace tabs with spaces
      .trim()
};
