# word-wrap-formatter

Wraps text to a character width respecting word boundaries for email and terminal display.

```js
import { wrap } from './src/index.js';

console.log(wrap('Hello there, this is a test.', 10));
// Hello
// there,
// this is a
// test.
```

## Why this exists

Plain text in emails and terminals must fit within a fixed number of columns without breaking words. This library provides a small, dependency-free formatter that does exactly that. The main trade-off is simplicity: the formatter does not handle tabs, Unicode width, or hyphenation. It counts characters, not display cells, and assumes words are separated by whitespace.

## Edge case

A word longer than the requested width is placed on its own line without breaking. Existing newlines are treated as hard line breaks and are preserved. Consecutive whitespace is collapsed to a single space.

## Exports

- `wrap(text, width)` — wraps `text` to `width` columns, returning a string with `\n` separators.
