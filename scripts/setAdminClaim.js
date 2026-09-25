import { readFileSync } from 'node:fs';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

if (!credentialsPath || !adminEmail) {
    throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS and ADMIN_EMAIL before assigning the admin claim.');
}

const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const app = getApps()[0] || initializeApp({ credential: cert(credentials) });
const firebaseAuth = getAuth(app);
const adminUser = await firebaseAuth.getUserByEmail(adminEmail);
const existingClaims = adminUser.customClaims || {};

await firebaseAuth.setCustomUserClaims(adminUser.uid, { ...existingClaims, admin: true });
console.log(`Admin claim assigned to ${adminEmail}. Sign out and sign back in before testing.`);