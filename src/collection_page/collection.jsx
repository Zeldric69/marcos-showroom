import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './collection.css';
import '../main/shared.css';
import { getVehicleImage } from './vehicleImages.js';
import { createVehicleRequest } from '../services/vehicleRequests.js';
import { subscribeToVehicles } from '../services/vehicles.js';

export default function Collection({ user, onOpenAuth }) {
    const [activePage, setActivePage] = useState(1);
    const [currentBrandFilter, setCurrentBrandFilter] = useState('all');
    const [currentSearchQuery, setCurrentSearchQuery] = useState('');
    const [currentSortOrder, setCurrentSortOrder] = useState('default');
    const [selectedCar, setSelectedCar] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');
    const [requestError, setRequestError] = useState('');
    const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [vehiclesLoading, setVehiclesLoading] = useState(true);
    const [vehiclesError, setVehiclesError] = useState('');

    useEffect(() => {
        setVehiclesLoading(true);
        return subscribeToVehicles(
            (nextVehicles) => {
                setVehicles(nextVehicles);
                setVehiclesLoading(false);
                setVehiclesError('');
            },
            (loadError) => {
                console.error('Vehicle loading error:', loadError);
                setVehiclesLoading(false);
                setVehiclesError('The showroom inventory is temporarily unavailable.');
            }
        );
    }, []);

    useEffect(() => {
        if (!isDetailsModalOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            document.getElementById('configuratorModal')?.scrollTo(0, 0);
        });

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isDetailsModalOpen]);

    const itemsPerPage = 12;
    const vehicleMap = useMemo(() => Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle])), [vehicles]);
    const keys = useMemo(() => vehicles.map((vehicle) => vehicle.id), [vehicles]);

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
            const carData = vehicleMap[key];
            const matchesBrand = currentBrandFilter === "all" || 
                (carData.class && carData.class.toLowerCase() === currentBrandFilter.toLowerCase()) || 
                (carData.make && carData.make.toLowerCase() === currentBrandFilter.toLowerCase());
            const matchesSearch = carData.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
            return matchesBrand && matchesSearch;
        });

        if (currentSortOrder === "low-high") {
            filtered.sort((a, b) => parsePrice(vehicleMap[a].price) - parsePrice(vehicleMap[b].price));
        } else if (currentSortOrder === "high-low") {
            filtered.sort((a, b) => parsePrice(vehicleMap[b].price) - parsePrice(vehicleMap[a].price));
        }

        return filtered;
    }, [keys, vehicleMap, currentBrandFilter, currentSearchQuery, currentSortOrder]);

    const totalPages = Math.ceil(visibleKeys.length / itemsPerPage);
    const paginatedKeys = visibleKeys.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    // Random Best Sellers & Last 3 New Releases
    const newReleases = keys.slice(-3);
    const mostSold = useMemo(() => [...keys].sort(() => 0.5 - Math.random()).slice(0, 3), [keys]);

    const handleVehicleRequest = async (actionType) => {
        setRequestMessage('');
        setRequestError('');

        if (!user) {
            setRequestError('Please sign in before submitting a vehicle request.');
            onOpenAuth?.();
            return;
        }

        setIsRequestSubmitting(true);
        try {
            await createVehicleRequest({ user, actionType, vehicle: selectedCar });
            setRequestMessage(actionType === 'purchase'
                ? 'Your purchase request has been recorded. Our team will contact you shortly.'
                : 'Your test-drive request has been recorded. Our team will contact you shortly.');
        } catch (error) {
            console.error('Vehicle request error:', error);
            setRequestError('We could not save your request. Please ensure the showroom database is enabled and try again.');
        } finally {
            setIsRequestSubmitting(false);
        }
    };

    // Card Renderer Helper Component matching your generator function
    const renderCarCard = (key, car) => (
        <div className="col" key={key}>
            <div className="card bg-dark text-white border-secondary h-100 shadow-sm vehicle-card">
                <img loading="lazy" decoding="async" src={getVehicleImage(car)} className="card-img-top" alt={car.name} style={{ height: '190px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mb-1">{car.name}</h5>
                    <p className="text-warning fw-bold mb-1 numeric-text">{car.price}</p>
                    <p className="card-text text-muted small mb-2 text-uppercase">{car.class || 'Luxury vehicle'}</p>
                    <button 
                        className="btn btn-outline-warning btn-sm mt-auto w-100"
                        onClick={() => {
                            setSelectedCar({ ...car, id: key });
                            setIsDetailsModalOpen(true);
                        }}
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
                <img decoding="async"
                    src="https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=1280&auto=format&fit=crop&q=75" 
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
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                            {newReleases.map(key => renderCarCard(key, vehicleMap[key]))}
                        </div>
                    </div>

                    {/* --- MOST SOLD SECTION --- */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-uppercase mb-4" style={{ color: '#c5a059' }}>Best Sellers & Most Sold</h3>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                            {mostSold.map(key => renderCarCard(key, vehicleMap[key]))}
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
                            paginatedKeys.map(key => renderCarCard(key, vehicleMap[key]))
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
            {isDetailsModalOpen && selectedCar && createPortal((
            <div className="modal fade show d-block text-dark" id="configuratorModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1060 }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark text-white border border-secondary shadow-lg">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title fw-bold">Vehicle Details</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setIsDetailsModalOpen(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {requestMessage && <div className="alert alert-success py-2" role="status">{requestMessage}</div>}
                            {requestError && <div className="alert alert-danger py-2" role="alert">{requestError}</div>}
                            <div className="row align-items-center">
                                    <div className="col-md-5 mb-3 mb-md-0">
                                        <img loading="lazy" decoding="async" src={getVehicleImage(selectedCar)} className="img-fluid rounded shadow border border-secondary w-100" alt="Vehicle" style={{ height: '260px', objectFit: 'cover' }} />
                                    </div>
                                    <div className="col-md-7">
                                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#c5a059' }}>{selectedCar.name} - <span className="numeric-text">{selectedCar.price}</span></h6>
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
                        </div>
                        <div className="modal-footer border-top border-secondary d-flex justify-content-between">
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-outline-warning btn-sm" onClick={() => handleVehicleRequest('purchase')} disabled={isRequestSubmitting}><i className="fas fa-shopping-cart me-1"></i> {isRequestSubmitting ? 'Saving...' : 'Book Now'}</button>
                                <button type="button" className="btn btn-outline-light btn-sm" onClick={() => handleVehicleRequest('testDrive')} disabled={isRequestSubmitting}><i className="fas fa-tachometer-alt me-1"></i> Test Drive</button>
                            </div>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsDetailsModalOpen(false)}>Close Details</button>
                        </div>
                    </div>
                </div>
            </div>
            ), document.body)}
        </div>
    );
}