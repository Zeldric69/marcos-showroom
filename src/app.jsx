import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType, Link } from 'react-router-dom';
import { Navbar, Footer } from './main/components.jsx';
import { auth } from './firebase/firebaseconfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { AuthModal } from './main/authmodel.jsx'; // Double check this matches your folder structure

const Front = lazy(() => import('./front_page/front.jsx'));
const Collection = lazy(() => import('./collection_page/collection.jsx'));
const About = lazy(() => import('./about_page/about.jsx'));
const Services = lazy(() => import('./services_page/services.jsx'));
const Profile = lazy(() => import('./profile_page/profile.jsx'));

function ScrollToTop() {
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType !== 'POP') window.scrollTo(0, 0);
    }, [location.pathname, navigationType]);

    return null;
}

function NotFound() {
    return <main className="container min-vh-100 d-flex flex-column align-items-center justify-content-center text-center text-normal"><h1>Page not found</h1><p className="text-soft">The page you requested does not exist.</p><Link className="btn btn-brand" to="/">Return home</Link></main>;
}

function Layout() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [hasAdminClaim, setHasAdminClaim] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const isAdmin = hasAdminClaim;

    useEffect(() => {
        const pageTitle = {
            '/': 'Home',
            '/collection': 'Collection',
            '/about': 'About',
            '/services': 'Services',
            '/profile': 'Profile'
        }[location.pathname] || 'Page not found';
        document.title = `${pageTitle} | Marcos Premium`;
    }, [location.pathname]);

    // Track Firebase authentication state live
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const tokenResult = await currentUser.getIdTokenResult();
                    setHasAdminClaim(tokenResult.claims.admin === true);
                } catch (tokenError) {
                    console.error('Admin claim lookup failed:', tokenError);
                    setHasAdminClaim(false);
                }
            } else {
                setHasAdminClaim(false);
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setToastMessage('Signed out successfully.');
            window.setTimeout(() => setToastMessage(''), 3000);
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
            <ScrollToTop />
            <Navbar 
                currentPage={currentPage} 
                user={user} 
                isAdmin={isAdmin}
                onOpenAuth={() => setIsAuthModalOpen(true)} 
                onLogout={handleLogout}
            />
            <Suspense fallback={<main className="d-flex justify-content-center align-items-center min-vh-100 text-light">Loading showroom...</main>}>
                <Routes>
                    <Route path="/" element={<Front user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
                    <Route path="/collection" element={<Collection user={user} onOpenAuth={() => setIsAuthModalOpen(true)} isAdmin={isAdmin} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />} />
                    <Route path="/profile" element={<Profile user={user} isAdmin={isAdmin} isAuthReady={isAuthReady} onOpenAuth={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
            {toastMessage && <div className="toast show position-fixed bottom-0 end-0 m-3" role="status" style={{ zIndex: 1100 }}><div className="toast-body">{toastMessage}</div></div>}
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