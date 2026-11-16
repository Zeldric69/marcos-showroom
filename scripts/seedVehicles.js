import { readFileSync } from 'node:fs';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { vehicleShowroomDatabase } from '../src/collection_page/carDashboard.js';

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credentialsPath) {
    throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service-account JSON file before seeding.');
}

const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const app = getApps()[0] || initializeApp({ credential: cert(credentials) });
const db = getFirestore(app);

const vehicleEntries = Object.entries(vehicleShowroomDatabase);
const existingVehicles = await db.collection('vehicles').get();
const existingIds = new Set(existingVehicles.docs.map((vehicleDocument) => vehicleDocument.id));
for (let index = 0; index < vehicleEntries.length; index += 500) {
    const batch = db.batch();
    vehicleEntries.slice(index, index + 500).forEach(([id, vehicle], offset) => {
        const vehicleDocument = db.collection('vehicles').doc(id);
        const order = index + offset;
        if (existingIds.has(id)) {
            batch.update(vehicleDocument, { order });
        } else {
            batch.create(vehicleDocument, { ...vehicle, order });
        }
    });
    await batch.commit();
}

console.log(`Seeded ${vehicleEntries.length} vehicles into Firestore.`);
