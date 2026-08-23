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
});
// --- FEATURE CARD RENDERING BLOCK ---

const featureCards = [
    {
        title: "Explore Collection",
        text: "Curated fleet of high-performance luxury vehicles.", // Short and direct
        img: "https://imgs.search.brave.com/aLO4MdYB_iiKucL3QKOpoeWHNTaJBG6ROv37-DjnTe0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnNfMnQv/MjY4MzkuanBn",
        link: "collection.html"
    },
    {
        title: "Book a Service",
        text: "Expert diagnostic, tuning, and maintenance services.", // Short and direct
        img: "https://plus.unsplash.com/premium_photo-1661411119301-8cae0adce9a7?w=3840&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNhciUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D",
        link: "services.html"
    },
    {
        title: "Exchange Your Car",
        text: "Seamless trade and upgrade with valuation specialists.", // Short and direct
        img: "https://plus.unsplash.com/premium_photo-1683133731787-60b51a51a9e1?w=3840&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMGRlYWx8ZW58MHx8MHx8fDA%3D",
        link: "place.html"
    }
];

// Replace the inner HTML map section in front.js with this:
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
