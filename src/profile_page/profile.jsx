import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebaseconfig.js';
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { getVehicleRequests, removeVehicleRequest } from '../services/vehicleRequests.js';
import { addVehicle, removeVehicle, restoreVehicle, subscribeToVehicles, updateVehicle, uploadVehicleImage } from '../services/vehicles.js';
import { EmptyState, ErrorState, LoadingButton, SuccessState, ValidationError, explainError, offlineError, useAsyncAction } from '../main/states.jsx';
import { validateVehicle } from '../main/validators.js';
import { loadSavedCatalogue, mergeSavedCatalogue } from '../collection_page/useVehicles.js';
import '../main/shared.css';
import './profile.css';

const defaultPreferences = { emailUpdates: true, serviceReminders: true, preferredContact: 'Email', compactView: false };
const emptyVehicle = { name: '', price: '', class: '', image: '', desc: '', features: [] };
const preferencesKey = (user) => `marcos-profile-preferences-${user.uid}`;

function PreferenceControls({ preferences, updatePreference, preferencesSaved }) {
    return (
        <section className="profile-panel">
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                    <h2 className="h4 mb-1">Preferences</h2>
                    <p className="text-muted small mb-0">These choices are saved in this browser.</p>
                </div>
                {preferencesSaved && <span className="preference-saved"><i className="fa fa-check me-1"></i>Saved</span>}
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="preference-control">
                        <input type="checkbox" checked={preferences.emailUpdates} onChange={(event) => updatePreference('emailUpdates', event.target.checked)} />
                        <span><strong>Showroom updates</strong><small>Receive new collection and booking updates.</small></span>
                    </label>
                </div>
                <div className="col-md-6">
                    <label className="preference-control">
                        <input type="checkbox" checked={preferences.serviceReminders} onChange={(event) => updatePreference('serviceReminders', event.target.checked)} />
                        <span><strong>Service reminders</strong><small>Keep maintenance and appointment reminders enabled.</small></span>
                    </label>
                </div>
                <div className="col-md-6">
                    <label className="form-label small text-uppercase text-warning fw-bold" htmlFor="preferred-contact">Preferred contact</label>
                    <select id="preferred-contact" className="form-select profile-input" value={preferences.preferredContact} onChange={(event) => updatePreference('preferredContact', event.target.value)}>
                        <option>Email</option>
                        <option>Phone</option>
                        <option>Either</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="preference-control">
                        <input type="checkbox" checked={preferences.compactView} onChange={(event) => updatePreference('compactView', event.target.checked)} />
                        <span><strong>Compact profile view</strong><small>Use tighter spacing for faster account scanning.</small></span>
                    </label>
                </div>
            </div>
        </section>
    );
}

