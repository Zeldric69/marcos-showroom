import React, { useState, useEffect, useMemo } from 'react';
import './collection.css';
import '../main/shared.css';
import { getVehicleImage, vehicleShowroomDatabase } from './carDashboard.js';

export default function Collection() {
    const [activePage, setActivePage] = useState(1);
    const [currentBrandFilter, setCurrentBrandFilter] = useState('all');
    const [currentSearchQuery, setCurrentSearchQuery] = useState('');
    const [currentSortOrder, setCurrentSortOrder] = useState('default');
    const [selectedCar, setSelectedCar] = useState(null);

    const itemsPerPage = 12;
    const keys = useMemo(() => Object.keys(vehicleShowroomDatabase), []);

    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    // Helper to format/parse price
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
    };

    // Filter and Sort Keys
    const visibleKeys = useMemo(() => {
        let filtered = keys.filter(key => {
            const carData = vehicleShowroomDatabase[key];
            const matchesBrand = currentBrandFilter === "all" || 
                (carData.class && carData.class.toLowerCase() === currentBrandFilter.toLowerCase()) || 
                (carData.make && carData.make.toLowerCase() === currentBrandFilter.toLowerCase());
            const matchesSearch = carData.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
            return matchesBrand && matchesSearch;
        });

        if (currentSortOrder === "low-high") {
            filtered.sort((a, b) => parsePrice(vehicleShowroomDatabase[a].price) - parsePrice(vehicleShowroomDatabase[b].price));
        } else if (currentSortOrder === "high-low") {
            filtered.sort((a, b) => parsePrice(vehicleShowroomDatabase[b].price) - parsePrice(vehicleShowroomDatabase[a].price));
        }

        return filtered;
    }, [keys, currentBrandFilter, currentSearchQuery, currentSortOrder]);

    const totalPages = Math.ceil(visibleKeys.length / itemsPerPage);
    const paginatedKeys = visibleKeys.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    // Random Best Sellers & Last 3 New Releases
    const newReleases = keys.slice(-3);
    const mostSold = useMemo(() => [...keys].sort(() => 0.5 - Math.random()).slice(0, 3), [keys]);

    // Card Renderer Helper Component matching your generator function
    const renderCarCard = (key, car) => (
        <div className="col" key={key}>
            <div className="card bg-dark text-white border-secondary h-100 shadow-sm vehicle-card">
                <img loading="lazy" src={getVehicleImage(car)} className="card-img-top" alt={car.name} style={{ height: '220px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{car.name}</h5>
                    <p className="text-warning fw-bold mb-2">{car.price}</p>
                    <p className="card-text text-muted small mb-4" style={{ fontSize: '0.85rem' }}>{car.desc}</p>
                    <button 
                        className="btn btn-outline-warning btn-sm mt-auto w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#configuratorModal"
                        onClick={() => setSelectedCar(car)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="collection-page-wrapper bg-dark text-white">
            <div className="ng"></div>

            {/* --- HERO BANNER --- */}
            <div className="service-hero-stats-wrapper position-relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=1940&auto=format&fit=crop&q=100" 
                    className="hero-bg-img w-100" 
                    alt="Fleet Background"
                    style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.4)' }} 
                />
                <div className="hero-overlay"></div>
                <div className="container banner-text-holder text-center w-100 position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
                    <h1 className="display-3 text-white fw-bold text-uppercase">The Marcos Fleet</h1>
                    <p className="accent-brand-text fw-bold text-uppercase mt-2">Explore New Arrivals, Best Sellers, and Brand Inventories</p>
                </div>
            </div>

            <section className="py-5 bg-dark text-white">
                <div className="container py-4">

                    {/* --- NEW RELEASES SECTION --- */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-uppercase mb-4" style={{ color: '#c5a059' }}>New Releases</h3>
                        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                            {newReleases.map(key => renderCarCard(key, vehicleShowroomDatabase[key]))}
                        </div>
                    </div>

                    {/* --- MOST SOLD SECTION --- */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-uppercase mb-4" style={{ color: '#c5a059' }}>Best Sellers & Most Sold</h3>
                        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                            {mostSold.map(key => renderCarCard(key, vehicleShowroomDatabase[key]))}
                        </div>
                    </div>

                    <hr className="border-secondary mb-5" />

                    {/* --- SEARCH & SORT CONTROLS --- */}
                    <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
                        <div className="search-box-wrapper position-relative" style={{ minWidth: '280px' }}>
                            <input 
                                type="text"
                                className="form-control bg-dark text-white border-secondary ps-5"
                                placeholder="Search models (e.g. 911, Artura)..."
                                value={currentSearchQuery}
                                onChange={(e) => { setCurrentSearchQuery(e.target.value); setActivePage(1); }}
                                style={{ borderColor: '#23382c', fontSize: '0.9rem' }}
                            />
                            <i className="fas fa-search text-warning position-absolute top-50 translate-middle-y start-0 ms-3"></i>
                        </div>

                        <select 
                            className="form-select bg-dark text-white border-secondary"
                            value={currentSortOrder}
                            onChange={(e) => { setCurrentSortOrder(e.target.value); setActivePage(1); }}
                            style={{ width: 'auto', borderColor: '#23382c', fontSize: '0.9rem' }}
                        >
                            <option value="default">Sort by: Featured</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>

                    {/* --- BRAND FILTER BUTTONS --- */}
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5 catalog-filter-nav">
                        {['all', 'porsche', 'audi', 'mclaren', 'bmw', 'mercedes', 'ferrari', 'lamborghini', 'aston', 'bentley', 'rolls', 'lotus', 'koenigsegg', 'bugatti', 'pagani', 'maserati'].map(brand => (
                            <button 
                                key={brand}
                                className={`btn filter-brand-btn text-capitalize ${currentBrandFilter === brand ? 'active selected' : ''}`}
                                onClick={() => { setCurrentBrandFilter(brand); setActivePage(1); }}
                            >
                                {brand === 'all' ? 'All Collection' : brand}
                            </button>
                        ))}
                    </div>

                    {/* --- RESULTS COUNTER --- */}
                    <div className="text-center text-muted mb-3" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                        {visibleKeys.length === 0 ? "Showing 0 vehicles" : `Showing ${(activePage - 1) * itemsPerPage + 1}–${Math.min(activePage * itemsPerPage, visibleKeys.length)} of ${visibleKeys.length} vehicles`}
                    </div>

                    {/* --- MAIN COLLECTION GRID --- */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 justify-content-center mb-5">
                        {paginatedKeys.length === 0 ? (
                            <div className="text-center text-secondary py-5 w-100">
                                <h5 className="fw-light">No luxury vehicles found matching your criteria.</h5>
                            </div>
                        ) : (
                            paginatedKeys.map(key => renderCarCard(key, vehicleShowroomDatabase[key]))
                        )}
                    </div>

                    {/* --- PAGINATION --- */}
                    {totalPages > 1 && (
                        <nav className="d-flex justify-content-center mt-4">
                            <ul className="pagination justify-content-center custom-pagination shadow">
                                <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setActivePage(p => Math.max(p - 1, 1))}>&laquo;</button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    if (page === 1 || page === totalPages || (page >= activePage - 1 && page <= activePage + 1)) {
                                        return (
                                            <li key={page} className={`page-item ${activePage === page ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setActivePage(page)}>{page}</button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                                <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setActivePage(p => Math.min(p + 1, totalPages))}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    )}

                </div>
            </section>

            {/* --- CONFIGURATOR MODAL --- */}
            <div className="modal fade text-dark" id="configuratorModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark text-white border border-secondary shadow-lg">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title fw-bold">Vehicle Details</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedCar && (
                                <div className="row align-items-center">
                                    <div className="col-md-5 mb-3 mb-md-0">
                                        <img loading="lazy" src={getVehicleImage(selectedCar)} className="img-fluid rounded shadow border border-secondary w-100" alt="Vehicle" style={{ height: '260px', objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-7">
                                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#c5a059' }}>{selectedCar.name} - {selectedCar.price}</h6>
                                        <p className="text-light mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCar.desc}</p>
                                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#c5a059' }}>Vehicle Features Sheet</h6>
                                        <div style={{ maxHeight: '160px', overflowY: 'auto' }} className="custom-scrollbar">
                                            <ul className="text-light ps-3 mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                                                {selectedCar.features && selectedCar.features.map((feat, index) => (
                                                    <li key={index}>{feat}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer border-top border-secondary d-flex justify-content-between">
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-outline-warning btn-sm"><i className="fas fa-shopping-cart me-1"></i> Book Now</button>
                                <button type="button" className="btn btn-outline-light btn-sm"><i className="fas fa-tachometer-alt me-1"></i> Test Drive</button>
                            </div>
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}