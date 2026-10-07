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

## Design notes

The window stores values eagerly rather than keeping running aggregates. Running
sums drift with floating point over long streams, and recomputing from a small
buffer is cheap enough that the drift is not worth the speed.

## Performance

The window keeps a bounded buffer, so `push` is constant time and memory does not
grow with the length of the stream. `peak` and `trough` are linear in the window
size, which is the trade that keeps `push` cheap.

