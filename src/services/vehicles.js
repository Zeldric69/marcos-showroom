import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig.js';

const vehiclesCollection = collection(db, 'vehicles');

export function subscribeToVehicles(onChange, onError) {
    return onSnapshot(query(vehiclesCollection, orderBy('name')), (snapshot) => {
        onChange(snapshot.docs.map((vehicleDocument) => ({
            id: vehicleDocument.id,
            ...vehicleDocument.data()
        })));
    }, onError);
}

export async function addVehicle(vehicle) {
    const { id, ...vehicleData } = vehicle;
    return addDoc(vehiclesCollection, vehicleData);
}

export async function updateVehicle(id, vehicle) {
    const { id: ignoredId, ...vehicleData } = vehicle;
    return updateDoc(doc(db, 'vehicles', id), vehicleData);
}

export async function removeVehicle(id) {
    return deleteDoc(doc(db, 'vehicles', id));
}
