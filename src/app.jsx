import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './main/components.jsx';
import { auth } from './firebase/firebaseconfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { AuthModal } from './main/authmodel.jsx'; // Double check this matches your folder structure

const Front = lazy(() => import('./front_page/front.jsx'));
const Collection = lazy(() => import('./collection_page/collection.jsx'));
const About = lazy(() => import('./about_page/about.jsx'));
const Services = lazy(() => import('./services_page/services.jsx'));
const Profile = lazy(() => import('./profile_page/profile.jsx'));

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase();

function Layout() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const isAdmin = Boolean(user?.email && ADMIN_EMAIL && user.email.toLowerCase() === ADMIN_EMAIL);

    // Track Firebase authentication state live
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Signed out successfully.');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    let currentPage = 'home';
    if (location.pathname.includes('/about')) currentPage = 'about';
    else if (location.pathname.includes('/services')) currentPage = 'service';
    else if (location.pathname.includes('/collection')) currentPage = 'collection';

    return (
        <>
            <Navbar 
                currentPage={currentPage} 
                user={user} 
                isAdmin={isAdmin}
                onOpenAuth={() => setIsAuthModalOpen(true)} 
                onLogout={handleLogout}
            />
            <Suspense fallback={<main className="d-flex justify-content-center align-items-center min-vh-100 text-light">Loading showroom...</main>}>
                <Routes>
                    <Route path="/" element={<Front />} />
                    <Route path="/collection" element={<Collection user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/profile" element={<Profile user={user} isAdmin={isAdmin} isAuthReady={isAuthReady} onOpenAuth={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />} />
                </Routes>
            </Suspense>
            <Footer />

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
}

export default function App() {
    return (
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Layout />
        </Router>
    );
}