const ALLOWED_FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const ALLOWED_TRANSMISSIONS = ["Manual", "Automatic"];

const CURRENT_YEAR = new Date().getFullYear();

function validateCarFields(body, isUpdate = false) {
    const errors = [];
    const {
        brand,
        model,
        year,
        price,
        fuelType,
        transmission,
        kilometersDriven,
        color,
        description,
        imageUrl,
    } = body;

    if (!isUpdate || brand !== undefined) {
        if (!brand || typeof brand !== "string" || !brand.trim()) {
            errors.push("Brand is required.");
        }
    }

    if (!isUpdate || model !== undefined) {
        if (!model || typeof model !== "string" || !model.trim()) {
            errors.push("Model is required.");
        }
    }

    if (!isUpdate || year !== undefined) {
        const yearNum = Number(year);
        if (!Number.isInteger(yearNum) || yearNum < 1900 || yearNum > CURRENT_YEAR + 1) {
            errors.push(`Year must be a valid integer between 1900 and ${CURRENT_YEAR + 1}.`);
        }
    }

    if (!isUpdate || price !== undefined) {
        const priceNum = Number(price);
        if (Number.isNaN(priceNum) || priceNum <= 0) {
            errors.push("Price must be a positive number.");
        }
    }

    if (!isUpdate || fuelType !== undefined) {
        if (!fuelType || typeof fuelType !== "string" || !ALLOWED_FUEL_TYPES.includes(fuelType)) {
            errors.push(`Fuel type must be one of: ${ALLOWED_FUEL_TYPES.join(", ")}.`);
        }
    }

    if (!isUpdate || transmission !== undefined) {
        if (
            !transmission ||
            typeof transmission !== "string" ||
            !ALLOWED_TRANSMISSIONS.includes(transmission)
        ) {
            errors.push(`Transmission must be one of: ${ALLOWED_TRANSMISSIONS.join(", ")}.`);
        }
    }

    if (kilometersDriven !== undefined) {
        const km = Number(kilometersDriven);
        if (!Number.isInteger(km) || km < 0) {
            errors.push("Kilometers driven must be a non-negative integer.");
        }
    }

    if (color !== undefined && color !== null && typeof color !== "string") {
        errors.push("Color must be a string.");
    }

    if (description !== undefined && description !== null && typeof description !== "string") {
        errors.push("Description must be a string.");
    }

    if (imageUrl !== undefined && imageUrl !== null && typeof imageUrl !== "string") {
        errors.push("Image URL must be a string.");
    }

    return errors;
}

function sanitizeCarBody(body) {
    const sanitized = {};

    if (body.brand !== undefined) sanitized.brand = body.brand.trim();
    if (body.model !== undefined) sanitized.model = body.model.trim();
    if (body.year !== undefined) sanitized.year = Number(body.year);
    if (body.price !== undefined) sanitized.price = Number(body.price);
    if (body.fuelType !== undefined) sanitized.fuelType = body.fuelType;
    if (body.transmission !== undefined) sanitized.transmission = body.transmission;
    if (body.kilometersDriven !== undefined) sanitized.kilometersDriven = Number(body.kilometersDriven);
    if (body.color !== undefined) sanitized.color = body.color ? body.color.trim() : null;
    if (body.description !== undefined) sanitized.description = body.description ? body.description.trim() : null;
    if (body.imageUrl !== undefined) sanitized.imageUrl = body.imageUrl ? body.imageUrl.trim() : null;

    return sanitized;
}

function validateCreateCar(req, res, next) {
    const errors = validateCarFields(req.body, false);

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    req.body = sanitizeCarBody(req.body);
    next();
}

function validateUpdateCar(req, res, next) {
    const errors = validateCarFields(req.body, true);

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    req.body = sanitizeCarBody(req.body);
    next();
}

function parseCarFilters(query) {
    const filters = {};

    if (query.search) filters.search = String(query.search).trim();
    if (query.brand) filters.brand = String(query.brand).trim();
    if (query.model) filters.model = String(query.model).trim();
    if (query.fuelType) filters.fuelType = String(query.fuelType);
    if (query.transmission) filters.transmission = String(query.transmission);

    if (query.minPrice !== undefined) {
        const minPrice = Number(query.minPrice);
        if (!Number.isNaN(minPrice)) filters.minPrice = minPrice;
    }

    if (query.maxPrice !== undefined) {
        const maxPrice = Number(query.maxPrice);
        if (!Number.isNaN(maxPrice)) filters.maxPrice = maxPrice;
    }

    if (query.year !== undefined) {
        const year = Number(query.year);
        if (Number.isInteger(year)) filters.year = year;
    }

    if (query.minYear !== undefined) {
        const minYear = Number(query.minYear);
        if (Number.isInteger(minYear)) filters.minYear = minYear;
    }

    if (query.maxYear !== undefined) {
        const maxYear = Number(query.maxYear);
        if (Number.isInteger(maxYear)) filters.maxYear = maxYear;
    }

    return filters;
}

module.exports = {
    validateCreateCar,
    validateUpdateCar,
    parseCarFilters,
    ALLOWED_FUEL_TYPES,
    ALLOWED_TRANSMISSIONS,
};
