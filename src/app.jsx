import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './main/components.jsx';
import { auth } from './firebase/firebaseconfig.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Front from './front_page/Front.jsx';
import Collection from './collection_page/Collection.jsx';
import About from './about_page/About.jsx';
import Services from './services_page/services.jsx';
import { AuthModal } from './main/authmodel.jsx'; // Double check this matches your folder structure

function Layout() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Track Firebase authentication state live
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
                onOpenAuth={() => setIsAuthModalOpen(true)} 
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<Front />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
            </Routes>
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
        <Router>
            <Layout />
        </Router>
    );
}