import { useEffect, useState } from 'react';
import { subscribeToVehicles } from '../services/vehicles.js';
import { explainError } from '../main/states.jsx';
import { vehicleShowroomDatabase } from './carDashboard.js';

const initialSavedVehicles = Object.entries(vehicleShowroomDatabase).map(([id, data]) => ({ id, ...data }));

export async function loadSavedCatalogue() {
    return initialSavedVehicles;
}

export function mergeSavedCatalogue(savedVehicles, liveVehicles, archivedIds = []) {
    const archived = new Set(archivedIds);
    const vehiclesById = new Map(
        savedVehicles
            .filter((vehicle) => !archived.has(vehicle.id))
            .map((vehicle) => [vehicle.id, vehicle])
    );

    liveVehicles.forEach((vehicle) => vehiclesById.set(vehicle.id, vehicle));
    return [...vehiclesById.values()];
}

export function useVehicles({ slowMs = 6000 } = {}) {
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState({ vehicles: initialSavedVehicles, status: 'saved', error: null });

    useEffect(() => {
        let active = true;
        let savedVehicles = initialSavedVehicles;
        let savedLoaded = true;
        let liveVehicles = [];
        let archivedIds = [];
        let snapshotReady = false;

        const publishInventory = () => {
            if (!active) return;
            const vehicles = mergeSavedCatalogue(savedVehicles, liveVehicles, archivedIds);
            const hasSavedOnlyVehicles = vehicles.length > liveVehicles.length;
            setState({
                vehicles,
                status: liveVehicles.length && !hasSavedOnlyVehicles ? 'live' : vehicles.length ? 'saved' : 'empty',
                error: null
            });
        };

        const slowTimer = setTimeout(() => {
            if (!active || snapshotReady) return;
            const vehicles = mergeSavedCatalogue(savedVehicles, liveVehicles, archivedIds);
            setState({ vehicles, status: vehicles.length ? 'saved' : 'empty', error: null });
        }, slowMs);

        let unsubscribe = () => {};
        try {
            unsubscribe = subscribeToVehicles(
                (live, metadata) => {
                    if (!active) return;
                    if (live.length === 0 && metadata?.fromCache && !metadata.archivedIds?.length) return;
                    liveVehicles = live;
                    archivedIds = metadata?.archivedIds || [];
                    snapshotReady = true;
                    clearTimeout(slowTimer);
                    publishInventory();
                },
                (error) => {
                    if (!active) return;
                    clearTimeout(slowTimer);
                    console.warn('Live inventory fallback active:', error);
                    snapshotReady = true;
                    publishInventory();
                }
            );
        } catch (subError) {
            console.warn('Live inventory subscribe failed, using saved catalogue:', subError);
        }

        return () => {
            active = false;
            clearTimeout(slowTimer);
            if (typeof unsubscribe === 'function') unsubscribe();
        };
    }, [attempt, slowMs]);

    return { ...state, retry: () => setAttempt((currentAttempt) => currentAttempt + 1) };
}
