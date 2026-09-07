import React, { useEffect } from 'react';
import { DynamicForm } from '../main/components.jsx';
import './services.css';
import '../main/shared.css';

export default function Services() {
    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        // Animated Number Counter Logic
        const statYears = document.getElementById("statYears");
        const statMechanics = document.getElementById("statMechanics");
        const statClients = document.getElementById("statClients");

        const animateCounter = (el, target, suffix = "", duration = 1500) => {
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
                    animateCounter(statYears, 15, "+", 2000);
                    animateCounter(statMechanics, 20, "+", 2200);
                    animateCounter(statClients, 1500, "+", 2000);
                    obs.disconnect();
                }
            });
        }, { threshold: 0.3 });

        if (statYears) {
            observer.observe(statYears);
        }
    }, []);

    return (
        <div className="services-page-wrapper text-light bg-dark">
            <div className="ng"></div>

            {/* --- CLEAN SERVICE HERO BANNER --- */}
            <div className="service-hero-stats-wrapper">
                <div className="service-header-banner text-center d-flex align-items-center justify-content-center">
                    <div className="container banner-text-holder text-center w-100">
                        <h1 className="display-3 text-white fw-bold text-uppercase">Elite Maintenance & Support</h1>
                        <p className="accent-brand-text fw-bold text-uppercase mt-2">CERTIFIED DIAGNOSTICS, REPAIRS, AND BESPOKE TUNING</p>
                    </div>
                </div>
            </div>

            {/* --- WHY CHOOSE US SECTION --- */}
            <section className="py-5 text-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2">Unrivaled Expertise</h6>
                        <h2 className="fw-bold">Why Entrust Your Machine To Us</h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <i className="fa fa-microchip fa-2x text-warning mb-3"></i>
                                <h4 className="fw-bold mb-2">OEM Diagnostics</h4>
                                <p className="text-muted small mb-0">We utilize factory-grade diagnostic software tailored specifically for exotic and high-performance European platforms.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <i className="fa fa-shield-alt fa-2x text-warning mb-3"></i>
                                <h4 className="fw-bold mb-2">Guaranteed Protection</h4>
                                <p className="text-muted small mb-0">Every mechanical service and performance component upgrade comes with a comprehensive workshop warranty.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <i className="fa fa-truck-pickup fa-2x text-warning mb-3"></i>
                                <h4 className="fw-bold mb-2">White-Glove Transport</h4>
                                <p className="text-muted small mb-0">Enclosed vehicle pickup and drop-off services available directly from your garage to our secure facility.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICE TIERS / PACKAGES --- */}
            <section className="py-5 text-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2">Specialized Care</h6>
                        <h2 className="fw-bold">Our Core Service Portfolios</h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100 d-flex flex-column">
                                <h4 className="fw-bold mb-3 text-warning">Routine Maintenance</h4>
                                <p className="text-muted small mb-4">Manufacturer-spec fluid changes, brake servicing, and comprehensive health checks for peak performance.</p>
                                <ul className="list-unstyled text-light small mb-4 flex-grow-1">
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Synthetic fluid replacements</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Brake pad & rotor evaluation</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Suspension geometry check</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100 d-flex flex-column">
                                <h4 className="fw-bold mb-3 text-warning">Advanced Diagnostics</h4>
                                <p className="text-muted small mb-4">Deep electronic tracing, ECU mapping adjustments, and troubleshooting for complex powertrain issues.</p>
                                <ul className="list-unstyled text-light small mb-4 flex-grow-1">
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Factory software scanning</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Electrical fault isolation</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Performance telemetry testing</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-4 bg-dark rounded border border-secondary h-100 d-flex flex-column">
                                <h4 className="fw-bold mb-3 text-warning">Bespoke Detailing</h4>
                                <p className="text-muted small mb-4">Multi-stage paint correction, ceramic coating protection, and interior leather restoration.</p>
                                <ul className="list-unstyled text-light small mb-4 flex-grow-1">
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Paint correction & PPF</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Interior hide conditioning</li>
                                    <li className="mb-2"><i className="fa fa-check text-warning me-2"></i>Engine bay steam detailing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WORKSHOP PROCESS TIMELINE --- */}
            <section className="py-5 text-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2">Seamless Workflow</h6>
                        <h2 className="fw-bold">The Marcos Service Journey</h2>
                    </div>
                    <div className="row g-4 text-center justify-content-center">
                        <div className="col-md-3 service-journey-step">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <div className="display-6 fw-bold text-warning mb-2">01</div>
                                <h5 className="fw-bold mb-2">Enclosed Pickup</h5>
                                <p className="text-muted small mb-0">Secure transport from your location directly to our climate-controlled bay.</p>
                            </div>
                        </div>
                        <div className="col-md-3 service-journey-step">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <div className="display-6 fw-bold text-warning mb-2">02</div>
                                <h5 className="fw-bold mb-2">Digital Inspection</h5>
                                <p className="text-muted small mb-0">Transparent multi-point digital report sent straight to your device.</p>
                            </div>
                        </div>
                        <div className="col-md-3 service-journey-step">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <div className="display-6 fw-bold text-warning mb-2">03</div>
                                <h5 className="fw-bold mb-2">Precision Work</h5>
                                <p className="text-muted small mb-0">Executed by master technicians utilizing certified OEM components.</p>
                            </div>
                        </div>
                        <div className="col-md-3 service-journey-step">
                            <div className="p-4 bg-dark rounded border border-secondary h-100">
                                <div className="display-6 fw-bold text-warning mb-2">04</div>
                                <h5 className="fw-bold mb-2">Test & Delivery</h5>
                                <p className="text-muted small mb-0">Final telemetry check and white-glove return to your garage.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MIDDLE STATS COUNTER BANNER --- */}
            <section className="py-5 text-white service-stats-middle-banner">
                <div className="container py-3">
                    <div className="text-center mb-4">
                        <h6 className="accent-brand-text text-uppercase fw-bold mb-2">Proven Track Record</h6>
                        <h3 className="fw-bold">Excellence In Numbers</h3>
                    </div>
                    <div className="row text-center g-4">
                        <div className="col-md-4">
                            <h2 className="display-5 fw-bold text-warning mb-1" id="statYears">0+</h2>
                            <p className="text-uppercase text-light small fw-bold mb-0" style={{ letterSpacing: '1px' }}>Years of Excellence</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-5 fw-bold text-warning mb-1" id="statMechanics">0</h2>
                            <p className="text-uppercase text-light small fw-bold mb-0" style={{ letterSpacing: '1px' }}>Master Mechanics</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="display-5 fw-bold text-warning mb-1" id="statClients">0+</h2>
                            <p className="text-uppercase text-light small fw-bold mb-0" style={{ letterSpacing: '1px' }}>Satisfied Collectors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CLIENT TESTIMONIAL BLOCK --- */}
            <section className="py-5 text-white">
                <div className="container py-3">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="p-4 p-lg-5 bg-dark rounded border border-secondary position-relative">
                                <i className="fa fa-quote-left text-warning fa-2x mb-3 opacity-50"></i>
                                <p className="lead fst-italic mb-4">"Handing over my GT3 to Marcos was the best decision. Their white-glove pickup and digital reporting level up the entire workshop experience."</p>
                                <h5 className="fw-bold mb-1">Adolf Hitler</h5>
                                <p className="text-warning small text-uppercase mb-0" style={{ letterSpacing: '1px' }}>Porsche 911 GT3 Collector</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SERVICE BOOKING FORM SECTION --- */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <DynamicForm formType="booking" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}