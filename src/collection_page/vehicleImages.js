export const getVehicleImage = (vehicle) => {
    const source = vehicle?.img || vehicle?.image || vehicle?.colors?.[0]?.img || '';
    if (source.includes('commons.wikimedia.org/wiki/Special:FilePath/')) {
        return `${source}${source.includes('?') ? '&' : '?'}width=640`;
    }
    return source;
};
