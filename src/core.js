/**
 * Word Wrap Formatter core.
 *
 * Wraps plain text to a given maximum character width, breaking at word
 * boundaries. A single word longer than the width is left unbroken on its own
 * line, because splitting it would produce a line that is not a word boundary
 * and would be surprising for terminal or email display.
 *
 * The formatter treats newline characters as hard line breaks: text after a
 * newline starts on a fresh line. Consecutive spaces are collapsed to a single
 * space, and leading/trailing spaces on each wrapped line are trimmed. This
 * keeps output predictable for fixed-width displays.
 */

/**
 * Wrap text to the given character width, respecting word boundaries.
 *
 * @param {string} text - The input text. Must be a string.
 * @param {number} width - Maximum line width. Must be a positive integer.
 * @returns {string} Wrapped text with lines separated by '\n'.
 * @throws {TypeError} If text is not a string or width is not a number.
 * @throws {RangeError} If width is not a positive integer.
 */
export function wrap(text, width) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (typeof width !== 'number' || !Number.isInteger(width)) {
    throw new TypeError('width must be an integer');
  }
  if (width <= 0) {
    throw new RangeError('width must be a positive integer');
  }

  // Split on newlines so existing hard breaks are preserved.
  const paragraphs = text.split('\n');
  const wrappedParagraphs = paragraphs.map((paragraph) => {
    // Collapse consecutive whitespace to single spaces, then trim the
    // paragraph so lines never start or end with spaces.
    const normalized = paragraph.replace(/\s+/g, ' ').trim();
    if (normalized === '') {
      return '';
    }

    const words = normalized.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if (currentLine === '') {
        // Always put the first word on a line, even if it is longer than width.
        currentLine = word;
      } else if (currentLine.length + 1 + word.length <= width) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine !== '') {
      lines.push(currentLine);
    }

    return lines.join('\n');
  });

  return wrappedParagraphs.join('\n');
}
