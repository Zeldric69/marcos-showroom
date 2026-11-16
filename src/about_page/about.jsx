import React, { useEffect } from 'react';
import { SmartImage } from '../main/SmartImage.jsx';
import './about.css';
import '../main/shared.css';

export default function About() {
    
    const companyHistoryText = "Marcos Premium was founded on the principle of automotive excellence, providing unmatched service to enthusiasts since 2020.";

    return (
        <div className="about-page-wrapper text-normal">
            <div className="ng"></div>

            {/* --- UNIFIED HERO BANNER WITH TRUST BADGES INSIDE --- */}
            <div className="about-hero-stats-wrapper">
                <div className="about-header-banner text-center d-flex align-items-center justify-content-center py-2">
                    <div className="container banner-text-holder text-center w-100">
                        <h1 className="display-3 text-strong fw-bold text-uppercase mb-2">About Our Ecosystem</h1>
                        <p className="accent-brand-text fw-bold text-uppercase mb-4">
                            THE ULTIMATE HUB FOR SALES & ELITE MAINTENANCE
                        </p>

                        {/* Badges moved inside the hero bottom */}
                        <div className="d-flex flex-wrap justify-content-center align-items-center text-center gap-4 pt-3 border-top border-line border-opacity-25">
                            <div className="text-strong small fw-bold"><i className="fa fa-certificate me-2 text-accent"></i> Factory Authorized Dealer</div>
                            <div className="text-strong small fw-bold"><i className="fa fa-shield me-2 text-accent"></i> ASE Certified Mechanics</div>
                            <div className="text-strong small fw-bold"><i className="fa fa-map-marker-alt me-2 text-accent"></i> Serving New York Area</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- OUR STORY SECTION WITH A DEDICATED SECTION HEADER --- */}
            <section className="container py-5 below-fold">
                <div className="text-center mb-5">
                    <h6 className="eyebrow mb-2">
                        Established Heritage
                    </h6>
                    <h2 className="fw-bold display-6 text-strong">Our Story & Background</h2>
                </div>

                <div className="row align-items-center g-5">
                    <div className="col-lg-7">
                        <h4 className="fw-bold mb-3 text-strong">Building Automotive Excellence</h4>
                        <p className="text-normal lead mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                            {companyHistoryText}
                        </p>
                        <div className="d-flex gap-4 text-accent fw-semibold small">
                            <span><i className="fa fa-check-circle me-2"></i> Verified Heritage</span>
                            <span><i className="fa fa-check-circle me-2"></i> Elite Collection</span>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="position-relative">
                            <SmartImage key="about-heritage"
                                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800" 
                                className="img-fluid rounded-3 shadow-lg border border-line w-100" 
                                alt="Marcos Heritage" 
                                style={{ height: '300px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE HYBRID SHOWROOM CONCEPT SECTION --- */}
            <section className="py-5 text-normal below-fold">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h6 className="eyebrow mb-2" style={{ letterSpacing: '2px' }}>Capabilities</h6>
                        <h2 className="fw-bold display-6 text-strong">The Hybrid Showroom Concept</h2>
                    </div>

                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <h4 className="fw-bold mb-3 text-strong">Seamless Integration of Sales & Service</h4>
                            <p className="description-text mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                                Marcos Premium started with a single, clear vision: to eliminate the compromise between finding
                                a trustworthy maintenance workshop and an upscale luxury vehicle showroom. We house certified,
                                master-class mechanics alongside an elite fleet of sports, luxury, and electric arrivals.
                            </p>
                            <p className="description-text mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                                Every vehicle entering our inventory is fully configured, detailed, and certified. We preserve
                                the mechanical performance and heritage of your luxury machines.
                            </p>
                            <div className="d-flex gap-4 text-accent fw-semibold small">
                                <span><i className="fa fa-check-circle me-2"></i> OEM Standards</span>
                                <span><i className="fa fa-check-circle me-2"></i> Certified Inventory</span>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="position-relative">
                                <SmartImage key="about-showroom"
                                    src="https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=800" 
                                    className="img-fluid rounded-3 shadow-lg border border-line w-100"
                                    alt="Marcos Luxury Showroom" 
                                    style={{ height: '400px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}