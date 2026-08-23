/* ==========================================================================
   MARCOS PREMIUM SHOWROOM - COMPONENT ENGINE (components.js)
   ========================================================================== */

import { vehicleShowroomDatabase } from './carDashboard.js';

// 2. EXPORT: REUSABLE NAVIGATION BAR COMPONENT
export function renderNavbar(currentPage , basePath = '') {
    const navbarMount = document.querySelector('.ng') || document.querySelector('header') || document.getElementById('navbarMount');
    if (!navbarMount) return;

    navbarMount.innerHTML = `
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
            <div class="container">
                <a class="navbar-brand fw-bold text-uppercase gradient-text" href="${basePath}index.html" style ="display : inline-block !important; ">Marcos</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav gap-3">
                        <li class="nav-item"><a class="nav-link ${currentPage === 'home' ? 'active' : ''}" href="${basePath}index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link ${currentPage === 'about' ? 'active' : ''}" href="${basePath}about_page/about.html">About</a></li>
                        <li class="nav-item"><a class="nav-link ${currentPage === 'service' ? 'active' : ''}" href="${basePath}services_page/services.html">Service</a></li>
                        <li class="nav-item"><a class="nav-link ${currentPage === 'collection' ? 'active' : ''}" href="${basePath}collection_page/collection.html">Collection</a></li>
                        <li class="nav-item"><a class="nav-link ${currentPage === 'contact' ? 'active' : ''}" href="#contact-footer">Contact</a></li>
                
                        <li class="nav-item d-flex align-items-center gap-3 ms-2 social-nav-container">
                            <a class="nav-link p-0" href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a class="nav-link p-0" href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        </li>
                  </ul>
             </div>
         </div>
      </nav>  
    `;
    window.addEventListener('scroll', () => {
        const navbarEl = document.querySelector('.navbar');
        if (!navbarEl) return;

        if (window.scrollY > 50) {
            navbarEl.style.backgroundColor = 'rgba(26, 26, 26, 0.85)';
            navbarEl.style.backdropFilter = 'blur(10px)';
            navbarEl.style.webkitBackdropFilter = 'blur(10px)';
            navbarEl.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            navbarEl.style.transition = 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease';
        } else {
            navbarEl.style.backgroundColor = '#212529'; // Standard dark fallback
            navbarEl.style.backdropFilter = 'none';
            navbarEl.style.webkitBackdropFilter = 'none';
            navbarEl.style.boxShadow = 'none';
        }
    });
}

// 3. EXPORT: REUSABLE FOOTER COMPONENT
export function renderFooter() {
    const footerHTML = `
        <div class="container py-5">
            <div class="row g-5 align-items-center">
                <div class="col-lg-5">
                    <h6 class="accent-brand-text text-uppercase fw-bold mb-2"> PHYSICAL SHOWROOM </h6>
                    <h2 class="mb-4 fw-bold text-white">Visit Our Headquarters</h2>
                    <p class="mb-2 text-light"><i class="fa fa-map-marker-alt me-3 text-primary"></i>123 Corporate Plaza, Manhattan, NY, USA</p>
                    <p class="mb-2 text-light"><i class="fa fa-phone-alt me-3 text-primary"></i>+1 (212) 555-0199</p>
                    <p class="mb-4 text-light"><i class="fa fa-envelope me-3 text-primary"></i>marcothefenix@gmail.com</p>
                    <div class="d-flex justify-content-center pt-2">
                        <a class="btn btn-outline-light button-social me-2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                        <a class="btn btn-outline-light button-social" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="responsive-map-wrapper shadow-lg">
                        <iframe 
                            class="map-iframe-element"
                            src="https://maps.google.com/maps?q=Manhattan,New%20York,NY,USA&hl=en&z=15&t=m&output=embed" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    const footerNode = document.querySelector(".footer-section");
    if (footerNode) {
        footerNode.innerHTML = footerHTML;
    }
}

// 4. EXPORT: REUSABLE DYNAMIC FORM COMPONENT
export function renderDynamicForm(targetElementId, formType) {
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
    if (!config) return;

    const targetNode = document.getElementById(targetElementId);
    if (!targetNode) return;

    let fieldsHTML = "";
    config.fields.forEach(field => {
        if (field.type === "select") {
            fieldsHTML += `
                <div class="col-12">
                    <select class="form-select modular-form-input" id="${field.id}" ${field.required ? 'required' : ''}>
                        <option value="" disabled selected>${field.placeholder}</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        } else {
            fieldsHTML += `
                <div class="col-12">
                    <input type="${field.type}" class="form-control form-control-lg modular-form-input" id="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
                </div>
            `;
        }
    });

    targetNode.innerHTML = `
        <div class="modular-form-card p-5 rounded shadow">
            <h3 class="text-white fw-bold mb-2 text-center">${config.title}</h3>
            <p class="text-muted text-center mb-4 small">${config.desc}</p>
            <form onsubmit="event.preventDefault(); alert('Request submitted successfully! Our specialists will contact you.');">
                <div class="row g-3">
                    ${fieldsHTML}
                    <div class="col-12">
                        <button class="btn modular-form-submit-btn w-100 py-3 mt-2" type="submit">${config.buttonText}</button>
                    </div>
                </div>
            </form>
        </div>
    `;
}

// 5. EXPORT: FIXED-DIMENSION CARD GENERATOR
export function generateShowroomCard(carKey, carData) {
    const defaultImg = (carData.colors && carData.colors[0]) ? carData.colors[0].img : 'images/default-car.jpg';
    return `
        <div class="col d-flex justify-content-center">
            <div class="card h-100 position-relative shadow-lg" style="width: 100%;">
                <span class="card-badge">${carData.brand || 'Featured'}</span>
                <img src="${defaultImg}" class="card-img-top" alt="${carData.name}" width = "100%" height = "220px" style="object-fit: cover;" loading = "lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${carData.name}</h5>
                    <p class="card-text text-warning fw-semibold">${carData.price}</p>
                    <button class="btn btn-outline-light mt-auto view-details-btn" data-car-id="${carKey}">See More Details</button>
                </div>
            </div>
        </div>
    `;
}

// 6. EXPORT: SCROLL-TRIGGERED STAT COUNTING ANIMATION
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

// 7. EXPORT: INITIALIZE CONFIGURATOR MODAL
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
                                        <button class="btn btn-outline-light w-100 py-2" onclick="alert('Test drive booking initiated!')">
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

    const modalWrapper = document.createElement("div");
    modalWrapper.innerHTML = modalHTML;
    document.body.appendChild(modalWrapper);

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

// --- AUTO-CLOSE MOBILE NAVBAR ON CLICK ---
document.addEventListener("click", (e) => {
    const navLink = e.target.closest(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navLink && navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        } else {
            // Fallback if Bootstrap instance isn't found
            navbarCollapse.classList.remove("show");
        }
    }
});