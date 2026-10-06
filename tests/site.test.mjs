import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const output = new URL('../dist/', import.meta.url);
assert.ok(existsSync(new URL('index.html', output)), 'Run npm run build before npm test');
const html = readFileSync(new URL('index.html', output), 'utf8');
// ponytail: this checks our generated HTML; use an HTML parser for arbitrary input.
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/\s([\w:-]+)(?:="([^"]*)")?/g)].map((match) => [match[1], match[2] ?? '']),
);
const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b(?:"[^"]*"|'[^']*'|[^'">])*>`, 'g'))].map((match) => attributes(match[0]));

test('Static page preserves metadata, five projects, and accessible links', () => {
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /<title>yyyywaiwai \| Personal Lab<\/title>/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  const metadata = Object.fromEntries(tags('meta').map((tag) => [tag.name ?? tag.property, tag.content]));
  assert.match(metadata.generator, /^Astro v/);
  assert.match(metadata.description, /yyyywaiwaiのポートフォリオ/);
  assert.equal(metadata['og:description'], metadata.description);
  assert.equal(metadata['og:url'], 'https://yyyywaiwai.com/');
  assert.equal(metadata['og:locale'], 'ja_JP');
  assert.equal(metadata['og:image'], 'https://yyyywaiwai.com/icon.jpg');
  assert.equal(metadata['twitter:card'], 'summary');
  assert.equal(tags('link').find((tag) => tag.rel === 'canonical')?.href, 'https://yyyywaiwai.com/');

  const projects = [
    ['iMons', 'https://imons.yyyywaiwai.com/'],
    ['MioWidget', 'https://apps.apple.com/jp/app/miowidget/id6758489056'],
    ['AMbot', 'https://discord.com/oauth2/authorize?client_id=1409248906386215002'],
    ['Lyric Shooter', 'https://lyric-shooter.yyyywaiwai.com'],
    ['amdl-web', 'https://amdl.yyyywaiwai.com'],
  ];
  const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map((match) => match[0]);
  assert.equal(articles.length, projects.length);
  for (const [index, [title, url]] of projects.entries()) {
    assert.ok(articles[index].includes(`>${title}<`), `Project title: ${title}`);
    assert.ok(articles[index].includes(`href="${url}"`), `Project link: ${title}`);
    assert.ok(articles[index].includes('data-slot="card"'), 'Uses shadcn Card');
    assert.ok(articles[index].includes('data-slot="badge"'), 'Uses shadcn Badge');
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs are unique');
  for (const link of tags('a')) {
    if (link.href?.startsWith('#')) assert.ok(ids.includes(link.href.slice(1)), `Anchor target: ${link.href}`);
    if (link.target === '_blank') {
      const rel = link.rel?.split(/\s+/) ?? [];
      assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), `External link rel: ${link.href}`);
    }
  }
  for (const repository of ['IIJWidget', 'lyric-shooter-game']) {
    assert.ok(tags('a').some((link) => link.href === `https://github.com/yyyywaiwai/${repository}`), `Source link: ${repository}`);
  }
  assert.doesNotMatch(html, /<astro-island\b|id="root"|Mui[A-Z]|data-emotion=|hydrateRoot|createRoot\(/);
});

test('Referenced local styles, scripts, and responsive images exist', () => {
  const references = new Set();
  for (const tag of [...tags('script'), ...tags('link'), ...tags('img'), ...tags('source'), ...tags('button')]) {
    for (const key of ['src', 'href', 'data-rickroll']) if (tag[key]) references.add(tag[key]);
    for (const item of tag.srcset?.split(',') ?? []) references.add(item.trim().split(/\s+/)[0]);
  }
  let localCount = 0;
  for (const reference of references) {
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    const file = new URL(`.${new URL(reference, 'https://yyyywaiwai.com').pathname}`, output);
    assert.ok(existsSync(file), `Built asset: ${reference}`);
    localCount++;
  }
  assert.ok(localCount >= 7, 'Checks stylesheet, avatar, animation, and project images');
});

test('Native avatar timer, reduced motion, and navigation work without React', () => {
  const source = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Page client script exists');
  const portrait = { src: 'https://yyyywaiwai.com/icon.jpg' };
  const classes = new Set();
  const timers = new Map();
  const reducedMotion = { matches: false };
  const links = ['about', 'projects', 'music'].map((nav) => ({
    dataset: { nav },
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    removeAttribute(name) { delete this.attributes[name]; },
  }));
  const sections = Object.fromEntries(links.map((link) => [link.dataset.nav, { id: link.dataset.nav }]));
  let click;
  let observeEntries;
  let nextTimer = 0;
  const observed = [];
  const avatar = {
    dataset: { rickroll: '/_astro/rickroll.gif' },
    title: '押してみて',
    querySelector: () => portrait,
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) },
    addEventListener: (event, listener) => { assert.equal(event, 'click'); click = listener; },
  };
  class IntersectionObserver {
    constructor(callback) { observeEntries = callback; }
    observe(section) { observed.push(section.id); }
  }
  const context = {
    document: {
      querySelector: () => avatar,
      querySelectorAll: () => links,
      getElementById: (id) => sections[id],
    },
    window: {
      matchMedia: (query) => { assert.equal(query, '(prefers-reduced-motion: reduce)'); return reducedMotion; },
      clearTimeout: (id) => timers.delete(id),
      setTimeout: (callback, delay) => { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
      IntersectionObserver,
    },
    IntersectionObserver,
  };
  const code = stripTypeScriptTypes(script);
  runInNewContext(code, context);
  click();
  assert.equal(portrait.src, avatar.dataset.rickroll);
  assert.ok(classes.has('is-surprised'));
  assert.equal(timers.get(nextTimer).delay, 3000);
  click();
  assert.equal(timers.size, 1, 'Repeated clicks cancel the previous timer');
  timers.get(nextTimer).callback();
  assert.equal(portrait.src, 'https://yyyywaiwai.com/icon.jpg');
  assert.equal(avatar.title, '押してみて');
  assert.equal(classes.size, 0);
  click();
  assert.equal(portrait.src, avatar.dataset.rickroll);
  reducedMotion.matches = true;
  click();
  assert.equal(portrait.src, 'https://yyyywaiwai.com/icon.jpg', 'Reduced motion restores the still image even during a GIF');
  assert.equal(timers.get(nextTimer).delay, 1500);
  assert.deepEqual(observed, ['about', 'projects', 'music']);
  observeEntries([{ target: sections.projects, isIntersecting: true }]);
  assert.equal(links[1].attributes['aria-current'], 'location');
  assert.equal(links.filter((link) => link.attributes['aria-current']).length, 1);
  observeEntries([{ target: sections.about, isIntersecting: false }]);
  assert.equal(links[1].attributes['aria-current'], 'location', 'Off-screen entries do not change navigation');
  assert.doesNotThrow(() => runInNewContext(code, { document: { querySelector: () => null }, window: {} }), 'Optional browser features fail gracefully');
});
