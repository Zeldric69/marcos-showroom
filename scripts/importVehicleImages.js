import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { vehicleShowroomDatabase } from '../src/collection_page/carDashboard.js';

const root = path.resolve(import.meta.dirname, '..');
const outputDirectory = path.join(root, 'public', 'vehicles');
const standardOutputDirectory = path.join(outputDirectory, 'standard');
const liteOutputDirectory = path.join(outputDirectory, 'lite');
const creditsPath = path.join(root, 'src', 'collection_page', 'vehicleImageCredits.json');
const userAgent = 'MarcosPremiumCatalog/1.0 (vehicle image asset importer)';

function cleanText(value = '') {
    return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
}

async function fetchWithRetry(url) {
    for (let attempt = 0; attempt < 4; attempt += 1) {
        const response = await fetch(url, { headers: { 'User-Agent': userAgent } });
        if (response.ok) return response;
        if (response.status < 500 && response.status !== 429) {
            throw new Error(`Image request failed (${response.status}): ${url}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
    }
    throw new Error(`Image request failed after retries: ${url}`);
}

const imageEntries = Object.entries(vehicleShowroomDatabase).map(([id, vehicle]) => {
    const source = vehicle.img || vehicle.image || vehicle.colors?.[0]?.img;
    if (!source) throw new Error(`Vehicle ${id} has no image source.`);
    const filename = decodeURIComponent(new URL(source).pathname.split('/').pop());
    return { id, filename };
});

const filenameToIds = new Map();
for (const { id, filename } of imageEntries) {
    const key = filename.replace(/_/g, ' ').toLowerCase();
    filenameToIds.set(key, [...(filenameToIds.get(key) || []), id]);
}
const credits = {};
const jobs = [];

await mkdir(outputDirectory, { recursive: true });
await mkdir(standardOutputDirectory, { recursive: true });
await mkdir(liteOutputDirectory, { recursive: true });

for (let offset = 0; offset < imageEntries.length; offset += 40) {
    const batch = imageEntries.slice(offset, offset + 40);
    const params = new URLSearchParams({
        action: 'query',
        titles: batch.map(({ filename }) => `File:${filename.replace(/_/g, ' ')}`).join('|'),
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiurlwidth: '960',
        format: 'json'
    });
    const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`);
    const data = await response.json();

    for (const page of Object.values(data.query.pages)) {
        const info = page.imageinfo?.[0];
        const ids = filenameToIds.get(page.title.slice(5).replace(/_/g, ' ').toLowerCase());
        if (!ids?.length || !info?.thumburl) throw new Error(`Could not resolve Commons image for ${page.title}.`);

        jobs.push(async () => {
            const imageResponse = await fetchWithRetry(info.thumburl);
            const image = Buffer.from(await imageResponse.arrayBuffer());
            const metadata = info.extmetadata || {};
            const credit = {
                author: cleanText(metadata.Artist?.value) || 'Unknown author',
                license: cleanText(metadata.LicenseShortName?.value) || 'License details unavailable',
                licenseUrl: metadata.LicenseUrl?.value || '',
                sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`
            };
            for (const id of ids) {
                await Promise.all([
                    sharp(image)
                        .rotate()
                        .resize({ width: 640, withoutEnlargement: true })
                        .webp({ quality: 76 })
                        .toFile(path.join(standardOutputDirectory, `${id}.webp`)),
                    sharp(image)
                        .rotate()
                        .resize({ width: 360, withoutEnlargement: true })
                        .webp({ quality: 70 })
                        .toFile(path.join(liteOutputDirectory, `${id}.webp`))
                ]);
                credits[id] = credit;
            }
        });
    }
}

let nextJob = 0;
async function worker() {
    while (nextJob < jobs.length) {
        const job = jobs[nextJob];
        nextJob += 1;
        await job();
    }
}

await Promise.all(Array.from({ length: 4 }, worker));
await writeFile(creditsPath, `${JSON.stringify(credits, null, 2)}\n`);
console.log(`Imported ${Object.keys(credits).length} vehicle images and attribution records.`);