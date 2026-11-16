import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseconfig.js';

const vehiclesCollection = collection(db, 'vehicles');

export async function uploadVehicleImage(file) {
    if (!file) throw new Error("No file selected");
    if (!file.type || !file.type.startsWith('image/')) {
        throw new Error("Only image files (JPEG, PNG, WebP, AVIF) are allowed.");
    }
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageRef = ref(storage, `vehicles/${Date.now()}_${cleanName}`);
    await uploadBytes(storageRef, file, { contentType: file.type });
    return await getDownloadURL(storageRef);
}

export function subscribeToVehicles(onChange, onError) {
    return onSnapshot(
        query(vehiclesCollection, orderBy('order')),
        { includeMetadataChanges: true },
        (snapshot) => {
            const archivedIds = snapshot.docs
                .filter((vehicleDocument) => vehicleDocument.data().archived === true)
                .map((vehicleDocument) => vehicleDocument.id);
            onChange(
                snapshot.docs
                    .filter((vehicleDocument) => vehicleDocument.data().archived !== true)
                    .map((vehicleDocument) => ({
                        ...vehicleDocument.data(),
                        id: vehicleDocument.id
                    })),
                { fromCache: snapshot.metadata.fromCache, archivedIds }
            );
        },
        onError
    );
}

export async function addVehicle(vehicle) {
    const { id, ...vehicleData } = vehicle;
    return addDoc(vehiclesCollection, { ...vehicleData, order: Date.now() });
}

export async function updateVehicle(id, vehicle) {
    const { id: ignoredId, ...vehicleData } = vehicle;
    const vehicleRef = doc(db, 'vehicles', id);
    let order = vehicleData.order;
    if (typeof order !== 'number') {
        try {
            const existing = await getDoc(vehicleRef);
            if (existing.exists() && typeof existing.data().order === 'number') {
                order = existing.data().order;
            } else {
                order = Date.now();
            }
        } catch {
            order = Date.now();
        }
    }
    return setDoc(vehicleRef, {
        ...vehicleData,
        order
    });
}

export async function removeVehicle(vehicle) {
    const { id, ...vehicleData } = vehicle;
    return setDoc(doc(db, 'vehicles', id), {
        ...vehicleData,
        order: vehicleData.order ?? Date.now(),
        archived: true
    });
}

export async function restoreVehicle(vehicle) {
    const { id, ...vehicleData } = vehicle;
    return setDoc(doc(db, 'vehicles', id), {
        ...vehicleData,
        order: vehicleData.order ?? Date.now(),
        archived: false
    });
}