function RequestList({ requests, loading, error, onRetry, isAdmin, onRemove, removeLoading, removingId }) {
    if (loading) return <p className="text-muted small">Loading requests...</p>;
    if (error) return <ErrorState compact error={error} onRetry={onRetry} />;
    if (!requests.length) {
        return (
            <EmptyState
                icon="fa-clipboard-list"
                title="No requests yet"
                message="When you book a vehicle, a test drive or a service, it shows up here."
                action={{ label: 'Browse the collection', to: '/collection' }}
            />
        );
    }

    return (
        <div className="vehicle-request-list">
            {requests.map((request) => (
                <div className="vehicle-request-row" key={request.id}>
                    <div>
                        <strong>
                            {request.requestType === 'service'
                                ? request.serviceType || 'Service appointment'
                                : request.requestType === 'tradeIn'
                                    ? 'Trade-in request'
                                    : request.vehicleName}
                        </strong>
                        <span>
                            {request.requestType === 'service'
                                ? `${request.vehicleName}${request.preferredDate ? ` · ${request.preferredDate}` : ''}`
                                : request.requestType === 'tradeIn'
                                    ? `${request.vehicleMileage ? `${request.vehicleMileage} miles · ` : ''}${request.contactInfo || ''}`
                                    : request.actionType === 'purchase' ? 'Purchase request' : 'Test-drive request'}
                            {isAdmin ? ` · ${request.userEmail}` : ''}
                        </span>
                    </div>
                    <div className="text-end">
                        <strong className="numeric-text">
                            {request.vehiclePrice || (request.requestType === 'tradeIn' ? 'Trade-in' : 'Service booking')}
                        </strong>
                        <span>{request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Pending timestamp'}</span>
                        {isAdmin && (
                            <button
                                className="btn btn-sm btn-outline-danger mt-2"
                                type="button"
                                disabled={removeLoading}
                                onClick={() => onRemove(request)}
                            >
                                {removeLoading && removingId === request.id ? 'Removing...' : 'Remove'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Profile({ user, isAdmin, isAuthReady, onOpenAuth, onLogout }) {
    const { hash } = useLocation();
    const [activeSection, setActiveSection] = useState('overview');
    const [adminTab, setAdminTab] = useState('inventory');
    const [displayName, setDisplayName] = useState('');
    const [profileActionKind, setProfileActionKind] = useState(null);
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [preferencesSaved, setPreferencesSaved] = useState(false);
    const [vehicleRequests, setVehicleRequests] = useState([]);
    const [requestsLoading, setRequestsLoading] = useState(true);
    const [requestsError, setRequestsError] = useState(null);
    const [requestsAttempt, setRequestsAttempt] = useState(0);
    const [vehicles, setVehicles] = useState([]);
    const [inventoryLoadError, setInventoryLoadError] = useState(null);
    const [inventoryLoading, setInventoryLoading] = useState(true);
    const [inventoryLoadAttempt, setInventoryLoadAttempt] = useState(0);
    const [vehicleForm, setVehicleForm] = useState(emptyVehicle);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [editVehicleForm, setEditVehicleForm] = useState(null);
    const [editConfirmation, setEditConfirmation] = useState(null);
    const [pendingDeletion, setPendingDeletion] = useState(null);
    const [undoToastVisible, setUndoToastVisible] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [addUploadLoading, setAddUploadLoading] = useState(false);
    const [addUploadError, setAddUploadError] = useState(null);
    const [editUploadLoading, setEditUploadLoading] = useState(false);
    const [editUploadError, setEditUploadError] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const profileAction = useAsyncAction({ context: 'profile' });
    const inventoryAction = useAsyncAction({ context: 'admin', successMs: 4000 });
    const removeAction = useAsyncAction({ context: 'admin', minLoadingMs: 300, successMs: 3000 });
    const profileRetry = useRef(null);
    const removeRetry = useRef(null);
    const editModalRef = useRef(null);
    const editConfirmationTimer = useRef(null);
    const pendingDeletionRef = useRef(null);
    const pendingDeletionTimer = useRef(null);
    const commitDeletionRef = useRef(null);

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        if (!user) return;
        try {
            setPreferences({ ...defaultPreferences, ...JSON.parse(localStorage.getItem(preferencesKey(user)) || '{}') });
        } catch {
            setPreferences(defaultPreferences);
        }
    }, [user]);

    useEffect(() => {
        if (hash === '#admin-panel' && isAdmin) setActiveSection('admin');
    }, [hash, isAdmin]);

    useEffect(() => {
        document.body.classList.toggle('profile-compact-view', preferences.compactView);
        document.body.dataset.contactPreference = preferences.preferredContact;
        return () => {
            document.body.classList.remove('profile-compact-view');
            delete document.body.dataset.contactPreference;
        };
    }, [preferences]);

    useEffect(() => {
        if (isAuthReady && !user) onOpenAuth?.();
    }, [isAuthReady, user, onOpenAuth]);

    useEffect(() => {
        if (!user) return undefined;
        let cancelled = false;
        setRequestsLoading(true);
        setRequestsError(null);
        getVehicleRequests(user, isAdmin)
            .then((requests) => {
                if (!cancelled) setVehicleRequests(requests);
            })
            .catch((loadError) => {
                console.error('Request loading error:', loadError);
                if (!cancelled) setRequestsError(explainError(loadError, 'requestLoad'));
            })
            .finally(() => {
                if (!cancelled) setRequestsLoading(false);
            });
        return () => { cancelled = true; };
    }, [user, isAdmin, requestsAttempt]);

    useEffect(() => {
        if (!isAdmin) {
            setInventoryLoading(false);
            return undefined;
        }

        let cancelled = false;
        let savedVehicles = [];
        let liveVehicles = [];
        let archivedIds = [];
        let savedLoaded = false;
        let snapshotReady = false;
        setInventoryLoading(true);
        setInventoryLoadError(null);

        const publishInventory = () => {
            if (cancelled || !savedLoaded || !snapshotReady) return;
            setVehicles(mergeSavedCatalogue(savedVehicles, liveVehicles, archivedIds));
            setInventoryLoading(false);
        };

        loadSavedCatalogue()
            .then((catalogue) => {
                if (cancelled) return;
                savedVehicles = catalogue;
                savedLoaded = true;
                publishInventory();
            })
            .catch((fallbackError) => {
                console.error('Fallback catalogue load failed:', fallbackError);
                if (!cancelled) {
                    setInventoryLoadError(explainError(fallbackError, 'load'));
                    setInventoryLoading(false);
                }
            });

        const unsubscribe = subscribeToVehicles(
            (nextVehicles, metadata) => {
                if (cancelled) return;
                if (nextVehicles.length === 0 && metadata?.fromCache && !metadata.archivedIds?.length) return;
                liveVehicles = nextVehicles;
                archivedIds = metadata?.archivedIds || [];
                snapshotReady = true;
                publishInventory();
            },
            (loadError) => {
                console.error('Inventory loading error:', loadError);
                if (!cancelled) {
                    snapshotReady = true;
                    if (savedLoaded) {
                        publishInventory();
                    } else {
                        loadSavedCatalogue()
                            .then((catalogue) => {
                                if (cancelled) return;
                                savedVehicles = catalogue;
                                savedLoaded = true;
                                publishInventory();
                            })
                            .catch((fallbackError) => {
                                console.error('Fallback catalogue load failed:', fallbackError);
                                if (!cancelled) {
                                    setInventoryLoadError(explainError(loadError || fallbackError, 'load'));
                                    setInventoryLoading(false);
                                }
                            });
                    }
                }
            }
        );

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [isAdmin, inventoryLoadAttempt]);

    useEffect(() => {
        return () => {
            window.clearTimeout(editConfirmationTimer.current);
            window.clearTimeout(pendingDeletionTimer.current);
            if (pendingDeletionRef.current) {
                commitDeletionRef.current?.(pendingDeletionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!editingVehicle) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        editModalRef.current?.querySelector('input')?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && !inventoryAction.loading) setEditingVehicle(null);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [editingVehicle, inventoryAction.loading]);

    if (!isAuthReady) {
        return (
            <main className="profile-page profile-loading d-flex align-items-center justify-content-center">
                <div className="text-center text-muted">
                    <div className="spinner-border text-warning mb-3" role="status" aria-label="Loading profile"></div>
                    <p className="mb-0">Loading your profile...</p>
                </div>
            </main>
        );
    }
    if (!user) return <Navigate to="/" replace state={{ openAuth: true }} />;

    const providerNames = user.providerData.map((provider) => (
        provider.providerId === 'password'
            ? 'Email and password'
            : provider.providerId.replace('.com', '').replace(/^./, (letter) => letter.toUpperCase())
    ));

    const updatePreference = (name, value) => {
        const next = { ...preferences, [name]: value };
        setPreferences(next);
        localStorage.setItem(preferencesKey(user), JSON.stringify(next));
        setPreferencesSaved(true);
        window.setTimeout(() => setPreferencesSaved(false), 2200);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setProfileActionKind('profile');
        profileRetry.current = async () => {
            await updateProfile(user, { displayName: displayName.trim() });
            return 'profile-updated';
        };
        await profileAction.run(profileRetry.current);
    };

    const handleResetPassword = async () => {
        setProfileActionKind('password');
        profileRetry.current = async () => {
            await sendPasswordResetEmail(auth, user.email);
            return 'password-reset';
        };
        await profileAction.run(profileRetry.current);
    };

    const handleSignOut = () => onLogout ? onLogout() : signOut(auth);

    const handleAddImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setAddUploadLoading(true);
        setAddUploadError(null);
        try {
            const url = await uploadVehicleImage(file);
            setVehicleForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            console.error('Image upload failed:', err);
            setAddUploadError(err.message || 'Image upload failed. You can paste a link instead.');
        } finally {
            setAddUploadLoading(false);
            event.target.value = '';
        }
    };

    const handleEditImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setEditUploadLoading(true);
        setEditUploadError(null);
        try {
            const url = await uploadVehicleImage(file);
            setEditVehicleForm((prev) => ({ ...prev, image: url }));
        } catch (err) {
            console.error('Image upload failed:', err);
            setEditUploadError(err.message || 'Image upload failed. You can paste a link instead.');
        } finally {
            setEditUploadLoading(false);
            event.target.value = '';
        }
    };

    const handleVehicleSubmit = async (event) => {
        event.preventDefault();
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            inventoryAction.fail(offlineError());
            return;
        }
        const problems = validateVehicle(vehicleForm);
        if (problems) {
            inventoryAction.fail(new ValidationError(problems));
            return;
        }

        const ok = await inventoryAction.run(async () => {
            await addVehicle({
                ...vehicleForm,
                desc: String(vehicleForm.desc || ''),
                features: Array.isArray(vehicleForm.features) ? vehicleForm.features : []
            });
            return 'added';
        });

        if (ok) {
            setVehicleForm(emptyVehicle);
            setAddUploadError(null);
        }
    };

    const handleEditVehicleSubmit = async (event) => {
        event.preventDefault();
        if (!editingVehicle || !editVehicleForm) return;
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            inventoryAction.fail(offlineError());
            return;
        }

        const colorImages = (editVehicleForm.colorImages || '')
            .split(/\r?\n/)
            .map((image) => image.trim())
            .filter(Boolean);
        const features = (editVehicleForm.features || '')
            .split(/\r?\n/)
            .map((feature) => feature.trim())
            .filter(Boolean);
        const problems = validateVehicle({
            ...editVehicleForm,
            colors: colorImages
        }) || {};
        if (editVehicleForm.desc.length > 2000) {
            problems.desc = 'Keep the description under 2,000 characters.';
        }
        if (features.length > 20) {
            problems.features = 'Add no more than 20 vehicle features.';
        }
        if (colorImages.length > 10) {
            problems.colorImages = 'Add no more than 10 color picture URLs.';
        }
        if (colorImages.some((image) => !/^https:\/\//i.test(image))) {
            problems.colorImages = 'Every color picture link must start with https://';
        }
        if (Object.keys(problems).length) {
            inventoryAction.fail(new ValidationError(problems));
            return;
        }

        const originalColorImage = editingVehicle.colors?.[0]?.img || '';
        const editedImage = editVehicleForm.image.trim();
        const mainImage = !editingVehicle.image && !editingVehicle.img
            && colorImages[0] && colorImages[0] !== originalColorImage
            ? colorImages[0]
            : editedImage;
        const updatedVehicle = {
            ...editingVehicle,
            name: editVehicleForm.name.trim(),
            price: editVehicleForm.price.trim(),
            class: editVehicleForm.class.trim(),
            desc: editVehicleForm.desc.trim(),
            features,
            image: mainImage
        };
        delete updatedVehicle.id;

        if (Array.isArray(editingVehicle.colors)) {
            updatedVehicle.colors = editingVehicle.colors.map((color, index) => ({
                ...color,
                img: colorImages[index] || color.img
            }));
        }

        const ok = await inventoryAction.run(async () => {
            await updateVehicle(editingVehicle.id, updatedVehicle);
            return 'updated';
        });

        if (ok) {
            window.clearTimeout(editConfirmationTimer.current);
            // Optimistically update list so the edited values reflect immediately
            setVehicles((current) => current.map((v) => v.id === editingVehicle.id ? { ...updatedVehicle, id: editingVehicle.id } : v));
            setEditingVehicle(null);
            setEditVehicleForm(null);
            setEditUploadError(null);
            setEditConfirmation({
                title: 'Vehicle updated',
                message: `${updatedVehicle.name} has been updated in the showroom inventory.`
            });
            editConfirmationTimer.current = window.setTimeout(() => setEditConfirmation(null), 5000);
        }
    };

    const editVehicle = (vehicle) => {
        inventoryAction.reset();
        window.clearTimeout(editConfirmationTimer.current);
        setEditConfirmation(null);
        setEditUploadError(null);
        setEditingVehicle(vehicle);
        setEditVehicleForm({
            name: vehicle.name || '',
            price: vehicle.price || '',
            class: vehicle.class || '',
            image: vehicle.image || vehicle.img || vehicle.colors?.[0]?.img || '',
            desc: vehicle.desc || '',
            features: Array.isArray(vehicle.features) ? vehicle.features.join('\n') : '',
            colorImages: Array.isArray(vehicle.colors)
                ? vehicle.colors.map((color) => color.img || '').join('\n')
                : ''
        });
    };

    const commitDeletion = async (deletion) => {
        if (!deletion) return;
        removeRetry.current = async () => {
            if (deletion.kind === 'vehicle') {
                await removeVehicle(deletion.item);
                setVehicles((current) => current.filter((vehicle) => vehicle.id !== deletion.item.id));
                return deletion.item.name;
            }

            await removeVehicleRequest(deletion.item.id);
            setVehicleRequests((current) => current.filter((request) => request.id !== deletion.item.id));
            return 'request';
        };
        setRemovingId(deletion.item.id);
        await removeAction.run(removeRetry.current);
        setRemovingId(null);
    };
    commitDeletionRef.current = commitDeletion;

    const stageDeletion = (kind, item) => {
        // If a previous deletion is pending, finalize it immediately before starting a new one
        if (pendingDeletionRef.current) {
            window.clearTimeout(pendingDeletionTimer.current);
            const prev = pendingDeletionRef.current;
            pendingDeletionRef.current = null;
            commitDeletion(prev);
        }

        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            removeAction.fail(offlineError());
            return;
        }

        removeAction.reset();
        const deletion = { kind, item };
        pendingDeletionRef.current = deletion;
        setPendingDeletion(deletion);
        setUndoToastVisible(true);
        pendingDeletionTimer.current = window.setTimeout(() => {
            if (pendingDeletionRef.current !== deletion) return;
            pendingDeletionRef.current = null;
            setPendingDeletion(null);
            setUndoToastVisible(false);
            commitDeletion(deletion);
        }, 7000);
    };

    const undoDeletion = () => {
        if (!pendingDeletionRef.current) return;
        const restoredName = pendingDeletionRef.current.kind === 'vehicle'
            ? pendingDeletionRef.current.item.name
            : 'Request';
        window.clearTimeout(pendingDeletionTimer.current);
        pendingDeletionRef.current = null;
        setPendingDeletion(null);
        setUndoToastVisible(false);
        removeAction.reset();
        setToastMessage(`${restoredName} restored.`);
        window.setTimeout(() => setToastMessage(''), 3000);
    };

    const dismissUndoToast = () => {
        if (pendingDeletionRef.current) {
            window.clearTimeout(pendingDeletionTimer.current);
            const deletion = pendingDeletionRef.current;
            pendingDeletionRef.current = null;
            setPendingDeletion(null);
            setUndoToastVisible(false);
            commitDeletion(deletion);
        } else {
            setUndoToastVisible(false);
        }
    };

    const handleRemoveVehicle = (vehicle) => stageDeletion('vehicle', vehicle);
    const handleRemoveRequest = (request) => stageDeletion('request', request);

    const retryRemove = () => {
        if (removeRetry.current) {
            setRemovingId('retry');
            removeAction.run(removeRetry.current).finally(() => setRemovingId(null));
        }
    };

    const navItems = [
        ['overview', 'Overview'],
        ['security', 'Account & Security'],
        ['preferences', 'Preferences'],
        ['vehicles', 'My Vehicles / Bookings'],
        ...(isAdmin ? [['admin', 'Admin']] : [])
    ];
    const invalidVehicleFields = inventoryAction.error?.fields || {};
    const visibleVehicles = pendingDeletion?.kind === 'vehicle'
        ? vehicles.filter((vehicle) => vehicle.id !== pendingDeletion.item.id)
        : vehicles;
    const visibleRequests = pendingDeletion?.kind === 'request'
        ? vehicleRequests.filter((request) => request.id !== pendingDeletion.item.id)
        : vehicleRequests;

    return (
        <>
        <main className="profile-page py-5">
            <div className="container profile-container">
                <div className="profile-heading mb-4">
                    <p className="profile-kicker mb-2">CLIENT PORTAL</p>
                    <h1 className="display-5 fw-bold mb-2">Your account</h1>
                    <p className="text-muted mb-0">Manage your showroom account, preferences, and activity.</p>
                </div>

                <div className="account-dashboard">
                    <aside className="account-sidebar" aria-label="Account sections">
                        <div className="profile-avatar mb-3">{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</div>
                        <strong className="sidebar-user-name">{user.displayName || 'Showroom member'}</strong>
                        <span className="sidebar-user-email">{user.email}</span>
                        <nav className="account-nav mt-4">
                            {navItems.map(([key, label]) => (
                                <button key={key} className={activeSection === key ? 'active' : ''} onClick={() => setActiveSection(key)}>
                                    {label}
                                </button>
                            ))}
                        </nav>
                        <button className="btn btn-outline-light btn-sm mt-4 w-100" type="button" onClick={handleSignOut}>
                            <i className="fa fa-right-from-bracket me-2"></i>Sign out
                        </button>
                    </aside>

                    <div className="account-content">
                        {activeSection === 'overview' && (
                            <section className="profile-panel">
                                <p className="profile-kicker mb-2">ACCOUNT OVERVIEW</p>
                                <h2 className="h4 mb-1">Welcome back, {user.displayName || 'member'}</h2>
                                <p className="text-muted small mb-4">Your Marcos Premium account is ready for bookings, saved vehicles, and service requests.</p>
                                <div className="overview-stats">
                                    <div><strong>{vehicleRequests.length}</strong><span>Vehicle requests</span></div>
                                    <div><strong>{preferences.emailUpdates ? 'On' : 'Off'}</strong><span>Showroom updates</span></div>
                                    <div><strong>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Current'}</strong><span>Member since</span></div>
                                </div>
                            </section>
                        )}

                        {activeSection === 'security' && (
                            <section className="profile-panel">
                                <h2 className="h4 mb-1">Account & Security</h2>
                                <p className="text-muted small mb-4">Keep your identity and account access current.</p>
                                {profileAction.status === 'error' && (
                                    <ErrorState compact error={profileAction.error} onRetry={() => profileRetry.current && profileAction.run(profileRetry.current)} onDismiss={profileAction.reset} />
                                )}
                                {profileAction.status === 'success' && (
                                    <SuccessState
                                        compact
                                        title={profileActionKind === 'profile' ? 'Profile updated' : 'Password reset email sent'}
                                        message={profileActionKind === 'profile' ? 'Your profile has been updated.' : `Password reset instructions were sent to ${user.email}.`}
                                    />
                                )}
                                <form onSubmit={handleSave}>
                                    <label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-name">Display name</label>
                                    <input
                                        id="profile-name"
                                        className="form-control profile-input mb-3"
                                        value={displayName}
                                        onChange={(event) => {
                                            setDisplayName(event.target.value);
                                            setProfileActionKind(null);
                                            profileAction.reset();
                                        }}
                                        maxLength={60}
                                        placeholder="Add your name"
                                    />
                                    <label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-email">Email address</label>
                                    <input id="profile-email" className="form-control profile-input mb-1" value={user.email || ''} readOnly />
                                    <p className="text-muted small mb-4">Sign-in method: {providerNames.join(', ') || 'Account provider'}</p>
                                    <LoadingButton
                                        className="btn profile-primary px-4"
                                        type="submit"
                                        loading={profileAction.loading}
                                        loadingText="Saving..."
                                    >
                                        Save changes
                                    </LoadingButton>
                                </form>
                                {user.providerData.some((provider) => provider.providerId === 'password') && (
                                    <LoadingButton
                                        className="btn btn-outline-warning mt-4"
                                        type="button"
                                        loading={profileAction.loading && profileActionKind === 'password'}
                                        loadingText="Sending..."
                                        disabled={profileAction.loading}
                                        onClick={handleResetPassword}
                                    >
                                        <i className="fa fa-key me-2"></i>Reset password
                                    </LoadingButton>
                                )}
                            </section>
                        )}

                        {activeSection === 'preferences' && (
                            <PreferenceControls
                                preferences={preferences}
                                updatePreference={updatePreference}
                                preferencesSaved={preferencesSaved}
                            />
                        )}

                        {activeSection === 'vehicles' && (
                            <section className="profile-panel">
                                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                                    <div>
                                        <h2 className="h4 mb-1">{isAdmin ? 'Service bookings' : 'My vehicles & bookings'}</h2>
                                        <p className="text-muted small mb-0">
                                            {isAdmin ? 'Review purchase and test-drive requests from showroom users.' : 'Track the vehicle requests you have submitted.'}
                                        </p>
                                    </div>
                                    {!requestsLoading && <span className="profile-kicker">{vehicleRequests.length} REQUESTS</span>}
                                </div>
                                {isAdmin && removeAction.status === 'error' && (
                                    <ErrorState compact error={removeAction.error} onRetry={retryRemove} onDismiss={removeAction.reset} />
                                )}
                                {isAdmin && removeAction.status === 'success' && (
                                    <SuccessState compact title="Removed" message={removeAction.data === 'request' ? 'The request was removed.' : 'The vehicle was removed.'} />
                                )}
                                <RequestList
                                    requests={visibleRequests}
                                    loading={requestsLoading}
                                    error={requestsError}
                                    onRetry={() => setRequestsAttempt((attempt) => attempt + 1)}
                                    isAdmin={isAdmin}
                                    onRemove={handleRemoveRequest}
                                    removeLoading={removeAction.loading || Boolean(pendingDeletion)}
                                    removingId={removingId}
                                />
                            </section>
                        )}

                        {activeSection === 'admin' && isAdmin && (
                            <section className="profile-panel admin-panel">
                                <div className="admin-badge mb-2"><i className="fa fa-shield-halved me-2"></i>ADMIN ACCESS VERIFIED</div>
                                <h2 className="h4 mb-1">Operations dashboard</h2>
                                <p className="text-muted small mb-4">Manage inventory, monitor showroom activity, and review service operations.</p>

                                {inventoryAction.status === 'error' && !editingVehicle && (
                                    <ErrorState
                                        compact
                                        error={inventoryAction.error}
                                        onDismiss={inventoryAction.reset}
                                        onRetry={() => document.getElementById('vehicle-form')?.requestSubmit()}
                                    />
                                )}
                                {inventoryAction.status === 'success' && inventoryAction.data === 'added' && (
                                    <SuccessState
                                        compact
                                        title="Vehicle added"
                                        message="The change is live on the Collection page."
                                    />
                                )}
                                <div className="admin-tabs mb-4">
                                    {[
                                        ['inventory', 'Inventory'],
                                        ['stats', 'Site stats'],
                                        ['bookings', 'Bookings']
                                    ].map(([key, label]) => (
                                        <button key={key} className={adminTab === key ? 'active' : ''} onClick={() => setAdminTab(key)}>
                                            {label}
                                        </button>
                                    ))}
                                </div>

                                {adminTab === 'inventory' && (
                                    <div>
                                        <div className="admin-summary mb-4">
                                            <strong>{visibleVehicles.length}</strong>
                                            <span>Cars in inventory</span>
                                        </div>
                                        {inventoryLoadError && (
                                            <ErrorState
                                                compact
                                                error={inventoryLoadError}
                                                onRetry={() => setInventoryLoadAttempt((attempt) => attempt + 1)}
                                            />
                                        )}
                                        {!inventoryLoading && !inventoryLoadError && visibleVehicles.length === 0 && (
                                            <div className="alert alert-info py-2">
                                                No Firestore inventory records found. Run <code>npm run seed:vehicles</code> once to import the 134 showroom cars.
                                            </div>
                                        )}
                                        <form id="vehicle-form" className="inventory-form" onSubmit={handleVehicleSubmit} noValidate>
                                            <h3 className="h5">Add vehicle</h3>
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <input
                                                        className={`form-control profile-input${invalidVehicleFields.name ? ' is-invalid' : ''}`}
                                                        placeholder="Vehicle name"
                                                        value={vehicleForm.name}
                                                        onChange={(event) => {
                                                            setVehicleForm({ ...vehicleForm, name: event.target.value });
                                                            if (inventoryAction.status === 'error') inventoryAction.reset();
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        className={`form-control profile-input${invalidVehicleFields.price ? ' is-invalid' : ''}`}
                                                        placeholder="Price"
                                                        value={vehicleForm.price}
                                                        onChange={(event) => {
                                                            setVehicleForm({ ...vehicleForm, price: event.target.value });
                                                            if (inventoryAction.status === 'error') inventoryAction.reset();
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        className={`form-control profile-input${invalidVehicleFields.class ? ' is-invalid' : ''}`}
                                                        placeholder="Class / brand"
                                                        value={vehicleForm.class}
                                                        onChange={(event) => {
                                                            setVehicleForm({ ...vehicleForm, class: event.target.value });
                                                            if (inventoryAction.status === 'error') inventoryAction.reset();
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-group">
                                                        <input
                                                            className={`form-control profile-input${invalidVehicleFields.image ? ' is-invalid' : ''}`}
                                                            placeholder="Image URL or upload from device"
                                                            value={vehicleForm.image}
                                                            onChange={(event) => {
                                                                setVehicleForm({ ...vehicleForm, image: event.target.value });
                                                                if (inventoryAction.status === 'error') inventoryAction.reset();
                                                            }}
                                                        />
                                                        <label
                                                            className={`btn btn-outline-secondary d-flex align-items-center gap-2 mb-0 ${addUploadLoading ? 'disabled' : ''}`}
                                                            style={{ cursor: addUploadLoading ? 'not-allowed' : 'pointer', borderLeft: 'none' }}
                                                        >
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="d-none"
                                                                disabled={addUploadLoading}
                                                                onChange={handleAddImageUpload}
                                                            />
                                                            {addUploadLoading ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                                    <span>Uploading...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fa fa-arrow-up-from-bracket" />
                                                                    <span>Upload image</span>
                                                                </>
                                                            )}
                                                        </label>
                                                    </div>
                                                    {addUploadError && (
                                                        <small className="text-danger d-block mt-1">{addUploadError}</small>
                                                    )}
                                                    {vehicleForm.image && (
                                                        <div className="d-flex align-items-center gap-2 mt-2 p-2 rounded" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', maxWidth: '340px' }}>
                                                            <img
                                                                src={vehicleForm.image}
                                                                alt="Preview"
                                                                style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                            />
                                                            <span className="text-truncate flex-grow-1" style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
                                                                {vehicleForm.image}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-link text-danger p-0"
                                                                onClick={() => setVehicleForm((prev) => ({ ...prev, image: '' }))}
                                                                title="Clear image"
                                                            >
                                                                <i className="fa fa-xmark" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2 mt-3">
                                                <LoadingButton
                                                    className="btn profile-primary"
                                                    type="submit"
                                                    loading={inventoryAction.loading}
                                                    loadingText="Saving..."
                                                >
                                                    Add vehicle
                                                </LoadingButton>
                                            </div>
                                        </form>

                                        {removeAction.status === 'error' && (
                                            <ErrorState compact error={removeAction.error} onRetry={retryRemove} onDismiss={removeAction.reset} />
                                        )}
                                        {removeAction.status === 'success' && (
                                            <SuccessState compact title="Removed" message="The inventory item was removed." />
                                        )}
                                        <div className="inventory-list mt-4">
                                            {visibleVehicles.map((vehicle) => (
                                                <div className="inventory-row" key={vehicle.id}>
                                                    <div><strong>{vehicle.name}</strong><span>{vehicle.class} · {vehicle.price}</span></div>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-sm btn-outline-warning" type="button" onClick={() => editVehicle(vehicle)}>Edit</button>
                                                        <button className="btn btn-sm btn-outline-danger" type="button" disabled={removeAction.loading || Boolean(pendingDeletion)} onClick={() => handleRemoveVehicle(vehicle)}>
                                                            {removeAction.loading && removingId === vehicle.id ? 'Removing...' : 'Remove'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {adminTab === 'stats' && (
                                    <div className="overview-stats">
                                        <div><strong>{vehicles.length}</strong><span>Total vehicles in Firestore</span></div>
                                        <div><strong>Unavailable</strong><span>Registered users</span></div>
                                        <div><strong>{vehicleRequests.length}</strong><span>Service bookings</span></div>
                                    </div>
                                )}

                                {adminTab === 'bookings' && (
                                    <>
                                        {removeAction.status === 'error' && (
                                            <ErrorState compact error={removeAction.error} onRetry={retryRemove} onDismiss={removeAction.reset} />
                                        )}
                                        {removeAction.status === 'success' && (
                                            <SuccessState compact title="Removed" message="The request was removed." />
                                        )}
                                        <RequestList
                                            requests={visibleRequests}
                                            loading={requestsLoading}
                                            error={requestsError}
                                            onRetry={() => setRequestsAttempt((attempt) => attempt + 1)}
                                            isAdmin
                                            onRemove={handleRemoveRequest}
                                            removeLoading={removeAction.loading || Boolean(pendingDeletion)}
                                            removingId={removingId}
                                        />
                                    </>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </main>
        {editingVehicle && editVehicleForm && createPortal(
            <div
                className="vehicle-edit-backdrop"
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget && !inventoryAction.loading) setEditingVehicle(null);
                }}
            >
                <section
                    className="vehicle-edit-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="vehicle-edit-title"
                    ref={editModalRef}
                >
                    <header className="vehicle-edit-header">
                        <div>
                            <span className="profile-kicker">INVENTORY EDITOR</span>
                            <h2 id="vehicle-edit-title" className="h4 mb-0">Edit {editingVehicle.name}</h2>
                        </div>
                        <button
                            type="button"
                            className="vehicle-edit-close"
                            aria-label="Close vehicle editor"
                            disabled={inventoryAction.loading}
                            onClick={() => setEditingVehicle(null)}
                        >
                            <i className="fa fa-xmark" />
                        </button>
                    </header>

                    <form id="edit-vehicle-form" onSubmit={handleEditVehicleSubmit} noValidate>
                        {inventoryAction.status === 'error' && (
                            <ErrorState
                                compact
                                error={inventoryAction.error}
                                onDismiss={inventoryAction.reset}
                                onRetry={() => document.getElementById('edit-vehicle-form')?.requestSubmit()}
                            />
                        )}
                        <div className="vehicle-edit-fields">
                            <label>
                                <span>Vehicle name</span>
                                <input
                                    autoFocus
                                    className={`form-control profile-input${invalidVehicleFields.name ? ' is-invalid' : ''}`}
                                    value={editVehicleForm.name}
                                    onChange={(event) => {
                                        setEditVehicleForm({ ...editVehicleForm, name: event.target.value });
                                        if (inventoryAction.status === 'error') inventoryAction.reset();
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                <span>Price</span>
                                <input
                                    className={`form-control profile-input${invalidVehicleFields.price ? ' is-invalid' : ''}`}
                                    value={editVehicleForm.price}
                                    onChange={(event) => {
                                        setEditVehicleForm({ ...editVehicleForm, price: event.target.value });
                                        if (inventoryAction.status === 'error') inventoryAction.reset();
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                <span>Class / brand</span>
                                <input
                                    className={`form-control profile-input${invalidVehicleFields.class ? ' is-invalid' : ''}`}
                                    value={editVehicleForm.class}
                                    onChange={(event) => {
                                        setEditVehicleForm({ ...editVehicleForm, class: event.target.value });
                                        if (inventoryAction.status === 'error') inventoryAction.reset();
                                    }}
                                    required
                                />
                            </label>
                            <div className="vehicle-edit-full">
                                <label className="w-100 mb-1">
                                    <span>Main picture</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="url"
                                        className={`form-control profile-input${invalidVehicleFields.image ? ' is-invalid' : ''}`}
                                        value={editVehicleForm.image}
                                        onChange={(event) => {
                                            setEditVehicleForm({ ...editVehicleForm, image: event.target.value });
                                            if (inventoryAction.status === 'error') inventoryAction.reset();
                                        }}
                                        placeholder="Paste image URL (https://...) or upload"
                                    />
                                    <label
                                        className={`btn btn-outline-secondary d-flex align-items-center gap-2 mb-0 ${editUploadLoading ? 'disabled' : ''}`}
                                        style={{ cursor: editUploadLoading ? 'not-allowed' : 'pointer', borderLeft: 'none' }}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="d-none"
                                            disabled={editUploadLoading}
                                            onChange={handleEditImageUpload}
                                        />
                                        {editUploadLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                <span>Uploading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa fa-arrow-up-from-bracket" />
                                                <span>Upload image</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                {editUploadError && (
                                    <small className="text-danger d-block mt-1">{editUploadError}</small>
                                )}
                            </div>
                            {editVehicleForm.image && (
                                <div className="vehicle-edit-preview vehicle-edit-full position-relative">
                                    <img src={editVehicleForm.image} alt={`${editVehicleForm.name} preview`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-dark position-absolute top-0 end-0 m-2 rounded-circle"
                                        style={{ width: '28px', height: '28px', padding: 0, lineHeight: 1, background: 'rgba(0,0,0,0.7)', border: '1px solid var(--line)' }}
                                        onClick={() => setEditVehicleForm((prev) => ({ ...prev, image: '' }))}
                                        title="Clear image"
                                    >
                                        <i className="fa fa-xmark" />
                                    </button>
                                </div>
                            )}
                            <label className="vehicle-edit-full">
                                <span>Description</span>
                                <textarea
                                    className="form-control profile-input"
                                    rows="3"
                                    maxLength="2000"
                                    value={editVehicleForm.desc}
                                    onChange={(event) => setEditVehicleForm({ ...editVehicleForm, desc: event.target.value })}
                                />
                            </label>
                            <label className="vehicle-edit-full">
                                <span>Features (one per line)</span>
                                <textarea
                                    className="form-control profile-input"
                                    rows="4"
                                    value={editVehicleForm.features}
                                    onChange={(event) => setEditVehicleForm({ ...editVehicleForm, features: event.target.value })}
                                />
                            </label>
                            <label className="vehicle-edit-full">
                                <span>Picture URLs by color (one per line)</span>
                                <textarea
                                    className="form-control profile-input"
                                    rows="3"
                                    value={editVehicleForm.colorImages}
                                    onChange={(event) => setEditVehicleForm({ ...editVehicleForm, colorImages: event.target.value })}
                                    placeholder="https://..."
                                />
                            </label>
                        </div>
                        <footer className="vehicle-edit-actions">
                            <button
                                type="button"
                                className="btn btn-brand-ghost"
                                disabled={inventoryAction.loading}
                                onClick={() => setEditingVehicle(null)}
                            >
                                Cancel
                            </button>
                            <LoadingButton
                                className="btn btn-brand"
                                type="submit"
                                loading={inventoryAction.loading}
                                loadingText="Saving..."
                            >
                                Done
                            </LoadingButton>
                        </footer>
                    </form>
                </section>
            </div>,
            document.body
        )}
        {editConfirmation && createPortal(
            <div className="edit-confirmation-backdrop" role="presentation">
                <section className="edit-confirmation-window" role="status" aria-live="polite">
                    <svg className="state-tick" viewBox="0 0 52 52" aria-hidden="true">
                        <circle className="state-tick__circle" cx="26" cy="26" r="24" fill="none" />
                        <path className="state-tick__check" fill="none" d="M14 27l8 8 16-17" />
                    </svg>
                    <h2>{editConfirmation.title}</h2>
                    <p>{editConfirmation.message}</p>
                    <div className="edit-confirmation-countdown" aria-label="This confirmation closes in 7 seconds">
                        <span />
                    </div>
                </section>
            </div>,
            document.body
        )}
        {undoToastVisible && pendingDeletion && createPortal(
            <section className="admin-undo-toast" role="status" aria-live="polite">
                <span>
                    {pendingDeletion.kind === 'vehicle'
                        ? `${pendingDeletion.item.name} removed`
                        : 'Request removed'}
                </span>
                <button type="button" className="admin-undo-action" onClick={undoDeletion}>Undo</button>
                <button
                    type="button"
                    className="admin-undo-dismiss"
                    aria-label="Dismiss undo notification"
                    onClick={dismissUndoToast}
                >
                    <i className="fa fa-xmark" />
                </button>
                <div className="admin-undo-countdown" aria-hidden="true"><span /></div>
            </section>,
            document.body
        )}
        {toastMessage && createPortal(
            <section className="admin-restored-toast" role="status" aria-live="polite">
                <i className="fa fa-check text-success" />
                <span>{toastMessage}</span>
            </section>,
            document.body
        )}
        </>
    );
}
