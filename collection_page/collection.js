import { renderNavbar, renderFooter, initConfiguratorModal, generateShowroomCard } from '../main/components.js';
import { vehicleShowroomDatabase } from '../main/carDashboard.js';

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {

    //0. gives the browser a micro-moment to paint the loading spinner
    setTimeout(() => {
        renderNavbar('collection', '../');
        renderFooter();
        initConfiguratorModal();

    }, 150);


    // 1. Mount Global UI Templates


    const cardMountNode = document.getElementById("fleetGridMount");
    const paginationContainer = document.getElementById("showroomPagination");
    const filterButtons = document.querySelectorAll(".filter-brand-btn");

    const newReleasesMount = document.getElementById("newReleasesMount");
    const mostSoldMount = document.getElementById("mostSoldMount");
    const searchInput = document.getElementById("fleetSearchInput");
    const priceSortSelect = document.getElementById("priceSortSelect");
    const showroomCounter = document.getElementById("showroomCounter");

    const keys = Object.keys(vehicleShowroomDatabase);
    const itemsPerPage = 12;
    let activePage = 1;
    let currentBrandFilter = "all";
    let currentSearchQuery = "";
    let currentSortOrder = "default";

    // 2. Render New Releases (Last 3 cars added to database)
    if (newReleasesMount && keys.length > 0) {
        const lastThreeKeys = keys.slice(-3);
        let newReleasesHTML = "";
        lastThreeKeys.forEach(key => {
            newReleasesHTML += generateShowroomCard(key, vehicleShowroomDatabase[key]);
        });
        newReleasesMount.innerHTML = newReleasesHTML;
    }

    // 3. Render Most Sold (Random 3 cars on load)
    if (mostSoldMount && keys.length > 0) {
        const shuffledKeys = [...keys].sort(() => 0.5 - Math.random());
        const randomThreeKeys = shuffledKeys.slice(0, 3);

        let mostSoldHTML = "";
        randomThreeKeys.forEach(key => {
            mostSoldHTML += generateShowroomCard(key, vehicleShowroomDatabase[key]);
        });
        mostSoldMount.innerHTML = mostSoldHTML;
    }

    // Helper function to parse price string (e.g. "$230,400" -> 230400)
    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
    }

    // 4. Dynamic Pagination, Brand Filter, Search, and Price Sorting Controller
    let lastRenderedPage = null;
    let lastFilterState = "";

    function updateShowroomPagination() {
        // Filter by brand and search query
        let visibleKeys = keys.filter(key => {
            const carData = vehicleShowroomDatabase[key];
            const matchesBrand = currentBrandFilter === "all" || (carData.class && carData.class.toLocaleLowerCase() === currentBrandFilter.toLocaleLowerCase()) || (carData.make && carData.make.toLocaleLowerCase() === currentBrandFilter.toLocaleLowerCase());
            const matchesSearch = carData.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
            return matchesBrand && matchesSearch;
        });

        // Sort by price if requested
        if (currentSortOrder === "low-high") {
            visibleKeys.sort((a, b) => parsePrice(vehicleShowroomDatabase[a].price) - parsePrice(vehicleShowroomDatabase[b].price));
        } else if (currentSortOrder === "high-low") {
            visibleKeys.sort((a, b) => parsePrice(vehicleShowroomDatabase[b].price) - parsePrice(vehicleShowroomDatabase[a].price));
        }

        const totalPages = Math.ceil(visibleKeys.length / itemsPerPage);

        if (activePage > totalPages && totalPages > 0) {
            activePage = totalPages;
        } else if (activePage < 1) {
            activePage = 1;
        }

        // Create a unique signature of the current filter/sort state
        const currentStateSignature = `${currentBrandFilter}-${currentSearchQuery}-${currentSortOrder}-${activePage}`;

        // If the grid content hasn't changed, STOP here so it doesn't reload images
        if (lastFilterState === currentStateSignature && cardMountNode.innerHTML.trim() !== "") {
            return;
        }
        lastFilterState = currentStateSignature;

        const indexStart = (activePage - 1) * itemsPerPage;
        const indexEnd = indexStart + itemsPerPage;
        const pageSelection = visibleKeys.slice(indexStart, indexEnd);

        // Update Results Counter Text
        if (showroomCounter) {
            if (visibleKeys.length === 0) {
                showroomCounter.textContent = "Showing 0 vehicles";
            } else {
                showroomCounter.textContent = `Showing ${indexStart + 1}–${Math.min(indexEnd, visibleKeys.length)} of ${visibleKeys.length} vehicles`;
            }
        }

        // Render Grid or Empty State
        let gridHTML = "";
        if (pageSelection.length === 0) {
            gridHTML = `<div class="text-center text-secondary py-5 w-100"><h5 class="fw-light"> No luxury vehicles found matching your criteria.</h5></div>`;
        } else {
            pageSelection.forEach(key => {
                const carData = vehicleShowroomDatabase[key];
                gridHTML += generateShowroomCard(key, carData);
            });
        }

        if (cardMountNode) {
            cardMountNode.innerHTML = gridHTML;
        }


        if (!paginationContainer) return;
        paginationContainer.innerHTML = "";
        if (totalPages <= 1) return;

        // Helper function to create compact page items
        const createPageItem = (pageText, targetPage, isDisabled = false, isActive = false) => {
            const li = document.createElement("li");
            li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${pageText}</a>`;
            if (!isDisabled && !isActive) {
                li.addEventListener("click", (e) => {
                    e.preventDefault();
                    activePage = targetPage;
                    updateShowroomPagination();
                });
            }
            return li;
        };

        // Previous Button
        paginationContainer.appendChild(createPageItem("&laquo;", activePage - 1, activePage === 1));

        // Compact Pagination Window Logic (Shows First, Last, Current, and neighbors)
        let pagesToShow = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= activePage - 1 && i <= activePage + 1)
            ) {
                pagesToShow.push(i);
            }
        }

        let prevPage = null;
        pagesToShow.forEach(page => {
            if (prevPage && page - prevPage > 1) {
                const ellipsisLi = document.createElement("li");
                ellipsisLi.className = "page-item disabled";
                ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
                paginationContainer.appendChild(ellipsisLi);
            }
            paginationContainer.appendChild(createPageItem(page, page, false, page === activePage));
            prevPage = page;
        });

        // Next Button
        paginationContainer.appendChild(createPageItem("&raquo;", activePage + 1, activePage === totalPages));
    }

    // 5. Bind Filter Buttons Click Triggers
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                filterButtons.forEach(b => b.classList.remove("active", "selected"));
                this.classList.add("active", "selected");

                currentBrandFilter = this.getAttribute("data-filter") || "all";
                activePage = 1;
                updateShowroomPagination();
            });
        });
    }

    // 6. Bind Search Input Listener
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value.trim();
            activePage = 1;
            updateShowroomPagination();
        });
    }

    // 7. Bind Price Sort Listener
    if (priceSortSelect) {
        priceSortSelect.addEventListener("change", (e) => {
            currentSortOrder = e.target.value;
            activePage = 1;
            updateShowroomPagination();
        });
    }

    

    // 9. Initial catalog load call
    updateShowroomPagination();
});