// Getting a time formatted in years, days, hours, etc
// Example: 1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds

const getDatesDifference = (date1, date2, allowPast = true) => {
    // allowPast indicates if we should return the difference even if date1 > date2

    // Date 2 must be greater than date 1
    const miliseconds1 = typeof (date1) == "string" ? Date.parse(date1) : date1;
    const miliseconds2 = typeof (date2) == "string" ? Date.parse(date2) : date2;

    let milisecondsDifference = miliseconds2 - miliseconds1;
    if (milisecondsDifference < 0) {
        if (allowPast) {
            // Do a simple swap
            milisecondsDifference = milisecondsDifference * (-1);
        } else {
            // Dates are not properly ordered
            // So lets parse the second date to its expiration format
            return getExpirationFormatted(miliseconds2);
        }

    }

    // Getting offset data
    const seconds = Math.floor(milisecondsDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Dirty stuff
    const secondsLeft = seconds % 60;
    const minutesLeft = minutes % 60;
    const hoursLeft = hours % 24;
    const daysLeft = days % 30;
    const monthsLeft = months % 12;

    // Get formatted string
    if (years > 0) return `${years} año${years > 1 ? "s" : ""}`;
    if (monthsLeft > 0) return `${monthsLeft} mes${monthsLeft > 1 ? "s" : ""}`;
    if (daysLeft > 0) return `${daysLeft} día${daysLeft > 1 ? "s" : ""}`;
    if (hoursLeft > 0) return `${hoursLeft} hora${hoursLeft > 1 ? "s" : ""}`;
    if (minutesLeft > 0) return `${minutesLeft} minuto${minutesLeft > 1 ? "s" : ""}`;
    if (secondsLeft > 0) return `${secondsLeft} segundo${secondsLeft > 1 ? "s" : ""}`;
    return "un momento"
}

const getExpirationFormatted = (date) => {
    const miliseconds = typeof (date) == "string" ? Date.parse(date) : date;
    const dateObj = new Date(miliseconds);

    return dateObj.toLocaleDateString(
        "en-US"
    )
}

const getDatetimeFormatted = (date) => {
    const miliseconds = typeof (date) == "string" ? Date.parse(date) : date;
    const dateObj = new Date(miliseconds);

    return dateObj.toLocaleString(
        "en-US"
    )
}

const getTimeLeft = (date, allowPast = true) => {
    const miliseconds = typeof (date) == "string" ? Date.parse(date) : date;
    const currentMilis = Date.now();

    return getDatesDifference(currentMilis, miliseconds, allowPast);
}

const getAnyTimePassed = (date) => {
    // Render for any past, present or future date
    const miliseconds = typeof (date) == "string" ? Date.parse(date) : date;
    const currentMilis = Date.now();

    if (miliseconds > currentMilis)
        // Target is in the future
        return `Tiempo faltante: ${getDatesDifference(currentMilis, miliseconds, false)}`;
    else
        return `Hace ${getDatesDifference(miliseconds, currentMilis, false)}`;
}

export {
    getDatesDifference,
    getExpirationFormatted,
    getDatetimeFormatted,
    getTimeLeft,
    getAnyTimePassed
}