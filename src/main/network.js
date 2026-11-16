export const isLiteMode = () => {
    const connection = typeof navigator !== 'undefined' ? navigator.connection : undefined;
    return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType || '');
};

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
