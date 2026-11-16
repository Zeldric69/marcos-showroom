import imageCredits from './vehicleImageCredits.json';
import { isLiteMode } from '../main/network.js';

const normalizeVehicleName = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const imageIdsByName = new Map(
    Object.keys(imageCredits).map((id) => [normalizeVehicleName(id), id])
);

const getLocalImageId = (vehicle) => {
    if (vehicle?.id && imageCredits[vehicle.id]) return vehicle.id;
    return imageIdsByName.get(normalizeVehicleName(vehicle?.name));
};

export const getVehicleImage = (vehicle, width = isLiteMode() ? 360 : 640) => {
    const customImage = (typeof vehicle?.image === 'string' && vehicle.image) || (typeof vehicle?.img === 'string' && vehicle.img) || '';
    if (customImage.startsWith('http')) return resizeImageUrl(customImage, width);

    const localImageId = getLocalImageId(vehicle);
    if (localImageId) {
        const size = width <= 360 ? 'lite' : 'standard';
        return `${import.meta.env.BASE_URL}vehicles/${size}/${encodeURIComponent(localImageId)}.webp`;
    }

    const firstColorImg = vehicle?.colors && Array.isArray(vehicle.colors) && vehicle.colors[0]?.img;
    const image = (typeof firstColorImg === 'string' && firstColorImg) || customImage || '';
    if (typeof image === 'string' && image.startsWith('http')) return resizeImageUrl(image, width);

    return typeof image === 'string' ? image : '';
};

const resizeImageUrl = (image, width) => {
    try {
        const imageUrl = new URL(image);
        if (imageUrl.hostname.endsWith('wikimedia.org')) {
            imageUrl.searchParams.set('width', String(width));
        } else if (imageUrl.hostname.endsWith('unsplash.com')) {
            imageUrl.searchParams.set('w', String(width));
            imageUrl.searchParams.set('q', '75');
        }
        return imageUrl.toString();
    } catch (error) {
        console.warn('Unable to resize vehicle image URL:', error);
        return image;
    }
};

export const getVehicleImageCredit = (vehicle) => imageCredits[getLocalImageId(vehicle)] || null;
