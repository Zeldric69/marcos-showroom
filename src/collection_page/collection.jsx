import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import './collection.css';
import '../main/shared.css';
import { getVehicleImage, getVehicleImageCredit } from './vehicleImages.js';
import { createVehicleRequest } from '../services/vehicleRequests.js';
import { useVehicles } from './useVehicles.js';
import { SmartImage } from '../main/SmartImage.jsx';
import { EmptyState, ErrorState, LoadingButton, SkeletonGrid, SuccessState, offlineError, signInRequired, useAsyncAction } from '../main/states.jsx';

const parsePrice = (priceStr) => {
    if (!priceStr) return null;
    const amount = parseFloat(priceStr.replace(/[^0-9.-]+/g, ''));
    if (!Number.isFinite(amount)) return null;
    return { amount, currency: priceStr.includes('€') ? 'EUR' : 'USD' };
};

const comparePrice = (firstPriceText, secondPriceText, direction) => {
    const firstPrice = parsePrice(firstPriceText);
    const secondPrice = parsePrice(secondPriceText);
    if (!firstPrice || !secondPrice) return firstPrice ? -1 : secondPrice ? 1 : 0;
    if (firstPrice.currency !== secondPrice.currency) return firstPrice.currency === 'EUR' ? 1 : -1;
    return (firstPrice.amount - secondPrice.amount) * direction;
};

