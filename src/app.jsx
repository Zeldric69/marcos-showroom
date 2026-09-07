import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './main/components.jsx';

import Front from './front_page/Front.jsx';
import Collection from './collection_page/Collection.jsx';
import About from './about_page/About.jsx';
import Services from './services_page/services.jsx';

// Helper component to track current route and pass it to Navbar
function Layout() {
    const location = useLocation();
    
    // Determine the active page name based on current path
    let currentPage = 'home';
    if (location.pathname.includes('/about')) currentPage = 'about';
    else if (location.pathname.includes('/services')) currentPage = 'service';
    else if (location.pathname.includes('/collection')) currentPage = 'collection';

    return (
        <>
            <Navbar currentPage={currentPage} />
            <Routes>
                <Route path="/" element={<Front />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
            </Routes>
            <Footer />
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