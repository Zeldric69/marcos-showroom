import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    where
} from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig.js';

const requestsCollection = collection(db, 'vehicleRequests');

export async function createVehicleRequest({ user, actionType, vehicle }) {
    if (!user) {
        throw new Error('Please sign in before submitting a vehicle request.');
    }

    return addDoc(requestsCollection, {
        userId: user.uid,
        userEmail: user.email || '',
        actionType,
        vehicleId: vehicle.id || '',
        vehicleName: vehicle.name,
        vehiclePrice: vehicle.price,
        status: 'new',
        createdAt: serverTimestamp()
    });
}

export async function createServiceBooking({ user, serviceType, carModel, preferredDate, fullName, contactEmail, vehicleCategory }) {
    if (!user) {
        throw new Error('Please sign in before submitting a service booking.');
    }

    return addDoc(requestsCollection, {
        requestType: 'service',
        userId: user.uid,
        userEmail: user.email || '',
        fullName,
        contactEmail,
        vehicleCategory,
        actionType: 'serviceBooking',
        vehicleName: carModel || 'Service appointment',
        vehiclePrice: '',
        serviceType,
        preferredDate,
        status: 'new',
        createdAt: serverTimestamp()
    });
}

export async function createTradeInRequest({ user, vehicleName, vehicleMileage, contactInfo }) {
    if (!user) {
        throw new Error('Please sign in before submitting a trade-in request.');
    }

    return addDoc(requestsCollection, {
        requestType: 'tradeIn',
        userId: user.uid,
        userEmail: user.email || '',
        actionType: 'tradeIn',
        vehicleName,
        vehicleMileage,
        contactInfo,
        status: 'new',
        createdAt: serverTimestamp()
    });
}

export async function removeVehicleRequest(requestId) {
    return deleteDoc(doc(db, 'vehicleRequests', requestId));
}

export async function getVehicleRequests(user, isAdmin) {
    if (!user) return [];

    const requestQuery = isAdmin
        ? query(requestsCollection)
        : query(requestsCollection, where('userId', '==', user.uid));
    const snapshot = await getDocs(requestQuery);

    return snapshot.docs
        .map((document) => ({ id: document.id, ...document.data() }))
        .sort((first, second) => {
            const firstTime = first.createdAt?.toMillis?.() || 0;
            const secondTime = second.createdAt?.toMillis?.() || 0;
            return secondTime - firstTime;
        });
}
