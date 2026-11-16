import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createTradeInRequest } from '../services/vehicleRequests.js';
import { SmartImage } from '../main/SmartImage.jsx';
import { prefersReducedMotion, isLiteMode } from '../main/network.js';
import './front.css';
import '../main/shared.css';

export default function Front({ user, onOpenAuth }) {
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [exchangeState, setExchangeState] = useState({ saving: false, message: '', error: '' });
    const exchangeModalRef = useRef(null);
    const photoWidth = isLiteMode() ? 640 : 1600;

    // Automated hero slide rotation
    useEffect(() => {
        if (isLiteMode() || prefersReducedMotion()) return undefined;
        const slideInterval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }, 5000);

        return () => clearInterval(slideInterval);
    }, []);

    useEffect(() => {
        if (!isExchangeModalOpen) {
            setExchangeState({ saving: false, message: '', error: '' });
            return undefined;
        }
        const modal = exchangeModalRef.current;
        const focusableElements = () => modal?.querySelectorAll('button:not(:disabled), input:not(:disabled)') || [];
        focusableElements()[0]?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setIsExchangeModalOpen(false);
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
    }, [isExchangeModalOpen]);

    // Stats counter animation
    useEffect(() => {
        const animateCounter = (elId, target, suffix = "", duration = 1500) => {
            const el = document.getElementById(elId);
            if (!el) return;
            let start = 0;
            let timer = setInterval(() => {
                start += Math.ceil(target / 40);
                if (start >= target) {
                    el.textContent = target.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    el.textContent = start.toLocaleString() + suffix;
                }
            }, 30);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter('statYears', 6, '+', 2000);
                    animateCounter('statVehicles', 134, '+', 1100);
                    animateCounter('statHappyClients', 1500, '+', 2000);
                    obs.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const statYearsEl = document.getElementById('statYears');
        if (statYearsEl) observer.observe(statYearsEl);
    }, []);

    const featureCards = [
        {
            title: "Explore Collection",
            text: "Curated fleet of high-performance luxury vehicles.",
            img: `https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=${photoWidth}&auto=format&fit=crop&q=75`,
            link: "/collection"
        },
        {
            title: "Book a Service",
            text: "Expert diagnostic, tuning, and maintenance services.",
            img: `https://plus.unsplash.com/premium_photo-1661411119301-8cae0adce9a7?w=${photoWidth}&auto=format&fit=crop&q=75`,
            link: "/services"
        },
        {
            title: "Exchange Your Car",
            text: "Seamless trade and upgrade with valuation specialists.",
            img: `https://plus.unsplash.com/premium_photo-1683133731787-60b51a51a9e1?w=${photoWidth}&auto=format&fit=crop&q=75`,
            link: "#exchangePopup"
        }
    ];

    const handleExchangeSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            setExchangeState({ saving: false, message: '', error: 'You appear to be offline. Please try again once you are connected.' });
            return;
        }
        if (!user) {
            setExchangeState({ saving: false, message: '', error: 'Please sign in before submitting vehicle details.' });
            onOpenAuth?.();
            return;
        }
        const formData = new FormData(form);
        setExchangeState({ saving: true, message: '', error: '' });
        try {
            await createTradeInRequest({
                user,
                vehicleName: formData.get('vehicleName'),
                vehicleMileage: formData.get('vehicleMileage'),
                contactInfo: formData.get('contactInfo')
            });
            setExchangeState({ saving: false, message: 'Your trade-in request has been submitted. Our team will contact you.', error: '' });
            form.reset();
        } catch (submitError) {
            console.error('Trade-in request error:', submitError);
            setExchangeState({ saving: false, message: '', error: 'We could not save your request. Please try again.' });
        }
    };

    return (
        <div className="front-page-wrapper text-normal bg-page">
            <div className="ng"></div>

            {/* --- CONTROLLED HERO BANNER CAROUSEL --- */}
            <div id="heroCarousel" className="carousel slide carousel-fade">
                <div className="carousel-indicators" style={{ zIndex: 12 }}>
                    <button
                        type="button"
                        className={activeIndex === 0 ? "active" : ""}
                        onClick={() => setActiveIndex(0)}
                        aria-label="Slide 1">
                    </button>
                    <button
                        type="button"
                        className={activeIndex === 1 ? "active" : ""}
                        onClick={() => setActiveIndex(1)}
                        aria-label="Slide 2">
                    </button>
                </div>

                <div className="carousel-inner">
                    <div className={`carousel-item ${activeIndex === 0 ? 'active d-block' : 'd-none'}`} style={{ height: '85vh', backgroundColor: 'var(--bg)' }}>
                        <SmartImage priority src={`https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=${photoWidth}&auto=format&fit=crop&q=75`} alt="" className="hero-slide-image" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                        <div className="hero-image-overlay"></div>
                        <div className="carousel-caption carousel-caption-bottom">
                            <div className="container text-start">
                                <h6 className="eyebrow">HYBRID SHOWROOM</h6>
                                <h1 className="display display-hero hero-title">The Precision Engineered Fleet</h1>
                                <Link to="/collection" className="btn btn-brand py-3 px-5">EXPLORE CATALOG</Link>
                            </div>
                        </div>
                    </div>

                    <div className={`carousel-item ${activeIndex === 1 ? 'active d-block' : 'd-none'}`} style={{ height: '85vh', backgroundColor: 'var(--bg)' }}>
                        <SmartImage src={`https://images.unsplash.com/photo-1727893153491-392fd2d1c721?w=${photoWidth}&auto=format&fit=crop&q=75`} alt="" className="hero-slide-image" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                        <div className="hero-image-overlay"></div>
                        <div className="carousel-caption carousel-caption-bottom">
                            <div className="container text-start">
                                <h6 className="eyebrow">EXPERT CARE & MAINTENANCE</h6>
                                <h2 className="display display-hero hero-title">Advanced Diagnostics & Tuning</h2>
                                <Link to="/services" className="btn btn-brand py-3 px-5">BOOK A SERVICE</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={() => setActiveIndex(prev => (prev === 0 ? 1 : 0))}
                    style={{ width: '8%', zIndex: 15, cursor: 'pointer' }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    onClick={() => setActiveIndex(prev => (prev === 1 ? 0 : 1))}
                    style={{ width: '8%', zIndex: 15, cursor: 'pointer' }}>
                    <span className="carousel-control-next-icon" aria-hidden="true" style={{ width: '3rem', height: '3rem' }}></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container text-center pt-5" style={{ paddingBottom: '0px' }}>
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h6 className="eyebrow mb-1">Our Offerings</h6>
                        <h2 className="display display-section m-0">Experience Excellence</h2>
                    </div>
                </div>
            </div>

            {/* FEATURE CARDS SECTION */}
            <section className="container py-5 below-fold">
                <div className="row g-3 justify-content-center" id="feature-cards-container">
                    {featureCards.map((c, index) => (
                        <div className="col-lg-3 col-md-5 d-flex justify-content-center" key={index}>
                            <div className="card h-100 shadow w-100">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">{c.title}</h4>
                                </div>
                                <SmartImage key={c.img} src={c.img} className="card-img-top" alt={c.title} style={{ height: '200px' }} />
                                <div className="card-body d-flex flex-column">
                                    <p className="card-text text-muted small mb-4">{c.text}</p>
                                    {c.link === '#exchangePopup' ? (
                                        <button
                                            className="btn btn-outline-light mt-auto"
                                            onClick={() => setIsExchangeModalOpen(true)}
                                        >
                                            Learn More
                                        </button>
                                    ) : (
                                        <Link to={c.link} className="btn btn-outline-light mt-auto">Learn More</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="hybrid-about-section py-5 bg-black text-white overflow-hidden below-fold">
                {/* Using container-fluid with padding instead of a fixed container */}
                <div className="container-fluid px-lg-5 py-4">
                    <div className="row align-items-center">
                        {/* Text block aligned cleanly with some left margin on large screens */}
                        <div className="col-lg-5 offset-lg-1 mb-4 mb-lg-0">
                            <h6 className="eyebrow mb-2"> THE ECOSYSTEM </h6>
                            <h2 className="display display-section mb-4">Elite Sales Meet Factory-Grade Precision Care</h2>
                            <p className="text-muted mb-4">
                                Marcos redefines ownership by merging a hand-picked inventory of ultra-performance vehicles with
                                an elite diagnostic and tuning facility. Whether you are expanding your collection or servicing
                                high-end engineering, everything happens under one roof.
                            </p>
                            <Link to="/about" className="btn btn-outline-light px-4 py-2 fw-bold text-uppercase">Discover Our Story</Link>
                        </div>

                        {/* Image stretches all the way to the right screen corner with zero padding */}
                        <div className="col-lg-6 pe-0">
                            <div className="hybrid-img-wrapper position-relative">
                                <div className="hybrid-glow-box"></div>
                                <SmartImage key="showroom-service" src={`https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=${photoWidth}&q=75`} alt="Showroom and Service" className="img-fluid rounded-start shadow-lg position-relative w-100" style={{ position: 'relative', zIndex: 2 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="py-5 below-fold" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div className="container text-center">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: 'var(--accent)' }} id="statYears">0</h2>
                            <p className="fw-bold mb-0 text-white">YEARS EXPERIENCE</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: 'var(--accent)' }} id="statVehicles">0</h2>
                            <p className="fw-bold mb-0 text-white">FLEET VEHICLES IN STOCK</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: 'var(--accent)' }} id="statHappyClients">0</h2>
                            <p className="fw-bold mb-0 text-white">SATISFIED HAPPY DRIVERS</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="cta-banner-section py-5 text-center text-white below-fold">
                <div className="container py-4">
                    <h2 className="display-6 fw-bold mb-3">Ready to Elevate Your Driving Experience?</h2>
                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Step into our showroom catalog or book your next diagnostic session with our master technicians today.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/collection" className="btn btn-brand px-5 py-3 text-uppercase">Browse Collection</Link>
                        <Link to="/services" className="btn btn-outline-light px-5 py-3 fw-bold text-uppercase">Book Service</Link>
                    </div>
                </div>
            </section>

            {isExchangeModalOpen && (
                <div ref={exchangeModalRef} className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="trade-in-title" style={{ backgroundColor: 'rgb(var(--bg-rgb) / 0.8)', backdropFilter: 'blur(12px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-white p-3" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 id="trade-in-title" className="modal-title" style={{ color: 'var(--accent)' }}>Vehicle Trade-In & Exchange</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setIsExchangeModalOpen(false)} aria-label="Close trade-in dialog"></button>
                            </div>
                            <div className="modal-body">
                                {exchangeState.message && <div className="alert alert-success" role="status">{exchangeState.message}</div>}
                                {exchangeState.error && <div className="alert alert-warning" role="alert">{exchangeState.error}</div>}
                                <form onSubmit={handleExchangeSubmit}>
                                    <p className="text-muted small mb-3 text-light">Share your current vehicle details and our acquisition team will follow up.</p>
                                    <div className="mb-3">
                                        <label htmlFor="trade-in-vehicle" className="form-label label mb-1">Current Vehicle (Make, Model, Year)</label>
                                        <input id="trade-in-vehicle" name="vehicleName" type="text" className="form-control" placeholder="e.g., Porsche 911 GT3, 2022" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="trade-in-mileage" className="form-label label mb-1">Current Mileage</label>
                                        <input id="trade-in-mileage" name="vehicleMileage" type="number" min="0" className="form-control" placeholder="e.g., 15000" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="trade-in-contact" className="form-label label mb-1">Contact Information</label>
                                        <input id="trade-in-contact" name="contactInfo" type="text" className="form-control" placeholder="Phone number or email" required />
                                    </div>
                                    <button type="submit" className="btn btn-brand w-100 py-2 text-uppercase" disabled={exchangeState.saving || Boolean(exchangeState.message)}>{exchangeState.saving ? 'Submitting...' : 'Submit Vehicle Details'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}