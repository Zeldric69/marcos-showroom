const localDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function validateBooking(values) {
    const problems = {};
    const dateValue = String(values.preferredDate || '');
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
        ? new Date(`${dateValue}T00:00:00`)
        : null;

    if (!parsedDate || Number.isNaN(parsedDate.getTime()) || localDateString(parsedDate) !== dateValue) {
        problems.preferredDate = 'Choose the date you would like to visit.';
    } else if (dateValue < localDateString(new Date())) {
        problems.preferredDate = 'That date has already passed. Please choose today or a later date.';
    }

    if (String(values.carModel || '').trim().length < 3) {
        problems.carModel = 'Tell us the make and model, for example "Porsche 911 GT3".';
    }

    return Object.keys(problems).length ? problems : null;
}

export function validateVehicle(form) {
    const problems = {};
    const price = String(form.price || '').trim();

    if (!String(form.name || '').trim()) {
        problems.name = 'Enter the vehicle name, for example "Porsche 911 GT3".';
    }

    if (!/^(?:[$€]\s?)?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$|^price on request$/i.test(price)) {
        problems.price = 'Enter the price using numbers only, for example $230,500, or use "Price on request".';
    }

    if (!String(form.class || '').trim()) {
        problems.class = 'Add the brand so the car appears under the right filter.';
    }

    if (form.image && !/^https:\/\//i.test(String(form.image).trim())) {
        problems.image = 'The image link must start with https://';
    }

    return Object.keys(problems).length ? problems : null;
}
