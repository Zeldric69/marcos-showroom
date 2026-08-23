import { renderNavbar, renderFooter, initConfiguratorModal, renderDynamicForm } from '../main/components.js';

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize global UI templates & Modals
    renderNavbar('service');
    renderFooter();
    initConfiguratorModal();

    // 2. Render the interactive service booking form into the mount point
    renderDynamicForm("serviceFormMount", "booking");

    // 3. Animated Number Counter Logic for Stats
    const animateCounter = (el, target, suffix = "", duration = 1500) => {
        let start = 0;
        let stepTime = Math.abs(Math.floor(duration / target));
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

    const statYears = document.getElementById("statYears");
    const statMechanics = document.getElementById("statMechanics");
    const statClients = document.getElementById("statClients");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(statYears, 15, "+",2000);
                animateCounter(statMechanics, 20, "+",2200);
                animateCounter(statClients, 1500, "+",2000);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    if (statYears) {
        observer.observe(statYears);
    }
});