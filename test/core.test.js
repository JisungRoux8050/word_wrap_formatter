import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wrap } from '../src/core.js';

test('wraps text to width at word boundaries', () => {
  assert.equal(wrap('one two three', 7), 'one two\nthree');
});

test('returns original text if it already fits', () => {
  assert.equal(wrap('short text', 20), 'short text');
});

test('handles empty string', () => {
  assert.equal(wrap('', 10), '');
});

test('handles multiple spaces by collapsing them', () => {
  assert.equal(wrap('one    two', 6), 'one\ntwo');
});

test('trims leading and trailing spaces on each line', () => {
  assert.equal(wrap('  hello   world  ', 5), 'hello\nworld');
});

test('preserves existing newlines as hard breaks', () => {
  assert.equal(wrap('one two\nthree four', 7), 'one two\nthree\nfour');
});

test('keeps a single long word unbroken', () => {
  assert.equal(wrap('abcdefghij', 3), 'abcdefghij');
});

test('places long word on its own line after shorter word', () => {
  assert.equal(wrap('abc defghijkl', 6), 'abc\ndefghijkl');
});

test('handles empty lines in input', () => {
  assert.equal(wrap('one\n\ntwo', 10), 'one\n\ntwo');
});

test('throws TypeError when text is not a string', () => {
  assert.throws(() => wrap(123, 10), TypeError);
});

test('throws TypeError when width is not an integer', () => {
  assert.throws(() => wrap('text', 10.5), TypeError);
});

test('throws RangeError when width is zero or negative', () => {
  assert.throws(() => wrap('text', 0), RangeError);
  assert.throws(() => wrap('text', -5), RangeError);
});

test('width exactly equal to word length', () => {
  assert.equal(wrap('abc def', 3), 'abc\ndef');
});

test('width exactly equal to combined line length', () => {
  assert.equal(wrap('ab cd ef', 5), 'ab cd\nef');
});
