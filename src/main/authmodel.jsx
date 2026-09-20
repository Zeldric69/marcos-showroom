import React, { useState } from 'react';
import { auth } from '../firebase/firebaseconfig.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    GithubAuthProvider,
    OAuthProvider,
    signInWithPopup 
} from 'firebase/auth';

export function AuthModal({ isOpen, onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    // Generic social login handler
    const handleSocialLogin = async (provider) => {
        setError('');
        try {
            await signInWithPopup(auth, provider);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const loginWithGoogle = () => handleSocialLogin(new GoogleAuthProvider());
    const loginWithFacebook = () => handleSocialLogin(new FacebookAuthProvider());
    const loginWithGithub = () => handleSocialLogin(new GithubAuthProvider());
    
    // Apple Sign-In Provider setup
    const loginWithApple = () => {
        const appleProvider = new OAuthProvider('apple.com');
        handleSocialLogin(appleProvider);
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white p-4 border border-secondary shadow-lg rounded-4">
                    <div className="modal-header border-bottom border-secondary mb-3 pb-3">
                        <div>
                            <h5 className="modal-title fw-bold mb-1" style={{ color: '#c5a059', letterSpacing: '1px' }}>
                                {isRegistering ? 'CREATE SHOWROOM ACCOUNT' : 'CLIENT PORTAL'}
                            </h5>
                            <p className="text-muted small mb-0">Access exclusive vehicle configurations & bookings</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    
                    <div className="modal-body">
                        {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}
                        
                        {/* --- SOCIAL / MULTI-PLATFORM LOGIN BUTTONS --- */}
                        <div className="d-grid gap-2 mb-3">
                            <button 
                                type="button" 
                                className="btn btn-outline-light text-white d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold border-secondary bg-black"
                                onClick={loginWithGoogle}
                            >
                                <i className="fab fa-google text-danger fs-5"></i> Continue with Google
                            </button>
                            
                            <button 
                                type="button" 
                                className="btn btn-outline-light text-white d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold border-secondary bg-black"
                                onClick={loginWithApple}
                            >
                                <i className="fab fa-apple text-white fs-5"></i> Continue with Apple
                            </button>

                            <button 
                                type="button" 
                                className="btn btn-outline-light text-white d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold border-secondary bg-black"
                                onClick={loginWithFacebook}
                            >
                                <i className="fab fa-facebook text-primary fs-5"></i> Continue with Facebook
                            </button>

                            <button 
                                type="button" 
                                className="btn btn-outline-light text-white d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold border-secondary bg-black"
                                onClick={loginWithGithub}
                            >
                                <i className="fab fa-github text-light fs-5"></i> Continue with GitHub
                            </button>
                        </div>

                        {/* Divider Line */}
                        <div className="text-center text-muted my-3 small position-relative">
                            <span className="bg-dark px-3 position-relative text-uppercase tracking-wider" style={{ zIndex: 1, fontSize: '0.75rem' }}>Or use email credentials</span>
                            <hr className="position-absolute w-100 top-50 start-0 translate-middle-y border-secondary opacity-50" style={{ zIndex: 0 }} />
                        </div>

                        {/* Email & Password Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small text-uppercase text-warning fw-bold">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control bg-black text-white border-secondary py-2" 
                                    placeholder="name@example.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-uppercase text-warning fw-bold">Password</label>
                                <input 
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
                                style={{ backgroundColor: '#c5a059', letterSpacing: '1px' }}
                            >
                                {isRegistering ? 'Register Account' : 'Sign In'}
                            </button>
                        </form>
                        
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