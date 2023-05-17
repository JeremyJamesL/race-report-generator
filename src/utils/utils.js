// Separate utility functions

// Convert to readable date
const convertDateToReadable = (userDate) => {
    const timestamp = new Date(userDate);
    const month = timestamp.toLocaleString('default', {month: 'long'});
    const day = timestamp.toLocaleString('default', {weekday: 'long'});
    const date = timestamp.getDate();
    const year = timestamp.getUTCFullYear();
    return `${day} ${month} ${date}, ${year}`;
}

// Convert seconds to min, seconds
const convertToMinSec = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result;
}

// Convert seconds to H:M:S
const convertSecondsToHMS = (s) => {
    return new Date(s * 1000).toISOString().slice(11,19);
}

// Convert distance to kms
const metresToKm = (m) => {
    return (m / 1000).toFixed(2);
}

export {convertDateToReadable, convertToMinSec, convertSecondsToHMS, metresToKm}