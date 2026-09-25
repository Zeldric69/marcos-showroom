import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseconfig.js';
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { getVehicleRequests, removeVehicleRequest } from '../services/vehicleRequests.js';
import { addVehicle, removeVehicle, subscribeToVehicles, updateVehicle } from '../services/vehicles.js';
import '../main/shared.css';
import './profile.css';

const defaultPreferences = { emailUpdates: true, serviceReminders: true, preferredContact: 'Email', compactView: false };
const emptyVehicle = { name: '', price: '', class: '', image: '', desc: '', features: [] };
const preferencesKey = (user) => `marcos-profile-preferences-${user.uid}`;
const authMessage = (error) => ({
    'auth/invalid-profile-attribute': 'That profile name is not valid.',
    'auth/requires-recent-login': 'Please sign in again before changing this setting.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.'
}[error.code] || 'We could not update your profile. Please try again.');

function PreferenceControls({ preferences, updatePreference, preferencesSaved }) {
    return <section className="profile-panel"><div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"><div><h2 className="h4 mb-1">Preferences</h2><p className="text-muted small mb-0">These choices are saved to this account and apply when you return.</p></div>{preferencesSaved && <span className="preference-saved"><i className="fa fa-check me-1"></i>Saved</span>}</div><div className="row g-3"><div className="col-md-6"><label className="preference-control"><input type="checkbox" checked={preferences.emailUpdates} onChange={(event) => updatePreference('emailUpdates', event.target.checked)} /><span><strong>Showroom updates</strong><small>Receive new collection and booking updates.</small></span></label></div><div className="col-md-6"><label className="preference-control"><input type="checkbox" checked={preferences.serviceReminders} onChange={(event) => updatePreference('serviceReminders', event.target.checked)} /><span><strong>Service reminders</strong><small>Keep maintenance and appointment reminders enabled.</small></span></label></div><div className="col-md-6"><label className="form-label small text-uppercase text-warning fw-bold" htmlFor="preferred-contact">Preferred contact</label><select id="preferred-contact" className="form-select profile-input" value={preferences.preferredContact} onChange={(event) => updatePreference('preferredContact', event.target.value)}><option>Email</option><option>Phone</option><option>Either</option></select></div><div className="col-md-6"><label className="preference-control"><input type="checkbox" checked={preferences.compactView} onChange={(event) => updatePreference('compactView', event.target.checked)} /><span><strong>Compact profile view</strong><small>Use tighter spacing for faster account scanning.</small></span></label></div></div></section>;
}

