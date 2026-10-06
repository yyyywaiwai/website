import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const output = new URL('../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', output), 'utf8');
// ponytail: generated Astro markup only; use a parser if this accepts arbitrary HTML.
const visibleText = (markup) => markup
  .replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/g, '')
  .replace(/<(?:(?:"[^"]*"|'[^']*')|[^'">])*>/g, '').replace(/\s+/g, ' ').trim();
const links = [...html.matchAll(/<a\b((?:"[^"]*"|'[^']*'|[^'">])*)>([\s\S]*?)<\/a>/g)];

test('Refinement keeps navigation and one contact label without decorative microcopy', () => {
  assert.doesNotMatch(visibleText(html), /[—–]/);
  assert.doesNotMatch(html, /hero-lead|listening-image|project-footnote|iMonsや好きな音楽の話など、気軽にどうぞ。|日本でiOSアプリやWebツールを作り、音楽も楽しんでいます。/);
  assert.doesNotMatch(html, /class="[^"]*\b(?:section-kicker|project-number|media-caption|status-dot|listening-dot|interests)\b/);
  for (const [id, label] of [['about', 'About'], ['projects', 'Projects'], ['music', 'Music']]) {
    assert.ok(links.some(([, attributes, text]) => attributes.includes(`href="#${id}"`) && visibleText(text) === label));
  }
  const contacts = links.filter(([, attributes]) => attributes.includes('href="https://discord.com/invite/DfRhN8uFjX"'));
  assert.ok(contacts.length > 0, 'Discord contact remains reachable');
  for (const contact of contacts) assert.equal(visibleText(contact[2]), 'Discordに参加');
  for (const [, attributes, markup] of links) {
    const label = attributes.match(/\baria-label="([^"]*)"/)?.[1];
    const text = visibleText(markup);
    if (label && text) assert.ok(label.includes(text), `Accessible name includes its visible label: ${text}`);
  }
  const hero = html.match(/class="hero-copy"[^>]*>([\s\S]*?)<div\b[^>]*class="hero-actions"/);
  assert.ok(hero, 'Hero retains its action group');
  assert.equal([...hero[1].matchAll(/<(?:h[1-6]|p)\b/g)].length, 2, 'Hero has a headline, description, and actions only');
});

test('Display font is self-hosted, bundled, and uses swap', () => {
  const stylesheets = [...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g)]
    .map((match) => new URL(`.${match[1]}`, output));
  assert.ok(stylesheets.length > 0, 'Built styles exist');
  let foundFont = false;
  for (const file of stylesheets) {
    const css = readFileSync(file, 'utf8');
    for (const face of css.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
      if (!/font-family\s*:\s*["']?Geist/i.test(face[1])) continue;
      foundFont = true;
      assert.match(face[1], /font-display\s*:\s*swap/);
      const urls = [...face[1].matchAll(/url\(["']?([^"')]+)["']?\)/g)];
      assert.ok(urls.length > 0);
      for (const [, reference] of urls) {
        assert.doesNotMatch(reference, /^(?:https?:)?\/\//, 'Font is not a third-party request');
        const font = reference.startsWith('/') ? new URL(`.${reference}`, output) : new URL(reference, file);
        assert.ok(existsSync(font), `Bundled font exists: ${reference}`);
      }
    }
  }
  assert.ok(foundFont, 'Geist font-face is included in the built CSS');
});
