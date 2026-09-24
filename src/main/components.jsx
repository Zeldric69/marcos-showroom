import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vehicleShowroomDatabase } from '../collection_page/carDashboard.js';

// ==========================================
// 1. REUSABLE NAVIGATION BAR COMPONENT
// ==========================================
export function Navbar({ currentPage, user, onOpenAuth, onLogout }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarStyle = scrolled ? {
        backgroundColor: 'rgba(26, 26, 26, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease'
    } : {
        backgroundColor: 'rgba(33, 37, 41, 0.95)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: 'none'
    };

    // Extract first initial from user email if logged in
    const userInitial = user && user.email ? user.email.charAt(0).toUpperCase() : 'U';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow" style={navbarStyle}>
            <div className="container">
                <Link className="navbar-brand fw-bold text-uppercase gradient-text" to="/" style={{ display: 'inline-block' }}>
                    Marcos
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav gap-3 align-items-lg-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPage === 'service' ? 'active' : ''}`} to="/services">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPage === 'collection' ? 'active' : ''}`} to="/collection">Collection</Link>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} href="#contact-footer">Contact</a>
                        </li>
                        <li className="nav-item d-flex align-items-center gap-3 ms-2 social-nav-container">
                            <a className="nav-link p-0" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a className="nav-link p-0" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                        </li>
                        
                        {/* --- DYNAMIC AUTH BUTTON / INITIAL AVATAR --- */}
                        <li className="nav-item ms-lg-2">
                            {user ? (
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-warning rounded-circle fw-bold text-dark d-flex align-items-center justify-content-center p-0 shadow-sm"
                                        style={{ width: '36px', height: '36px', backgroundColor: '#c5a059', border: 'none' }}
                                        type="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                        title={user.email}
                                    >
                                        {userInitial}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow border-secondary mt-2">
                                        <li><span className="dropdown-item-text text-muted small text-truncate" style={{ maxWidth: '200px' }}>{user.email}</span></li>
                                        <li><hr className="dropdown-divider border-secondary" /></li>
                                        <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user me-2 text-warning"></i>My Profile</Link></li>
                                        <li><button className="dropdown-item text-danger fw-semibold" onClick={onLogout}>Sign Out</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <button 
                                    className="btn btn-outline-warning btn-sm px-3 fw-bold text-uppercase"
                                    onClick={onOpenAuth}
                                >
                                    <i className="fa fa-user me-1"></i> Login
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
// ==========================================
// 2. REUSABLE FOOTER COMPONENT
// ==========================================
export function Footer() {
    return (
        <footer id="contact-footer" className="footer-section pt-5 pb-3 bg-dark text-white border-top border-secondary">
            <div className="container py-5">
                <div className="row g-5 align-items-center justify-content-center">
                    {/* Added text-center here */}
                    <div className="col-lg-5 text-center">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2"> PHYSICAL SHOWROOM </h6>
                        <h2 className="mb-4 fw-bold text-white">Visit Our Headquarters</h2>
                        <p className="mb-2 text-light"><i className="fa fa-map-marker-alt me-3 text-primary"></i>123 Corporate Plaza, Manhattan, NY, USA</p>
                        <p className="mb-2 text-light"><i className="fa fa-phone-alt me-3 text-primary"></i>+1 (212) 555-0199</p>
                        <p className="mb-4 text-light"><i className="fa fa-envelope me-3 text-primary"></i>marcothefenix@gmail.com</p>
                        {/* Changed justify-content-start to justify-content-center */}
                        <div className="d-flex justify-content-center pt-2">
                            <a className="btn btn-outline-light button-social me-2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a className="btn btn-outline-light button-social" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="responsive-map-wrapper shadow-lg">
                            <iframe 
                                className="map-iframe-element w-100 rounded"
                                src="https://maps.google.com/maps?q=Manhattan,New%20York,NY,USA&hl=en&z=15&t=m&output=embed" 
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
// ==========================================
// 3. REUSABLE DYNAMIC FORM COMPONENT
// ==========================================
export function DynamicForm({ formType }) {
    const formConfigs = {
        "booking": {
            title: "Book A Service Appointment",
            desc: "Schedule certified mechanical support or factory diagnostics.",
            buttonText: "Request Appointment",
            fields: [
                { id: "bookName", type: "text", placeholder: "Full Name", required: true },
                { id: "bookEmail", type: "email", placeholder: "Email Address", required: true },
                {
                    id: "carType",
                    type: "select",
                    placeholder: "Select Vehicle Category",
                    required: true,
                    options: ["Supercar / Sports Car", "Luxury Sedan", "Grand Tourer", "Electric Performance"]
                },
                { id: "carModel", type: "text", placeholder: "Vehicle Make & Model (e.g. Porsche 911 GT3)", required: true },
                {
                    id: "bookService",
                    type: "select",
                    placeholder: "Select Service Type",
                    required: true,
                    options: ["Maintenance & Inspection", "OEM Diagnostics", "Custom Detailing", "Performance Tuning"]
                },
                { id: "bookDate", type: "date", placeholder: "Preferred Date", required: true }
            ]
        },
        "testdrive": {
            title: "Schedule A Test Drive",
            desc: "Experience raw track performance behind the wheel of your dream vehicle.",
            buttonText: "Schedule Dynamic Run",
            fields: [
                { id: "driveName", type: "text", placeholder: "Full Name", required: true },
                { id: "driveLicense", type: "text", placeholder: "Driver License ID", required: true },
                { id: "driveDate", type: "date", placeholder: "Preferred Date", required: true }
            ],
        }
    };

    const config = formConfigs[formType];
    if (!config) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Request submitted successfully! Our specialists will contact you.');
        e.target.reset();
    };

    return (
        <div className="modular-form-card p-5 rounded shadow bg-dark border border-secondary">
            <h3 className="text-white fw-bold mb-2 text-center">{config.title}</h3>
            <p className="text-muted text-center mb-4 small">{config.desc}</p>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {config.fields.map((field, idx) => (
                        <div className="col-12" key={idx}>
                            {field.type === "select" ? (
                                <select className="form-select modular-form-input bg-dark text-white border-secondary" required={field.required} defaultValue="">
                                    <option value="" disabled>{field.placeholder}</option>
                                    {field.options.map((opt, oIdx) => (
                                        <option key={oIdx} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input type={field.type} className="form-control form-control-lg modular-form-input bg-dark text-white border-secondary" placeholder={field.placeholder} required={field.required} />
                            )}
                        </div>
                    ))}
                    <div className="col-12">
                        <button className="btn btn-warning modular-form-submit-btn w-100 py-3 mt-2 fw-bold text-uppercase" type="submit">{config.buttonText}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

