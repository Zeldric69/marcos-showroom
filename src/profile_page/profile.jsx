import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseconfig.js';
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { getVehicleRequests } from '../services/vehicleRequests.js';
import './profile.css';

function authMessage(error) {
    const messages = {
        'auth/invalid-profile-attribute': 'That profile name is not valid.',
        'auth/requires-recent-login': 'Please sign in again before changing this setting.',
        'auth/too-many-requests': 'Too many attempts. Please wait and try again.'
    };
    return messages[error.code] || 'We could not update your profile. Please try again.';
}

const defaultPreferences = {
    emailUpdates: true,
    serviceReminders: true,
    preferredContact: 'Email',
    compactView: false
};

function preferencesKey(user) {
    return `marcos-profile-preferences-${user.uid}`;
}

export default function Profile({ user, isAdmin, isAuthReady, onOpenAuth, onLogout }) {
    const [displayName, setDisplayName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [preferencesSaved, setPreferencesSaved] = useState(false);
    const [vehicleRequests, setVehicleRequests] = useState([]);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [requestsError, setRequestsError] = useState('');

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        if (user) {
            try {
                const saved = JSON.parse(localStorage.getItem(preferencesKey(user)) || '{}');
                setPreferences({ ...defaultPreferences, ...saved });
            } catch {
                setPreferences(defaultPreferences);
            }
        }
    }, [user]);

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

        let isCancelled = false;
        setRequestsLoading(true);
        setRequestsError('');
        getVehicleRequests(user, isAdmin)
            .then((requests) => {
                if (!isCancelled) setVehicleRequests(requests);
            })
            .catch((loadError) => {
                console.error('Vehicle request loading error:', loadError);
                if (!isCancelled) setRequestsError('Vehicle requests are unavailable until the showroom database is enabled.');
            })
            .finally(() => {
                if (!isCancelled) setRequestsLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [user, isAdmin]);

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

    if (!user) {
        return <Navigate to="/" replace state={{ openAuth: true }} />;
    }

    const providerNames = user.providerData.map((provider) => {
        if (provider.providerId === 'password') return 'Email and password';
        return provider.providerId.replace('.com', '').replace(/^./, (letter) => letter.toUpperCase());
    });

    const handleSave = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setIsSaving(true);
        try {
            await updateProfile(user, { displayName: displayName.trim() });
            setMessage('Your profile has been updated.');
        } catch (saveError) {
            setError(authMessage(saveError));
        } finally {
            setIsSaving(false);
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setMessage('');
        try {
            await sendPasswordResetEmail(auth, user.email);
            setMessage(`Password reset instructions were sent to ${user.email}.`);
        } catch (resetError) {
            setError(authMessage(resetError));
        }
    };

    const updatePreference = (name, value) => {
        const nextPreferences = { ...preferences, [name]: value };
        setPreferences(nextPreferences);
        localStorage.setItem(preferencesKey(user), JSON.stringify(nextPreferences));
        setPreferencesSaved(true);
        window.setTimeout(() => setPreferencesSaved(false), 2200);
    };

    const handleSignOut = async () => {
        if (onLogout) {
            await onLogout();
        } else {
            await signOut(auth);
        }
    };

    return (
        <main className="profile-page py-5">
            <div className="container profile-container">
                <div className="profile-heading mb-4">
                    <p className="profile-kicker mb-2">CLIENT PORTAL</p>
                    <h1 className="display-5 fw-bold mb-2">Your profile</h1>
                    <p className="text-muted mb-0">Manage your showroom account and access preferences.</p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-7">
                        <section className="profile-panel h-100">
                            <div className="profile-avatar mb-3">{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</div>
                            <h2 className="h4 mb-1">Account details</h2>
                            <p className="text-muted small mb-4">Keep your contact details current for bookings and service updates.</p>

                            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
                            {message && <div className="alert alert-success py-2" role="status">{message}</div>}

                            <form onSubmit={handleSave}>
                                <label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-name">Display name</label>
                                <input id="profile-name" className="form-control profile-input mb-3" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} placeholder="Add your name" />

                                <label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-email">Email address</label>
                                <input id="profile-email" className="form-control profile-input mb-1" value={user.email || ''} readOnly />
                                <p className="text-muted small mb-4">Your email is managed by your sign-in provider.</p>

                                <button className="btn profile-primary px-4" type="submit" disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save changes'}
                                </button>
                            </form>
                        </section>
                    </div>

                    <div className="col-lg-5">
                        <section className="profile-panel h-100">
                            <h2 className="h4 mb-1">Account access</h2>
                            <p className="text-muted small mb-4">Your account is ready for bookings, saved vehicles, and service requests.</p>
                            <div className="profile-detail-row"><span>Member since</span><strong>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Current'}</strong></div>
                            <div className="profile-detail-row"><span>Sign-in method</span><strong>{providerNames.join(', ') || 'Account provider'}</strong></div>
                            <div className="profile-detail-row"><span>Preferred contact</span><strong>{preferences.preferredContact}</strong></div>
                            <div className="profile-detail-row"><span>Showroom updates</span><strong>{preferences.emailUpdates ? 'On' : 'Off'}</strong></div>
                            <div className="d-grid gap-2 mt-4">
                                {user.providerData.some((provider) => provider.providerId === 'password') && <button className="btn btn-outline-warning" type="button" onClick={handleResetPassword}><i className="fa fa-key me-2"></i>Reset password</button>}
                                <button className="btn btn-outline-light" type="button" onClick={handleSignOut}><i className="fa fa-right-from-bracket me-2"></i>Sign out</button>
                            </div>
                        </section>
                    </div>
                </div>

                <section className="profile-panel mt-4" aria-labelledby="preferences-heading">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                        <div>
                            <h2 id="preferences-heading" className="h4 mb-1">Your preferences</h2>
                            <p className="text-muted small mb-0">These choices are saved to this account and apply when you return.</p>
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

                <section className="profile-panel mt-4" aria-labelledby="requests-heading">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                        <div>
                            <h2 id="requests-heading" className="h4 mb-1">{isAdmin ? 'Vehicle request inbox' : 'Your vehicle requests'}</h2>
                            <p className="text-muted small mb-0">{isAdmin ? 'Review purchase and test-drive requests from showroom users.' : 'Track the vehicle requests you have submitted.'}</p>
                        </div>
                        {!requestsLoading && <span className="profile-kicker">{vehicleRequests.length} REQUESTS</span>}
                    </div>
                    {requestsError && <div className="alert alert-warning py-2" role="alert">{requestsError}</div>}
                    {requestsLoading && <p className="text-muted small mb-0">Loading vehicle requests...</p>}
                    {!requestsLoading && !requestsError && vehicleRequests.length === 0 && <p className="text-muted small mb-0">No vehicle requests yet.</p>}
                    {!requestsLoading && vehicleRequests.length > 0 && (
                        <div className="vehicle-request-list">
                            {vehicleRequests.map((request) => (
                                <div className="vehicle-request-row" key={request.id}>
                                    <div>
                                        <strong>{request.vehicleName}</strong>
                                        <span>{request.actionType === 'purchase' ? 'Purchase request' : 'Test-drive request'}{isAdmin ? ` · ${request.userEmail}` : ''}</span>
                                    </div>
                                    <div className="text-end">
                                        <strong className="numeric-text">{request.vehiclePrice}</strong>
                                        <span>{request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Pending timestamp'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {isAdmin && <section id="admin-panel" className="profile-panel admin-panel mt-4" aria-labelledby="admin-heading">
                    <div className="admin-badge mb-3"><i className="fa fa-shield-halved me-2"></i>ADMIN ACCESS VERIFIED</div>
                    <h2 id="admin-heading" className="h4 mb-1">Administrator panel</h2>
                    <p className="text-muted small mb-4">This separate panel is visible only to the configured administrator email.</p>
                    <div className="row g-3">
                        <div className="col-md-4"><Link className="admin-stat admin-link" to="/profile"><strong>Account control</strong><span>Review your administrator account and preferences.</span><small>Open account controls <i className="fa fa-arrow-right"></i></small></Link></div>
                        <div className="col-md-4"><Link className="admin-stat admin-link" to="/collection"><strong>Collection tools</strong><span>Open the vehicle inventory workflow.</span><small>Open collection <i className="fa fa-arrow-right"></i></small></Link></div>
                        <div className="col-md-4"><Link className="admin-stat admin-link" to="/services"><strong>Service operations</strong><span>Open booking and service workflows.</span><small>Open services <i className="fa fa-arrow-right"></i></small></Link></div>
                    </div>
                </section>}
            </div>
        </main>
    );
}
