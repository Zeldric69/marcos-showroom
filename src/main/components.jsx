import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vehicleShowroomDatabase } from '../collection_page/carDashboard.js';

// ==========================================
// 1. REUSABLE NAVIGATION BAR COMPONENT
// ==========================================
export function Navbar({ currentPage }) {
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
        backgroundColor: '#212529',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: 'none'
    };

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

// ==========================================
// 4. FIXED-DIMENSION CARD GENERATOR COMPONENT
// ==========================================
export function ShowroomCard({ carKey, carData, onSelectCar }) {
    const defaultImg = (carData.colors && carData.colors[0]) ? carData.colors[0].img : 'images/default-car.jpg';
    
    return (
        <div className="col d-flex justify-content-center">
            <div className="card h-100 position-relative shadow-lg bg-dark text-white border-secondary" style={{ width: '100%' }}>
                <span className="card-badge position-absolute top-0 end-0 m-2 badge bg-warning text-dark">{carData.brand || 'Featured'}</span>
                <img src={defaultImg} className="card-img-top" alt={carData.name} width="100%" height="220px" style={{ objectFit: 'cover' }} loading="lazy" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{carData.name}</h5>
                    <p className="card-text text-warning fw-semibold">{carData.price}</p>
                    <button 
                        className="btn btn-outline-light mt-auto view-details-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#carDetailsModal"
                        onClick={() => onSelectCar(carKey)}
                    >
                        See More Details
                    </button>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 5. SCROLL-TRIGGERED STAT COUNTING ANIMATION
// ==========================================
export function setupScrollCounter(elementId, targetValue, suffix = '', duration = 1000) {
    const counterElement = document.getElementById(elementId);
    if (!counterElement) return;

    let currentCount = 0;
    let totalSteps = 50;
    let increment = Math.max(1, Math.floor(targetValue / totalSteps));
    let stepTime = Math.max(10, Math.floor(duration / totalSteps));

    const startCounter = () => {
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetValue) {
                currentCount = targetValue;
                clearInterval(timer);
                counterElement.textContent = targetValue + suffix;
            } else {
                counterElement.textContent = currentCount;
            }
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterElement);
}

// ==========================================
// 6. INITIALIZE CONFIGURATOR MODAL COMPONENT
// ==========================================
export function initConfiguratorModal() {
    const modalHTML = `
        <div class="modal fade customization-modal" id="carDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content text-white bg-dark border border-secondary">
                    <div class="modal-header border-secondary">
                        <h3 class="modal-title fw-bold" id="modalCarName">Vehicle Blueprint Details</h3>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-5">
                        <div class="row g-5">
                            <div class="col-lg-7">
                                <div class="modal-configurator-image-container rounded overflow-hidden shadow-sm">
                                    <img id="modalCarImg" src="" class="w-100 h-100 object-fit-cover" alt="Selected Car Spec Panel" style="height: 350px;">
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <h4 class="accent-brand-text display-6 fw-bold mb-2" id="modalCarPrice"></h4>
                                <div class="border-bottom border-secondary pb-3 mb-4">
                                    <h6 class="text-uppercase text-secondary fw-bold small mb-2">Overview Description</h6>
                                    <p id="modalCarDesc" class="description-text small mb-0"></p>
                                </div>
                                <div class="mb-4">
                                    <h6 class="text-uppercase text-secondary fw-bold small mb-2">Bespoke Exterior Finishes</h6>
                                    <div class="d-flex gap-3 pt-1" id="colorSwatchContainer"></div>
                                </div>
                                <div class="mb-5">
                                    <h6 class="text-uppercase text-secondary fw-bold small mb-3">Vehicle Features Sheet</h6>
                                    <div class="features-wrapper bg-dark p-3 rounded border border-secondary" id="modalFeaturesContainer"></div>
                                </div>
                                <div class="row g-3">
                                    <div class="col-sm-6">
                                        <button class="btn btn-outline-warning w-100 py-2" onclick="alert('Inquiry received! Our sales specialists will contact you shortly.')">
                                            <i class="fa fa-shopping-cart me-2"></i>Book Now
                                        </button>
                                    </div>
                                    <div class="col-sm-6">
                                        <button class="btn btn-outline-light w-100 py-2" onclick="alert('Test drive booking initiated, please visit our showroom to finalize the schedule.')">
                                            <i class="fa fa-tachometer-alt me-2"></i>Test Drive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-secondary justify-content-end">
                        <button type="button" class="btn btn-outline-light py-2 px-4 fw-bold text-uppercase" data-bs-dismiss="modal">Close Details</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (!document.getElementById('carDetailsModal')) {
        const modalWrapper = document.createElement("div");
        modalWrapper.innerHTML = modalHTML;
        document.body.appendChild(modalWrapper);
    }

    const bootstrapModalElement = document.getElementById('carDetailsModal');
    let bootstrapModalInstance = null;
    if (bootstrapModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        bootstrapModalInstance = new bootstrap.Modal(bootstrapModalElement);
    }
    const bodyWrapper = document.body;

    document.addEventListener("click", function (e) {
        const detailsBtn = e.target.closest(".view-details-btn");
        if (!detailsBtn) return;

        const carKey = detailsBtn.getAttribute("data-car-id");
        const carData = vehicleShowroomDatabase[carKey];
        if (!carData) return;

        document.getElementById("modalCarName").textContent = carData.name;
        document.getElementById("modalCarPrice").textContent = carData.price;
        document.getElementById("modalCarDesc").textContent = carData.desc;

        const viewportImg = document.getElementById("modalCarImg");
        viewportImg.src = (carData.colors && carData.colors[0] ? carData.colors[0].img : "images/default-car.jpg");

        const swatchBox = document.getElementById("colorSwatchContainer");
        swatchBox.innerHTML = "";
        if (carData.colors) {
            carData.colors.forEach((color, index) => {
                const swatch = document.createElement("div");
                swatch.className = `color-swatch ${index === 0 ? 'active' : ''}`;
                swatch.style.width = "30px";
                swatch.style.height = "30px";
                swatch.style.borderRadius = "50%";
                swatch.style.cursor = "pointer";
                swatch.style.backgroundColor = color.hex;
                swatch.title = color.name;
                swatch.addEventListener("click", function () {
                    document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
                    this.classList.add("active");
                    viewportImg.src = color.img;
                });
                swatchBox.appendChild(swatch);
            });
        }

        const featuresBox = document.getElementById("modalFeaturesContainer");
        featuresBox.innerHTML = "";
        if (carData.features) {
            carData.features.forEach(feat => {
                const featLine = document.createElement("div");
                featLine.className = "feature-bullet-item mb-1 text-light small";
                featLine.innerHTML = `<i class="fa fa-chevron-right text-warning me-2 small"></i> ${feat}`;
                featuresBox.appendChild(featLine);
            });
        }

        bodyWrapper.classList.add("modal-blur-active");
        if (bootstrapModalInstance && typeof bootstrapModalInstance.show === 'function') {
            bootstrapModalInstance.show();
        }
    });

    if (bootstrapModalElement) {
        bootstrapModalElement.addEventListener('hidden.bs.modal', function () {
            bodyWrapper.classList.remove("modal-blur-active");
        });
    }
}

// ==========================================
// 7. AI LUXURY CONCIERGE CHATBOT WIDGET
// ==========================================
export function initManagedChatbot() {
    if (document.getElementById("bp-web-chat")) return;

    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://files.bpcontent.cloud/2026/0,0/your-bot-id-here.js";
    script2.defer = true;
    document.body.appendChild(script2);
}