export default function Collection({ user, onOpenAuth, isAdmin }) {
    const [activePage, setActivePage] = useState(1);
    const [currentBrandFilter, setCurrentBrandFilter] = useState('all');
    const [currentSearchQuery, setCurrentSearchQuery] = useState('');
    const [currentSortOrder, setCurrentSortOrder] = useState('default');
    const [selectedCar, setSelectedCar] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const requestAction = useAsyncAction({ context: 'request' });
    const lastAction = useRef('purchase');
    const { vehicles, status, error: loadError, retry } = useVehicles();
    const modalRef = useRef(null);

    const clearFilters = () => {
        setCurrentSearchQuery('');
        setCurrentBrandFilter('all');
        setCurrentSortOrder('default');
        setActivePage(1);
    };

    useEffect(() => {
        if (!isDetailsModalOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const modal = modalRef.current;
        const focusableElements = () => modal?.querySelectorAll('button:not(:disabled)') || [];
        focusableElements()[0]?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setIsDetailsModalOpen(false);
            if (event.key !== 'Tab') return;
            const elements = focusableElements();
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        requestAnimationFrame(() => {
            document.getElementById('configuratorModal')?.scrollTo(0, 0);
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDetailsModalOpen]);

    const itemsPerPage = 12;
    const vehicleMap = useMemo(() => Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle])), [vehicles]);
    const keys = useMemo(() => vehicles.map((vehicle) => vehicle.id), [vehicles]);
    const keysRef = useRef(keys);
    keysRef.current = keys;

    // Filter and Sort Keys
    const visibleKeys = useMemo(() => {
        let filtered = keys.filter(key => {
            const carData = vehicleMap[key];
            if (!carData) return false;
            const matchesBrand = currentBrandFilter === "all" || 
                (carData.class && carData.class.toLowerCase() === currentBrandFilter.toLowerCase()) || 
                (carData.make && carData.make.toLowerCase() === currentBrandFilter.toLowerCase());
            const matchesSearch = String(carData.name || '').toLowerCase().includes(currentSearchQuery.toLowerCase());
            return matchesBrand && matchesSearch;
        });

        if (currentSortOrder === "low-high") {
            filtered.sort((a, b) => comparePrice(vehicleMap[a]?.price, vehicleMap[b]?.price, 1));
        } else if (currentSortOrder === "high-low") {
            filtered.sort((a, b) => comparePrice(vehicleMap[a]?.price, vehicleMap[b]?.price, -1));
        }

        return filtered;
    }, [keys, vehicleMap, currentBrandFilter, currentSearchQuery, currentSortOrder]);

    const totalPages = Math.ceil(visibleKeys.length / itemsPerPage);
    const paginatedKeys = visibleKeys.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    // Best sellers stay stable while inventory records are updated.
    const newReleases = keys.slice(-3);
    // Keep the sample stable unless the inventory size changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const mostSold = useMemo(() => [...keysRef.current].sort(() => 0.5 - Math.random()).slice(0, 3), [keys.length]);

    const handleVehicleRequest = async (actionType) => {
        lastAction.current = actionType;
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            requestAction.fail(offlineError());
            return;
        }
        if (!user) {
            requestAction.fail(signInRequired());
            onOpenAuth?.();
            return;
        }

        await requestAction.run(async () => {
            await createVehicleRequest({ user, actionType, vehicle: selectedCar });
            return actionType;
        });
    };

    // Card Renderer Helper Component matching your generator function
    const renderCarCard = (key, car) => {
        if (!car) return null;
        const imageSrc = getVehicleImage(car);
        return (
            <div className="col" key={key}>
                <div className="card bg-page text-strong border-line h-100 shadow-sm vehicle-card">
                    <SmartImage key={imageSrc} src={imageSrc} className="card-img-top" alt={car.name} style={{ height: '190px' }} />
                    {getVehicleImageCredit(car) && <small className="px-3 pt-2 text-soft">Photo: <a href={getVehicleImageCredit(car).sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent">{getVehicleImageCredit(car).author}</a> · <a href={getVehicleImageCredit(car).licenseUrl} target="_blank" rel="noopener noreferrer" className="text-accent">{getVehicleImageCredit(car).license}</a></small>}
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold mb-1">{car.name}</h5>
                        <p className="text-accent fw-bold mb-1 numeric-text">{car.price}</p>
                        <p className="card-text text-soft small mb-2 text-uppercase">{car.class || 'Luxury vehicle'}</p>
                        <button
                            className="btn btn-brand-outline btn-sm mt-auto w-100"
                            onClick={() => {
                                setSelectedCar({ ...car, id: key });
                                requestAction.reset();
                                setIsDetailsModalOpen(true);
                            }}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="collection-page-wrapper bg-page text-strong">
            <div className="ng"></div>

            {/* --- HERO BANNER --- */}
            <div className="collection-hero-stats-wrapper position-relative overflow-hidden">
                <SmartImage
                    key="collection-hero"
                    src="https://images.unsplash.com/photo-1692863211226-cbba732754c9?w=1280&auto=format&fit=crop&q=75"
                    className="hero-bg-img w-100" 
                    alt="Fleet Background"
                    style={{ height: '380px', filter: 'brightness(0.35)' }}
                />
                <div className="hero-overlay"></div>
                <div className="container banner-text-holder text-center w-100 position-absolute start-50 translate-middle" style={{ top: '44%', zIndex: 2 }}>
                    <h1 className="display-3 text-white fw-bold text-uppercase">The Marcos Fleet</h1>
                    <p className="accent-brand-text fw-bold text-uppercase mt-2">Explore New Arrivals, Best Sellers, and Brand Inventories</p>
                </div>
            </div>

            <section className="py-5">
                <div className="container py-4">

                    {(status === 'live' || status === 'saved') && (
                        <>
                    {/* --- NEW RELEASES SECTION --- */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-uppercase mb-4" style={{ color: 'var(--accent)' }}>New Releases</h3>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                            {newReleases.map(key => renderCarCard(key, vehicleMap[key]))}
                        </div>
                    </div>

                    {/* --- MOST SOLD SECTION --- */}
                    <div className="mb-5">
                        <h3 className="fw-bold text-uppercase mb-4" style={{ color: 'var(--accent)' }}>Best Sellers & Most Sold</h3>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                            {mostSold.map(key => renderCarCard(key, vehicleMap[key]))}
                        </div>
                    </div>
                        </>
                    )}

                    <hr className="border-secondary mb-5" />

                    {/* --- SEARCH & SORT CONTROLS --- */}
                    <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
                        <div className="search-box-wrapper position-relative" style={{ minWidth: '280px' }}>
                            <input 
                                type="text"
                                className="form-control ps-5"
                                placeholder="Search models (e.g. 911, Artura)..."
                                value={currentSearchQuery}
                                onChange={(e) => { setCurrentSearchQuery(e.target.value); setActivePage(1); }}
                                style={{ fontSize: '0.9rem' }}
                            />
                            <i className="fas fa-search text-accent position-absolute top-50 translate-middle-y start-0 ms-3"></i>
                        </div>

                        <select 
                            className="form-select"
                            value={currentSortOrder}
                            onChange={(e) => { setCurrentSortOrder(e.target.value); setActivePage(1); }}
                            style={{ width: 'auto', fontSize: '0.9rem' }}
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

                    {status === 'saved' && (
                        <div className="alert alert-secondary text-center small" role="status">
                            Showing our saved catalogue while the live inventory reconnects. Prices and availability may differ.
                        </div>
                    )}

                    {/* --- MAIN COLLECTION GRID --- */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 justify-content-center mb-5">
                        {status === 'loading' ? (
                            <SkeletonGrid count={12} columnClass="col" />
                        ) : status === 'error' ? (
                            <div className="col-12"><ErrorState error={loadError} onRetry={retry} /></div>
                        ) : status === 'empty' ? (
                            <div className="col-12">
                                <EmptyState
                                    icon="fa-car-side"
                                    title="The showroom is being restocked"
                                    message={isAdmin
                                        ? 'There are no vehicles in the database yet. Add one from the admin dashboard, or run npm run seed:vehicles to import the full catalogue.'
                                        : 'New arrivals are on their way. Please check back soon, or contact the showroom to ask about upcoming vehicles.'}
                                    action={isAdmin
                                        ? { label: 'Open admin dashboard', to: '/profile#admin-panel' }
                                        : { label: 'Contact the showroom', href: '#contact-footer' }}
                                />
                            </div>
                        ) : paginatedKeys.length === 0 ? (
                            <div className="col-12">
                                <EmptyState
                                    icon="fa-magnifying-glass"
                                    title="No cars match your search"
                                    message="Try a different model name, or clear the filters to see the full collection."
                                    action={{ label: 'Clear filters', onClick: clearFilters }}
                                />
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
            <div ref={modalRef} className="modal fade show d-block text-dark" id="configuratorModal" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="vehicle-details-title" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1060 }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content shadow-lg">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 id="vehicle-details-title" className="modal-title fw-bold">Vehicle Details</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setIsDetailsModalOpen(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {requestAction.status === 'success' && (
                                <SuccessState
                                    compact
                                    title={requestAction.data === 'purchase' ? 'Purchase request sent' : 'Test drive requested'}
                                    message="Our team will contact you shortly. You can follow it under My Vehicles / Bookings in your profile."
                                />
                            )}
                            {requestAction.status === 'error' && (
                                <ErrorState
                                    compact
                                    error={requestAction.error}
                                    onRetry={() => handleVehicleRequest(lastAction.current)}
                                    onDismiss={requestAction.reset}
                                />
                            )}
                            <div className="row align-items-center">
                                    <div className="col-md-5 mb-3 mb-md-0">
                                        <SmartImage key={getVehicleImage(selectedCar)} src={getVehicleImage(selectedCar)} className="img-fluid rounded shadow border border-secondary w-100" alt={selectedCar.name} style={{ height: '260px' }} />
                                        {getVehicleImageCredit(selectedCar) && <small className="d-block mt-2 text-muted">Photo: <a href={getVehicleImageCredit(selectedCar).sourceUrl} target="_blank" rel="noopener noreferrer" className="text-warning">{getVehicleImageCredit(selectedCar).author}</a> · <a href={getVehicleImageCredit(selectedCar).licenseUrl} target="_blank" rel="noopener noreferrer" className="text-warning">{getVehicleImageCredit(selectedCar).license}</a></small>}
                                    </div>
                                    <div className="col-md-7">
                                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: 'var(--accent)' }}>{selectedCar.name} - <span className="numeric-text">{selectedCar.price}</span></h6>
                                        <p className="text-light mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{selectedCar.desc}</p>
                                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: 'var(--accent)' }}>Vehicle Features Sheet</h6>
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
                                <LoadingButton
                                    type="button"
                                    className="btn btn-outline-warning btn-sm"
                                    loading={requestAction.loading && lastAction.current === 'purchase'}
                                    loadingText="Sending..."
                                    disabled={requestAction.loading}
                                    onClick={() => handleVehicleRequest('purchase')}
                                >
                                    <i className="fas fa-shopping-cart me-1"></i> Book Now
                                </LoadingButton>
                                <LoadingButton
                                    type="button"
                                    className="btn btn-outline-light btn-sm"
                                    loading={requestAction.loading && lastAction.current === 'testDrive'}
                                    loadingText="Sending..."
                                    disabled={requestAction.loading}
                                    onClick={() => handleVehicleRequest('testDrive')}
                                >
                                    <i className="fas fa-tachometer-alt me-1"></i> Test Drive
                                </LoadingButton>
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