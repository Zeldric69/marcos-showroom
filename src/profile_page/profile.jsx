import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseconfig.js';
import { sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import './profile.css';

function authMessage(error) {
    const messages = {
        'auth/invalid-profile-attribute': 'That profile name is not valid.',
        'auth/requires-recent-login': 'Please sign in again before changing this setting.',
        'auth/too-many-requests': 'Too many attempts. Please wait and try again.'
    };
    return messages[error.code] || 'We could not update your profile. Please try again.';
}

export default function Profile({ user, onOpenAuth, onLogout }) {
    const [displayName, setDisplayName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setDisplayName(user?.displayName || '');
    }, [user]);

    useEffect(() => {
        if (!user) onOpenAuth?.();
    }, [user, onOpenAuth]);

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
                            <div className="d-grid gap-2 mt-4">
                                {user.providerData.some((provider) => provider.providerId === 'password') && <button className="btn btn-outline-warning" type="button" onClick={handleResetPassword}><i className="fa fa-key me-2"></i>Reset password</button>}
                                <button className="btn btn-outline-light" type="button" onClick={handleSignOut}><i className="fa fa-right-from-bracket me-2"></i>Sign out</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
