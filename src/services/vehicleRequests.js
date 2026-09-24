import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
    where
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebaseconfig.js';

const db = getFirestore(app);
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
