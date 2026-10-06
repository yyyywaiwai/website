import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/components/Music.astro', import.meta.url), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'Music client script exists');

const eventTarget = (properties = {}) => ({
  ...properties,
  listeners: {},
  addEventListener(event, listener) { this.listeners[event] = listener; },
});
const cardUrl = 'https://www.russ.rest/lastfm-last-played?username=yyyywaiwai&width=900';
const image = eventTarget({ src: cardUrl, dataset: { cardUrl }, complete: true, naturalWidth: 0, hidden: false });
const playlist = eventTarget({ src: 'https://embed.music.apple.com/jp/playlist/favorite-songs/pl.u-0JUYxokm3b?theme=light' });
const embed = { dataset: {} };
const darkMode = eventTarget({ matches: false });
const elements = { '#lastfm-image': image, '#apple-music-playlist': playlist, '#playlist-embed': embed };
const document = eventTarget({ visibilityState: 'visible', querySelector: (selector) => elements[selector] });
const probes = [];
const intervals = [];
const timeouts = new Map();
let clock = 120_000;
let nextTimer = 0;

runInNewContext(stripTypeScriptTypes(script), {
  document,
  window: {
    matchMedia: () => darkMode,
    setInterval: (callback, delay) => { assert.equal(delay, 60_000); intervals.push(callback); },
    setTimeout: (callback, delay) => { assert.equal(delay, 8_000); timeouts.set(++nextTimer, callback); return nextTimer; },
    clearTimeout: (id) => timeouts.delete(id),
  },
  Image: class { constructor() { probes.push(this); } },
  Date: { now: () => clock },
  URL,
});

assert.equal(image.hidden, true, 'Initial broken image exposes the fallback');
assert.equal(probes.length, 1, 'Initial refresh is preloaded');
probes[0].onerror();
document.listeners.visibilitychange();
assert.equal(probes.length, 2, 'Failed initial request can be retried within the same minute');
probes[1].onload();
assert.equal(image.hidden, false);
assert.equal(image.src, `${cardUrl}&refresh=2`);
intervals[0]();
assert.equal(probes.length, 2, 'Already displayed minute is not fetched again');

clock += 60_000;
document.visibilityState = 'hidden';
intervals[0]();
assert.equal(probes.length, 2, 'Background tabs do not refresh');
document.visibilityState = 'visible';
document.listeners.visibilitychange();
assert.equal(probes.length, 3, 'Returning to the tab refreshes');
probes[2].onerror();
assert.equal(image.src, `${cardUrl}&refresh=2`, 'A failed refresh retains the last successful image');

document.listeners.visibilitychange();
clock += 60_000;
intervals[0]();
probes[3].onload();
assert.equal(image.src, `${cardUrl}&refresh=2`, 'An older in-flight result does not replace newer work');
probes[4].onload();
assert.equal(image.src, `${cardUrl}&refresh=4`);

darkMode.matches = true;
darkMode.listeners.change();
assert.match(playlist.src, /theme=dark$/);
assert.equal(embed.dataset.loading, 'true');
playlist.listeners.load();
assert.equal(embed.dataset.loading, undefined);
darkMode.matches = false;
darkMode.listeners.change();
assert.match(playlist.src, /theme=light$/);
for (const callback of timeouts.values()) callback();
assert.equal(embed.dataset.loading, undefined, 'Skeleton clears even if the iframe never loads');
assert.ok(source.includes('https://music.apple.com/jp/playlist/favorite-songs/pl.u-0JUYxokm3b'), 'Direct playlist fallback remains present');
console.log('Music refresh, retry, visibility, race, and theme checks passed.');
