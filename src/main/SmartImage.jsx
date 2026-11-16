import { useState, useRef, useEffect } from 'react';

export function SmartImage({ src, alt, className = '', style, priority = false }) {
    const [attempt, setAttempt] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
            setLoaded(true);
        }
    }, [src, attempt]);

    if (!src || attempt === 2) {
        return (
            <div className={`smart-img smart-img--fallback ${className}`} style={style} role="img" aria-label={alt}>
                <i className="fa-solid fa-car" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div className={`smart-img ${loaded ? 'is-loaded' : ''}`} style={style}>
            <img
                ref={imgRef}
                src={attempt === 0 ? src : src.split('?')[0]}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : 'lazy'}
                fetchpriority={priority ? 'high' : undefined}
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setAttempt((currentAttempt) => (
                    currentAttempt === 0 && src.includes('?') ? 1 : 2
                ))}
            />
        </div>
    );
}
