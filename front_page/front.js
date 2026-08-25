import { renderNavbar, renderFooter, initConfiguratorModal, renderDynamicForm, setupScrollCounter } from '../main/components.js';

// Force page to scroll to the top on reload or refresh
window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
});

// Fallback for browsers that cache scroll position on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
    // Mount global templates
    renderNavbar('home');
    renderFooter();
    initConfiguratorModal();
    
    // Mount the modular booking form
    renderDynamicForm('modularFormMount', 'booking');
    
    // Set up count-up triggers on scroll
    setupScrollCounter('statYears', 15,'+',2000);
    setupScrollCounter('statVehicles', 130,'+',1100);
    setupScrollCounter('statHappyClients', 1500,'+',2000);

    // --- POPUP MODAL HANDLER FOR EXCHANGE CARD ---
    document.addEventListener('click', (e) => {
        const exchangeTrigger = e.target.closest('a[href="#exchangePopup"]');
        if (exchangeTrigger) {
            e.preventDefault();
            
            // Check if modal element exists, otherwise create it dynamically
            let modalElement = document.getElementById('carExchangeModal');
            if (!modalElement) {
                // Dynamically inject the modal HTML if it's missing from index.html
                const modalHTML = `
                <div class="modal fade" id="carExchangeModal" tabindex="-1" aria-labelledby="carExchangeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-white p-3" style="background: rgba(17, 24, 39, 0.95) !important; border: 1px solid rgba(197, 160, 89, 0.4) !important; backdrop-filter: blur(12px);">
                            <div class="modal-header border-bottom border-secondary">
                                <h5 class="modal-title fw-bold" style="color: #c5a059;">Vehicle Trade-In & Exchange</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="exchangeForm">
                                    <p class="text-muted small mb-3 text-light " style="color: rgba(255, 255, 255, 0.7) !important;">Submit your current vehicle details below, and our acquisition team will contact you with an appraisal estimate.</p>
                                    <div class="mb-3">
                                        <label class="form-label small text-uppercase fw-bold text-warning">Current Vehicle (Make, Model, Year)</label>
                                        <input type="text" class="form-control" style="background-color: #121824; border-color: rgba(255, 255, 255, 0.5); color: #fff;" placeholder="e.g., Porsche 911 GT3, 2022" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label small text-uppercase fw-bold text-warning">Current Mileage</label>
                                        <input type="text" class="form-control" style="background-color: #121824; border-color: rgba(255, 255, 255, 0.5); color: #fff;" placeholder="e.g., 15,000 miles" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label small text-uppercase fw-bold text-warning">Contact Information</label>
                                        <input type="text" class="form-control" style="background-color: #121824; border-color: rgba(255, 255, 255, 0.5); color: #fff;" placeholder="Phone number or email" required>
                                    </div>
                                    <button type="submit" class="btn w-100 py-2 fw-bold text-uppercase" style="background-color: #c5a059; color: #000;">Submit For Appraisal</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                modalElement = document.getElementById('carExchangeModal');

                // Handle form submit alert/reset inside dynamic modal
                document.getElementById('exchangeForm').addEventListener('submit', (subEvent) => {
                    subEvent.preventDefault();
                    alert('Thank you! Your vehicle details have been submitted for appraisal.');
                    const activeModal = bootstrap.Modal.getInstance(modalElement);
                    activeModal.hide();
                    subEvent.target.reset();
                });
            }

            const exchangeModal = new bootstrap.Modal(modalElement);
            exchangeModal.show();
        }
    });
});

// --- FEATURE CARD RENDERING BLOCK ---

const featureCards = [
    {
        title: "Explore Collection",
        text: "Curated fleet of high-performance luxury vehicles.", 
        img: "https://imgs.search.brave.com/aLO4MdYB_iiKucL3QKOpoeWHNTaJBG6ROv37-DjnTe0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnNfMnQv/MjY4MzkuanBn",
        link: "./collection_page/collection.html"
    },
    {
        title: "Book a Service",
        text: "Expert diagnostic, tuning, and maintenance services.", 
        img: "https://plus.unsplash.com/premium_photo-1661411119301-8cae0adce9a7?w=3840&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNhciUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D",
        link: "./services_page/services.html"
    },
    {
        title: "Exchange Your Car",
        text: "Seamless trade and upgrade with valuation specialists.", 
        img: "https://plus.unsplash.com/premium_photo-1683133731787-60b51a51a9e1?w=3840&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMGRlYWx8ZW58MHx8MHx8fDA%3D",
        link: "#exchangePopup" // Directs click to the event listener above
    }
];

document.getElementById('feature-cards-container').innerHTML = featureCards.map(c => `
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${c.title}</h4>
        </div>
        <img src="${c.img}" class="card-img-top" alt="${c.title}">
        <div class="card-body">
            <p class="card-text">${c.text}</p>
            <a href="${c.link}" class="btn btn-outline-light">Learn More</a>
        </div>
    </div>
`).join('');