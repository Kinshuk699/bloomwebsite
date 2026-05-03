import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const read = (path) => readFileSync(resolve(root, path), 'utf8');

const checks = [];

const check = (name, condition) => {
  checks.push({ name, passed: Boolean(condition) });
};

const includes = (html, text) => html.includes(text);

check('root index exists', existsSync(resolve(root, 'index.html')));
check('Bloom policy page exists', existsSync(resolve(root, 'bloom-privacy.html')));
check('Sight policy page exists', existsSync(resolve(root, 'sight-detect-navigate-privacy.html')));

const index = read('index.html');
check('root is a privacy policy hub', includes(index, 'Kinshuk Apps — Privacy Policies'));
check('root introduces Kinshuk', includes(index, "Hi, I'm") && includes(index, '<span>Kinshuk</span>'));
check('root does not repeat site domain eyebrow', !includes(index, 'wisdominurmovement.com</p>'));
check('root links Kinshuk to portfolio', includes(index, 'href="https://kinshuksahni.com/"') && includes(index, '<span>Kinshuk</span>'));
check('root includes AI philosophy', includes(index, 'I think AI is most useful when it gives people time back'));
check('root includes football and volunteering line', includes(index, 'football pitch') && includes(index, 'volunteering'));
check('root includes monthly project goal', includes(index, 'create something meaningful every month'));
check('root includes 2026 project log', includes(index, 'Bloom: Your Pixel Journal') && includes(index, 'willyoubemyclementine.com') && includes(index, 'RevSlot') && includes(index, 'BehaveV3.0') && includes(index, 'Sight: Detect &amp; Navigate'));
check('root links to Bloom policy', includes(index, 'href="bloom-privacy.html"') && includes(index, 'Bloom Privacy Policy'));
check('root links to Sight policy', includes(index, 'href="sight-detect-navigate-privacy.html"') && includes(index, 'Sight: Detect &amp; Navigate Privacy Policy'));

if (existsSync(resolve(root, 'bloom-privacy.html'))) {
  const bloom = read('bloom-privacy.html');
  check('Bloom page keeps current policy title', includes(bloom, 'Bloom — Plant Journal'));
  check('Bloom page keeps journal description', includes(bloom, 'Bloom is a cozy journaling app that turns your day into a flower.'));
  check('Bloom page keeps no-tracking language', includes(bloom, 'personal info, trackers, or ads'));
}

if (existsSync(resolve(root, 'sight-detect-navigate-privacy.html'))) {
  const sight = read('sight-detect-navigate-privacy.html');
  check('Sight page has final public title', includes(sight, 'Sight: Detect &amp; Navigate Privacy Policy'));
  check('Sight page uses final app name in policy text', includes(sight, 'Sight: Detect &amp; Navigate does not have a server.'));
  check('Sight page preserves no-analytics claim', includes(sight, 'no analytics, no advertising, no tracking'));
  check('Sight page preserves Apple Maps services', includes(sight, 'Apple Maps') && includes(sight, 'MKDirections'));
  check('Sight page does not expose old app name', !includes(sight, 'Seyeght'));
  check('Sight page includes warm about section', includes(sight, '<section id="about">') && includes(sight, 'Sight: Detect &amp; Navigate is a LiDAR-based navigation assistant'));
  check('Sight page mentions LiDAR device requirement', includes(sight, 'requires an iPhone with a LiDAR scanner'));
  check('Sight page mentions offline route behavior', includes(sight, 'Once a route is set under the navigation tab, the entire app can function offline'));
  check('Sight page includes thank-you line', includes(sight, 'Thank you for downloading the app!'));
  check('Sight page links to Apple EULA', includes(sight, 'Terms of Use (EULA)') && includes(sight, 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'));
  check('Sight page includes scroll eye canvas', includes(sight, 'id="sight-canvas"') && includes(sight, 'drawSightEye'));
}

const failed = checks.filter((result) => !result.passed);

for (const result of checks) {
  console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.name}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}