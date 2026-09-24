import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './front.css';
import '../main/shared.css';

export default function Front() {
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Automated hero slide rotation
    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        const slideInterval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }, 5000);

        return () => clearInterval(slideInterval);
    }, []);

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
                    animateCounter('statYears', 15, '+', 2000);
                    animateCounter('statVehicles', 130, '+', 1100);
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
            img: "https://imgs.search.brave.com/aLO4MdYB_iiKucL3QKOpoeWHNTaJBG6ROv37-DjnTe0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnNfMnQv/MjY4MzkuanBn",
            link: "/collection"
        },
        {
            title: "Book a Service",
            text: "Expert diagnostic, tuning, and maintenance services.",
            img: "https://plus.unsplash.com/premium_photo-1661411119301-8cae0adce9a7?w=1940&auto=format&fit=crop&q=100",
            link: "/services"
        },
        {
            title: "Exchange Your Car",
            text: "Seamless trade and upgrade with valuation specialists.",
            img: "https://plus.unsplash.com/premium_photo-1683133731787-60b51a51a9e1?w=1940&auto=format&fit=crop&q=100",
            link: "#exchangePopup"
        }
    ];

    const handleExchangeSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your vehicle details have been submitted for appraisal.');
        setIsExchangeModalOpen(false);
        e.target.reset();
    };

    return (
        <div className="front-page-wrapper text-light bg-dark">
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
                    <div className={`carousel-item ${activeIndex === 0 ? 'active d-block' : 'd-none'}`} style={{ height: '85vh', backgroundColor: '#000' }}>
                        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=3840&auto=format&fit=crop&q=100")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className="carousel-caption carousel-caption-bottom">
                            <div className="container text-start">
                                <h6 className="hero-subtitle">HYBRID SHOWROOM</h6>
                                <h1 className="display-3 hero-title">The Precision Engineered Fleet</h1>
                                <Link to="/collection" className="btn btn-danger py-3 px-5 fw-bold">EXPLORE CATALOG</Link>
                            </div>
                        </div>
                    </div>

                    <div className={`carousel-item ${activeIndex === 1 ? 'active d-block' : 'd-none'}`} style={{ height: '85vh', backgroundColor: '#000' }}>
                        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1727893153491-392fd2d1c721?w=3840&auto=format&fit=crop&q=100")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className="carousel-caption carousel-caption-bottom">
                            <div className="container text-start">
                                <h6 className="hero-subtitle">EXPERT CARE & MAINTENANCE</h6>
                                <h2 className="display-3 hero-title">Advanced Diagnostics & Tuning</h2>
                                <Link to="/services" className="btn btn-danger py-3 px-5 fw-bold">BOOK A SERVICE</Link>
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
                        <h6 className="text-uppercase tracking-wider mb-1 text-white">Our Offerings</h6>
                        <h2 className="display-5 fw-bold m-0" style={{ color: '#c5a059' }}>Experience Excellence</h2>
                    </div>
                </div>
            </div>

            {/* FEATURE CARDS SECTION */}
            <section className="container py-5">
                <div className="row g-3 justify-content-center" id="feature-cards-container">
                    {featureCards.map((c, index) => (
                        <div className="col-lg-3 col-md-5 d-flex justify-content-center" key={index}>
                            <div className="card bg-dark text-white border-secondary h-100 shadow w-100">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">{c.title}</h4>
                                </div>
                                <img loading="lazy" decoding="async" src={c.img} className="card-img-top" alt={c.title} style={{ height: '200px', objectFit: 'cover' }} />
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

            <section className="hybrid-about-section py-5 bg-black text-white overflow-hidden">
                {/* Using container-fluid with padding instead of a fixed container */}
                <div className="container-fluid px-lg-5 py-4">
                    <div className="row align-items-center">
                        {/* Text block aligned cleanly with some left margin on large screens */}
                        <div className="col-lg-5 offset-lg-1 mb-4 mb-lg-0">
                            <h6 className="text-danger text-uppercase fw-bold mb-2"> THE ECOSYSTEM </h6>
                            <h2 className="display-5 fw-bold mb-4">Elite Sales Meet Factory-Grade Precision Care</h2>
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
                                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" alt="Showroom and Service" className="img-fluid rounded-start shadow-lg position-relative w-100" style={{ zIndex: 2, objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="py-5 bg-dark">
                <div className="container text-center">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: '#c5a059' }} id="statYears">0</h2>
                            <p className="fw-bold mb-0 text-white">YEARS EXPERIENCE</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: '#c5a059' }} id="statVehicles">0</h2>
                            <p className="fw-bold mb-0 text-white">FLEET VEHICLES IN STOCK</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-4 fw-bold numeric-text" style={{ color: '#c5a059' }} id="statHappyClients">0</h2>
                            <p className="fw-bold mb-0 text-white">SATISFIED HAPPY DRIVERS</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="cta-banner-section py-5 text-center text-white" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', borderTop: '1px solid #333', borderBottom: '1px solid #333' }}>
                <div className="container py-4">
                    <h2 className="display-6 fw-bold mb-3">Ready to Elevate Your Driving Experience?</h2>
                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Step into our showroom catalog or book your next diagnostic session with our master technicians today.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/collection" className="btn btn-danger px-5 py-3 fw-bold text-uppercase">Browse Collection</Link>
                        <Link to="/services" className="btn btn-outline-light px-5 py-3 fw-bold text-uppercase">Book Service</Link>
                    </div>
                </div>
            </section>

            {isExchangeModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-white p-3" style={{ background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(197, 160, 89, 0.4)' }}>
                            <div className="modal-header border-bottom border-secondary">
                                <h5 className="modal-title fw-bold" style={{ color: '#c5a059' }}>Vehicle Trade-In & Exchange</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setIsExchangeModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleExchangeSubmit}>
                                    <p className="text-muted small mb-3 text-light">Submit your current vehicle details below, and our acquisition team will contact you with an appraisal estimate.</p>
                                    <div className="mb-3">
                                        <label className="form-label small text-uppercase fw-bold text-warning">Current Vehicle (Make, Model, Year)</label>
                                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="e.g., Porsche 911 GT3, 2022" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-uppercase fw-bold text-warning">Current Mileage</label>
                                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="e.g., 15,000 miles" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-uppercase fw-bold text-warning">Contact Information</label>
                                        <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Phone number or email" required />
                                    </div>
                                    <button type="submit" className="btn w-100 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#c5a059', color: '#000' }}>Submit For Appraisal</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}