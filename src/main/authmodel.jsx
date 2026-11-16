import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase/firebaseconfig.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { ErrorState, explainError } from './states.jsx';

export function AuthModal({ isOpen, onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const [notice, setNotice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modalRef = useRef(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setPassword('');
            setDisplayName('');
            setIsRegistering(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return undefined;
        const modal = modalRef.current;
        const focusableElements = () => modal?.querySelectorAll('button:not(:disabled), input:not(:disabled)') || [];
        focusableElements()[0]?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onCloseRef.current();
            if (event.key !== 'Tab') return;
            const elements = focusableElements();
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        setError(null);
        setNotice('');
    }, [isOpen, isRegistering]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setNotice('');
        setIsSubmitting(true);
        try {
            if (isRegistering) {
                const credentials = await createUserWithEmailAndPassword(auth, email, password);
                if (displayName.trim()) {
                    await updateProfile(credentials.user, { displayName: displayName.trim() });
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onClose();
        } catch (err) {
            setError(explainError(err, 'auth'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generic social login handler
    const handleSocialLogin = async (provider) => {
        setError(null);
        try {
            await signInWithPopup(auth, provider);
            onClose();
        } catch (err) {
            setError(explainError(err, 'auth'));
        }
    };

    const handlePasswordReset = async () => {
        if (!email.trim()) {
            setError({
                title: 'Enter your email address',
                cause: 'We need your email to send reset instructions.',
                steps: ['Type the address associated with your account.'],
                retryable: false,
                technical: ''
            });
            return;
        }
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email.trim());
            setNotice('Password reset instructions have been sent to your email.');
        } catch (err) {
            setError(explainError(err, 'auth'));
        }
    };

    const loginWithGoogle = () => handleSocialLogin(new GoogleAuthProvider());
    return (
        <div ref={modalRef} className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" style={{ backgroundColor: 'rgb(var(--bg-rgb) / 0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 shadow-lg">
                    <div className="modal-header border-bottom mb-3 pb-3">
                        <div>
                            <h5 id="auth-modal-title" className="modal-title fw-bold mb-1" style={{ color: 'var(--accent)', letterSpacing: '1px' }}>
                                {isRegistering ? 'CREATE SHOWROOM ACCOUNT' : 'CLIENT PORTAL'}
                            </h5>
                            <p className="text-muted small mb-0">Access exclusive vehicle configurations & bookings</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close sign-in dialog"></button>
                    </div>
                    
                    <div className="modal-body">
                        {error && <ErrorState compact error={error} onDismiss={() => setError(null)} />}
                        {notice && <div className="alert alert-success py-2 small mb-3" role="status">{notice}</div>}
                        
                        {/* --- SOCIAL / MULTI-PLATFORM LOGIN BUTTONS --- */}
                        <div className="d-grid gap-2 mb-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-light text-white d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold border-secondary bg-black"
                                onClick={loginWithGoogle}
                            >
                                <i className="fab fa-google text-danger fs-5"></i> Continue with Google
                            </button>
                            
                        </div>

                        {/* Divider Line */}
                        <div className="text-center text-muted my-3 small position-relative">
                            <span className="px-3 position-relative text-uppercase tracking-wider" style={{ zIndex: 1, fontSize: '0.75rem', backgroundColor: 'var(--surface)' }}>Or use email credentials</span>
                            <hr className="position-absolute w-100 top-50 start-0 translate-middle-y opacity-50" style={{ zIndex: 0, borderColor: 'var(--line)' }} />
                        </div>

                        {/* Email & Password Form */}
                        <form onSubmit={handleSubmit}>
                            {isRegistering && <div className="mb-3">
                                <label htmlFor="auth-display-name" className="form-label small text-uppercase text-warning fw-bold">Display Name</label>
                                <input
                                    id="auth-display-name"
                                    type="text"
                                    className="form-control bg-black text-white border-secondary py-2"
                                    placeholder="Your name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    maxLength={60}
                                />
                            </div>}
                            <div className="mb-3">
                                <label htmlFor="auth-email" className="form-label small text-uppercase text-warning fw-bold">Email Address</label>
                                <input 
                                    id="auth-email"
                                    type="email" 
                                    className="form-control bg-black text-white border-secondary py-2" 
                                    placeholder="name@example.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="auth-password" className="form-label small text-uppercase text-warning fw-bold">Password</label>
                                <input 
                                    id="auth-password"
                                    type="password" 
                                    className="form-control bg-black text-white border-secondary py-2" 
                                    placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn w-100 py-2 fw-bold text-uppercase mt-2 shadow-sm text-black" 
                                style={{ backgroundColor: 'var(--accent)', letterSpacing: '1px' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Please wait...' : (isRegistering ? 'Register Account' : 'Sign In')}
                            </button>
                        </form>

                        {!isRegistering && <button type="button" className="btn btn-link text-warning text-decoration-none small w-100 mt-2" onClick={handlePasswordReset}>
                            Forgot your password?
                        </button>}
                        
                        <div className="text-center mt-3 pt-2 border-top border-secondary border-opacity-25">
                            <button className="btn btn-link text-decoration-none text-muted small" onClick={() => setIsRegistering(!isRegistering)}>
                                {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register here"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}