import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

let testEnvironment;

before(async () => {
    const [host, port] = process.env.FIRESTORE_EMULATOR_HOST.split(':');
    testEnvironment = await initializeTestEnvironment({
        projectId: 'demo-marcos-rules',
        firestore: {
            host,
            port: Number(port),
            rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8')
        }
    });
});

after(async () => {
    await testEnvironment?.cleanup();
});

function purchaseRequest(userId, email) {
    return {
        userId,
        userEmail: email,
        actionType: 'purchase',
        vehicleId: 'porsche-911-gt3',
        vehicleName: 'Porsche 911 GT3',
        vehiclePrice: '$230,500',
        status: 'new',
        createdAt: serverTimestamp()
    };
}

test('valid users can create purchase, service, and trade-in requests', async () => {
    const context = testEnvironment.authenticatedContext('user-a', { email: 'a@example.com' });
    const firestore = context.firestore();

    await assertSucceeds(setDoc(doc(firestore, 'vehicleRequests', 'purchase'), purchaseRequest('user-a', 'a@example.com')));
    await assertSucceeds(setDoc(doc(firestore, 'vehicleRequests', 'service'), {
        requestType: 'service',
        userId: 'user-a',
        userEmail: 'a@example.com',
        actionType: 'serviceBooking',
        vehicleName: 'Porsche 911 GT3',
        vehiclePrice: '',
        serviceType: 'OEM Diagnostics',
        preferredDate: '2027-01-30',
        fullName: 'A User',
        contactEmail: 'a@example.com',
        vehicleCategory: 'Supercar / Sports Car',
        status: 'new',
        createdAt: serverTimestamp()
    }));
    await assertSucceeds(setDoc(doc(firestore, 'vehicleRequests', 'tradein'), {
        requestType: 'tradeIn',
        userId: 'user-a',
        userEmail: 'a@example.com',
        actionType: 'tradeIn',
        vehicleName: 'Porsche 911',
        vehicleMileage: '15000',
        contactInfo: 'a@example.com',
        status: 'new',
        createdAt: serverTimestamp()
    }));
});

test('request creation rejects spoofed identity, fields, status, and timestamps', async () => {
    const context = testEnvironment.authenticatedContext('user-a', { email: 'a@example.com' });
    const firestore = context.firestore();
    const spoofedUser = purchaseRequest('user-b', 'a@example.com');
    const spoofedEmail = purchaseRequest('user-a', 'victim@example.com');
    const extraField = { ...purchaseRequest('user-a', 'a@example.com'), admin: true };
    const invalidStatus = { ...purchaseRequest('user-a', 'a@example.com'), status: 'approved' };
    const forgedTimestamp = { ...purchaseRequest('user-a', 'a@example.com'), createdAt: new Date('2020-01-01T00:00:00Z') };

    await assertFails(setDoc(doc(firestore, 'vehicleRequests', 'spoofed-user'), spoofedUser));
    await assertFails(setDoc(doc(firestore, 'vehicleRequests', 'spoofed-email'), spoofedEmail));
    await assertFails(setDoc(doc(firestore, 'vehicleRequests', 'extra-field'), extraField));
    await assertFails(setDoc(doc(firestore, 'vehicleRequests', 'invalid-status'), invalidStatus));
    await assertFails(setDoc(doc(firestore, 'vehicleRequests', 'forged-timestamp'), forgedTimestamp));
    await assertFails(setDoc(doc(testEnvironment.unauthenticatedContext().firestore(), 'vehicleRequests', 'anonymous'), purchaseRequest('user-a', 'a@example.com')));
});

test('request reads are owner/admin only and request updates are denied', async () => {
    await testEnvironment.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'vehicleRequests', 'private'), {
            ...purchaseRequest('user-a', 'a@example.com'),
            createdAt: new Date()
        });
    });

    const owner = testEnvironment.authenticatedContext('user-a', { email: 'a@example.com' }).firestore();
    const otherUser = testEnvironment.authenticatedContext('user-b', { email: 'b@example.com' }).firestore();
    const admin = testEnvironment.authenticatedContext('admin', { admin: true }).firestore();

    await assertSucceeds(getDoc(doc(owner, 'vehicleRequests', 'private')));
    await assertFails(getDoc(doc(otherUser, 'vehicleRequests', 'private')));
    await assertSucceeds(getDoc(doc(admin, 'vehicleRequests', 'private')));
    await assertFails(updateDoc(doc(owner, 'vehicleRequests', 'private'), { status: 'approved' }));
});

test('vehicle catalogue reads are public and admin inventory writes validate archive state', async () => {
    const inventory = {
        class: 'porsche',
        name: 'Porsche 911 GT3',
        price: '$230,500',
        desc: 'Track-focused sports car.',
        features: ['502 Horsepower'],
        order: 0
    };
    const anonymous = testEnvironment.unauthenticatedContext().firestore();
    const user = testEnvironment.authenticatedContext('user-a', { email: 'a@example.com' }).firestore();
    const admin = testEnvironment.authenticatedContext('admin', { admin: true }).firestore();

    await testEnvironment.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'vehicles', 'public-car'), inventory);
    });
    await assertSucceeds(getDoc(doc(anonymous, 'vehicles', 'public-car')));
    await assertFails(setDoc(doc(user, 'vehicles', 'user-car'), { ...inventory, order: 1 }));
    await assertSucceeds(setDoc(doc(admin, 'vehicles', 'admin-car'), { ...inventory, order: 1 }));
    await assertSucceeds(updateDoc(doc(admin, 'vehicles', 'admin-car'), { archived: true }));
    await assertFails(updateDoc(doc(admin, 'vehicles', 'admin-car'), { archived: 'yes' }));
    await assertFails(updateDoc(doc(admin, 'vehicles', 'admin-car'), { order: 2 }));
    await assertFails(setDoc(doc(admin, 'vehicles', 'bad-car'), { ...inventory, extra: true }));
});
