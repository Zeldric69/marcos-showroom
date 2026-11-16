import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createServiceBooking } from '../services/vehicleRequests.js';
import { ErrorState, LoadingButton, SuccessState, ValidationError, offlineError, signInRequired, useAsyncAction } from './states.jsx';
import { validateBooking } from './validators.js';

// ==========================================
// 1. REUSABLE NAVIGATION BAR COMPONENT
// ==========================================
export function Navbar({ currentPage, user, isAdmin, onOpenAuth, onLogout }) {
    useEffect(() => {
        document.getElementById('navbarNav')?.classList.remove('show');
    }, [currentPage]);

    const navbarStyle = {
        backgroundColor: '#0B0C0E',
        borderBottom: '1px solid var(--line)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)',
        transform: 'translateZ(0)',
        paddingTop: '1.65rem',
        paddingBottom: '1.65rem',
        minHeight: '96px',
        paddingLeft: 0,
        paddingRight: 0
    };

    // Extract first initial from user email if logged in
    const userInitial = user && user.email ? user.email.charAt(0).toUpperCase() : 'U';

    return (
        <nav className="navbar navbar-expand-lg fixed-top py-0 d-flex align-items-center" style={navbarStyle}>
            <div className="container-fluid px-3 px-sm-4" style={{ maxWidth: '100%', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                <Link className="navbar-brand text-uppercase" to="/" style={{ display: 'inline-block', margin: 0, padding: 0, fontWeight: 800, fontSize: '1.35rem', letterSpacing: '0.14em' }}>
                    MARCOS
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav gap-3 align-items-lg-center ms-auto" style={{ marginRight: 0 }}>
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
                                        className="btn btn-brand rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm"
                                        style={{ width: '36px', height: '36px', border: 'none', color: 'var(--on-accent)' }}
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
                                        {isAdmin && <li><Link className="dropdown-item" to="/profile#admin-panel"><i className="fa fa-shield-halved me-2 text-warning"></i>Admin Panel</Link></li>}
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
        <footer id="contact-footer" className="footer-section pt-5 pb-3 text-white below-fold">
            <div className="container py-5">
                <div className="row g-5 align-items-center justify-content-center">
                    {/* Added text-center here */}
                    <div className="col-lg-5 text-center">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2"> PHYSICAL SHOWROOM </h6>
                        <h2 className="mb-4 fw-bold text-white">Visit Our Headquarters</h2>
                        <p className="mb-2 text-light"><i className="fa fa-map-marker-alt me-3 text-primary"></i>123 Corporate Plaza, Manhattan, NY, USA</p>
                        <p className="mb-2 text-light"><i className="fa fa-phone-alt me-3 text-primary"></i>+1 (212) 555-0199</p>
                        <p className="mb-4 text-light"><i className="fa fa-envelope me-3 text-primary"></i>Contact the showroom for assistance</p>
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
export function DynamicForm({ formType, user, onOpenAuth }) {
    const booking = useAsyncAction({ context: 'booking' });
    const formRef = useRef(null);
    const formConfigs = {
        "booking": {
            title: "Book A Service Appointment",
            desc: "Schedule certified mechanical support or factory diagnostics.",
            buttonText: "Request Appointment",
            fields: [
                { id: "bookName", name: "fullName", type: "text", placeholder: "Full Name", required: true },
                { id: "bookEmail", name: "email", type: "email", placeholder: "Email Address", required: true },
                {
                    id: "carType", name: "vehicleCategory",
                    type: "select",
                    placeholder: "Select Vehicle Category",
                    required: true,
                    options: ["Supercar / Sports Car", "Luxury Sedan", "Grand Tourer", "Electric Performance"]
                },
                { id: "carModel", name: "carModel", type: "text", placeholder: "Vehicle Make & Model (e.g. Porsche 911 GT3)", required: true },
                {
                    id: "bookService", name: "serviceType",
                    type: "select",
                    placeholder: "Select Service Type",
                    required: true,
                    options: ["Maintenance & Inspection", "OEM Diagnostics", "Custom Detailing", "Performance Tuning"]
                },
                { id: "bookDate", name: "preferredDate", type: "date", placeholder: "Preferred Date", required: true }
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

    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
    const invalidFields = booking.error?.fields || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            booking.fail(offlineError());
            return;
        }
        if (formType === 'booking' && !user) {
            booking.fail(signInRequired());
            onOpenAuth?.();
            return;
        }

        const values = Object.fromEntries(new FormData(e.currentTarget));
        const problems = formType === 'booking' ? validateBooking(values) : null;
        if (problems) {
            booking.fail(new ValidationError(problems));
            return;
        }

        await booking.run(async () => {
            if (formType === 'booking') {
                await createServiceBooking({
                    user,
                    serviceType: values.serviceType,
                    carModel: values.carModel,
                    preferredDate: values.preferredDate,
                    fullName: values.fullName,
                    contactEmail: values.email,
                    vehicleCategory: values.vehicleCategory
                });
            }
        });
    };

    if (booking.status === 'success') {
        return (
            <div className="modular-form-card p-5 rounded shadow">
                <SuccessState title="Request received" message="Our specialists will contact you to confirm the details.">
                    <button type="button" className="btn btn-outline-light btn-sm mt-2" onClick={booking.reset}>Make another request</button>
                </SuccessState>
            </div>
        );
    }

    return (
        <div className="modular-form-card p-5 rounded shadow">
            <h3 className="text-white fw-bold mb-2 text-center">{config.title}</h3>
            <p className="text-muted text-center mb-4 small">{config.desc}</p>
            {booking.status === 'error' && (
                <ErrorState
                    compact
                    error={booking.error}
                    onRetry={() => formRef.current?.requestSubmit()}
                    onDismiss={booking.reset}
                />
            )}
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                    {config.fields.map((field, idx) => (
                        <div className="col-12" key={idx}>
                            {field.type === "select" ? (
                                <select
                                    name={field.name || field.id}
                                    className={`form-select modular-form-input${invalidFields[field.name || field.id] ? ' is-invalid' : ''}`}
                                    required={field.required}
                                    defaultValue=""
                                    onChange={() => { if (booking.status === 'error') booking.reset(); }}
                                >
                                    <option value="" disabled>{field.placeholder}</option>
                                    {field.options.map((opt, oIdx) => (
                                        <option key={oIdx} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    name={field.name || field.id}
                                    type={field.type}
                                    min={field.type === 'date' ? today : undefined}
                                    className={`form-control form-control-lg modular-form-input${invalidFields[field.name || field.id] ? ' is-invalid' : ''}`}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    onChange={() => { if (booking.status === 'error') booking.reset(); }}
                                />
                            )}
                        </div>
                    ))}
                    <div className="col-12">
                        <LoadingButton
                            className="btn btn-brand modular-form-submit-btn w-100 py-3 mt-2 text-uppercase"
                            type="submit"
                            loading={booking.loading}
                            loadingText="Sending your request..."
                        >
                            {config.buttonText}
                        </LoadingButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