function RequestList({ requests, loading, error, isAdmin, onRemove }) {
    if (loading) return <p className="text-muted small">Loading requests...</p>;
    if (error) return <div className="alert alert-warning py-2">{error}</div>;
    if (!requests.length) return <p className="text-muted small">No vehicle requests yet.</p>;
    return <div className="vehicle-request-list">{requests.map((request) => <div className="vehicle-request-row" key={request.id}><div><strong>{request.requestType === 'service' ? request.serviceType || 'Service appointment' : request.vehicleName}</strong><span>{request.requestType === 'service' ? `${request.vehicleName}${request.preferredDate ? ` · ${request.preferredDate}` : ''}` : request.actionType === 'purchase' ? 'Purchase request' : 'Test-drive request'}{isAdmin ? ` · ${request.userEmail}` : ''}</span></div><div className="text-end"><strong className="numeric-text">{request.vehiclePrice || 'Service booking'}</strong><span>{request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Pending timestamp'}</span>{isAdmin && <button className="btn btn-sm btn-outline-danger mt-2" type="button" onClick={() => onRemove ? onRemove(request) : removeVehicleRequest(request.id).then(() => window.location.reload())}>Remove</button>}</div></div>)}</div>;
}

export default function Profile({ user, isAdmin, isAuthReady, onOpenAuth, onLogout }) {
    const [activeSection, setActiveSection] = useState('overview');
    const [adminTab, setAdminTab] = useState('inventory');
    const [displayName, setDisplayName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [preferencesSaved, setPreferencesSaved] = useState(false);
    const [vehicleRequests, setVehicleRequests] = useState([]);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [requestsError, setRequestsError] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [inventoryError, setInventoryError] = useState('');
    const [editingVehicleId, setEditingVehicleId] = useState(null);
    const [vehicleForm, setVehicleForm] = useState(emptyVehicle);
    const [inventorySaving, setInventorySaving] = useState(false);

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        if (!user) return;
        try { setPreferences({ ...defaultPreferences, ...JSON.parse(localStorage.getItem(preferencesKey(user)) || '{}') }); }
        catch { setPreferences(defaultPreferences); }
    }, [user]);
    useEffect(() => {
        document.body.classList.toggle('profile-compact-view', preferences.compactView);
        document.body.dataset.contactPreference = preferences.preferredContact;
        return () => { document.body.classList.remove('profile-compact-view'); delete document.body.dataset.contactPreference; };
    }, [preferences]);
    useEffect(() => { if (isAuthReady && !user) onOpenAuth?.(); }, [isAuthReady, user, onOpenAuth]);
    useEffect(() => {
        if (!user) return undefined;
        let cancelled = false;
        setRequestsLoading(true); setRequestsError('');
        getVehicleRequests(user, isAdmin).then((requests) => { if (!cancelled) setVehicleRequests(requests); }).catch((loadError) => { console.error(loadError); if (!cancelled) setRequestsError('Vehicle requests are unavailable until the showroom database is enabled.'); }).finally(() => { if (!cancelled) setRequestsLoading(false); });
        return () => { cancelled = true; };
    }, [user, isAdmin]);
    useEffect(() => {
        if (!isAdmin) return undefined;
        return subscribeToVehicles(setVehicles, (loadError) => { console.error(loadError); setInventoryError('Inventory could not be loaded. Check your admin permissions.'); });
    }, [isAdmin]);

    if (!isAuthReady) return <main className="profile-page profile-loading d-flex align-items-center justify-content-center"><div className="text-center text-muted"><div className="spinner-border text-warning mb-3" role="status" aria-label="Loading profile"></div><p className="mb-0">Loading your profile...</p></div></main>;
    if (!user) return <Navigate to="/" replace state={{ openAuth: true }} />;

    const providerNames = user.providerData.map((provider) => provider.providerId === 'password' ? 'Email and password' : provider.providerId.replace('.com', '').replace(/^./, (letter) => letter.toUpperCase()));
    const updatePreference = (name, value) => { const next = { ...preferences, [name]: value }; setPreferences(next); localStorage.setItem(preferencesKey(user), JSON.stringify(next)); setPreferencesSaved(true); window.setTimeout(() => setPreferencesSaved(false), 2200); };
    const handleSave = async (event) => { event.preventDefault(); setError(''); setMessage(''); setIsSaving(true); try { await updateProfile(user, { displayName: displayName.trim() }); setMessage('Your profile has been updated.'); } catch (saveError) { setError(authMessage(saveError)); } finally { setIsSaving(false); } };
    const handleResetPassword = async () => { setError(''); setMessage(''); try { await sendPasswordResetEmail(auth, user.email); setMessage(`Password reset instructions were sent to ${user.email}.`); } catch (resetError) { setError(authMessage(resetError)); } };
    const handleSignOut = () => onLogout ? onLogout() : signOut(auth);
    const handleVehicleSubmit = async (event) => { event.preventDefault(); setInventorySaving(true); setInventoryError(''); try { if (editingVehicleId) await updateVehicle(editingVehicleId, vehicleForm); else await addVehicle(vehicleForm); setVehicleForm(emptyVehicle); setEditingVehicleId(null); } catch (saveError) { console.error(saveError); setInventoryError('The inventory change was rejected. Verify your admin permissions.'); } finally { setInventorySaving(false); } };
    const editVehicle = (vehicle) => { setEditingVehicleId(vehicle.id); setVehicleForm({ name: vehicle.name || '', price: vehicle.price || '', class: vehicle.class || '', image: vehicle.image || vehicle.img || '', desc: vehicle.desc || '', features: vehicle.features || [] }); };
    const handleRemoveVehicle = async (vehicle) => { if (!window.confirm(`Remove ${vehicle.name} from the inventory?`)) return; try { await removeVehicle(vehicle.id); } catch (removeError) { console.error(removeError); setInventoryError('The vehicle could not be removed.'); } };
    const handleRemoveRequest = async (request) => { if (!window.confirm(`Remove this ${request.requestType === 'service' ? 'service booking' : 'vehicle request'}?`)) return; try { await removeVehicleRequest(request.id); setVehicleRequests((currentRequests) => currentRequests.filter((currentRequest) => currentRequest.id !== request.id)); } catch (removeError) { console.error(removeError); setRequestsError('The booking could not be removed.'); } };
    const navItems = [['overview', 'Overview'], ['security', 'Account & Security'], ['preferences', 'Preferences'], ['vehicles', 'My Vehicles / Bookings'], ...(isAdmin ? [['admin', 'Admin']] : [])];

    return <main className="profile-page py-5"><div className="container profile-container"><div className="profile-heading mb-4"><p className="profile-kicker mb-2">CLIENT PORTAL</p><h1 className="display-5 fw-bold mb-2">Your account</h1><p className="text-muted mb-0">Manage your showroom account, preferences, and activity.</p></div><div className="account-dashboard"><aside className="account-sidebar" aria-label="Account sections"><div className="profile-avatar mb-3">{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</div><strong className="sidebar-user-name">{user.displayName || 'Showroom member'}</strong><span className="sidebar-user-email">{user.email}</span><nav className="account-nav mt-4">{navItems.map(([key, label]) => <button key={key} className={activeSection === key ? 'active' : ''} onClick={() => setActiveSection(key)}>{label}</button>)}</nav><button className="btn btn-outline-light btn-sm mt-4 w-100" type="button" onClick={handleSignOut}><i className="fa fa-right-from-bracket me-2"></i>Sign out</button></aside><div className="account-content">{(message || error) && <div className={`alert ${error ? 'alert-danger' : 'alert-success'} py-2`} role={error ? 'alert' : 'status'}>{error || message}</div>}
{activeSection === 'overview' && <section className="profile-panel"><p className="profile-kicker mb-2">ACCOUNT OVERVIEW</p><h2 className="h4 mb-1">Welcome back, {user.displayName || 'member'}</h2><p className="text-muted small mb-4">Your Marcos Premium account is ready for bookings, saved vehicles, and service requests.</p><div className="overview-stats"><div><strong>{vehicleRequests.length}</strong><span>Vehicle requests</span></div><div><strong>{preferences.emailUpdates ? 'On' : 'Off'}</strong><span>Showroom updates</span></div><div><strong>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Current'}</strong><span>Member since</span></div></div></section>}
{activeSection === 'security' && <section className="profile-panel"><h2 className="h4 mb-1">Account & Security</h2><p className="text-muted small mb-4">Keep your identity and account access current.</p><form onSubmit={handleSave}><label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-name">Display name</label><input id="profile-name" className="form-control profile-input mb-3" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} placeholder="Add your name" /><label className="form-label small text-uppercase text-warning fw-bold" htmlFor="profile-email">Email address</label><input id="profile-email" className="form-control profile-input mb-1" value={user.email || ''} readOnly /><p className="text-muted small mb-4">Sign-in method: {providerNames.join(', ') || 'Account provider'}</p><button className="btn profile-primary px-4" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</button></form>{user.providerData.some((provider) => provider.providerId === 'password') && <button className="btn btn-outline-warning mt-4" type="button" onClick={handleResetPassword}><i className="fa fa-key me-2"></i>Reset password</button>}</section>}
{activeSection === 'preferences' && <PreferenceControls preferences={preferences} updatePreference={updatePreference} preferencesSaved={preferencesSaved} />}
{activeSection === 'vehicles' && <section className="profile-panel"><div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4"><div><h2 className="h4 mb-1">{isAdmin ? 'Service bookings' : 'My vehicles & bookings'}</h2><p className="text-muted small mb-0">{isAdmin ? 'Review purchase and test-drive requests from showroom users.' : 'Track the vehicle requests you have submitted.'}</p></div>{!requestsLoading && <span className="profile-kicker">{vehicleRequests.length} REQUESTS</span>}</div><RequestList requests={vehicleRequests} loading={requestsLoading} error={requestsError} isAdmin={isAdmin} onRemove={isAdmin ? handleRemoveRequest : undefined} /></section>}
{activeSection === 'admin' && isAdmin && <section className="profile-panel admin-panel"><div className="admin-badge mb-2"><i className="fa fa-shield-halved me-2"></i>ADMIN ACCESS VERIFIED</div><h2 className="h4 mb-1">Operations dashboard</h2><p className="text-muted small mb-4">Manage inventory, monitor showroom activity, and review service operations.</p><div className="admin-tabs mb-4">{[['inventory', 'Inventory'], ['stats', 'Site stats'], ['bookings', 'Bookings']].map(([key, label]) => <button key={key} className={adminTab === key ? 'active' : ''} onClick={() => setAdminTab(key)}>{label}</button>)}</div>{adminTab === 'inventory' && <div><div className="admin-summary mb-4"><strong>{vehicles.length}</strong><span>Cars in Firestore inventory</span></div>{inventoryError && <div className="alert alert-warning py-2">{inventoryError}</div>}{vehicles.length === 0 && !inventoryError && <div className="alert alert-info py-2">No Firestore inventory records found. Run <code>npm run seed:vehicles</code> once to import the 134 showroom cars.</div>}<form className="inventory-form" onSubmit={handleVehicleSubmit}><h3 className="h5">{editingVehicleId ? 'Edit vehicle' : 'Add vehicle'}</h3><div className="row g-2"><div className="col-md-6"><input className="form-control profile-input" placeholder="Vehicle name" value={vehicleForm.name} onChange={(event) => setVehicleForm({ ...vehicleForm, name: event.target.value })} required /></div><div className="col-md-3"><input className="form-control profile-input" placeholder="Price" value={vehicleForm.price} onChange={(event) => setVehicleForm({ ...vehicleForm, price: event.target.value })} required /></div><div className="col-md-3"><input className="form-control profile-input" placeholder="Class / brand" value={vehicleForm.class} onChange={(event) => setVehicleForm({ ...vehicleForm, class: event.target.value })} required /></div><div className="col-12"><input className="form-control profile-input" placeholder="Image URL" value={vehicleForm.image} onChange={(event) => setVehicleForm({ ...vehicleForm, image: event.target.value })} /></div></div><div className="d-flex gap-2 mt-3"><button className="btn profile-primary" type="submit" disabled={inventorySaving}>{inventorySaving ? 'Saving...' : editingVehicleId ? 'Update vehicle' : 'Add vehicle'}</button>{editingVehicleId && <button className="btn btn-outline-light" type="button" onClick={() => { setEditingVehicleId(null); setVehicleForm(emptyVehicle); }}>Cancel</button>}</div></form><div className="inventory-list mt-4">{vehicles.map((vehicle) => <div className="inventory-row" key={vehicle.id}><div><strong>{vehicle.name}</strong><span>{vehicle.class} · {vehicle.price}</span></div><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-warning" type="button" onClick={() => editVehicle(vehicle)}>Edit</button><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleRemoveVehicle(vehicle)}>Remove</button></div></div>)}</div></div>}{adminTab === 'stats' && <div className="overview-stats"><div><strong>{vehicles.length}</strong><span>Total vehicles in Firestore</span></div><div><strong>Unavailable</strong><span>Registered users</span></div><div><strong>{vehicleRequests.length}</strong><span>Service bookings</span></div></div>}{adminTab === 'bookings' && <RequestList requests={vehicleRequests} loading={requestsLoading} error={requestsError} isAdmin />}</section>}</div></div></div></main>;
}
