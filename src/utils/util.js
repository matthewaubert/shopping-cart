/**
 * restrict input num btw min and max
 * @param {number} num 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * format input number to USD
 * @param {number} price (e.g. 57.3)
 * @returns {string} (e.g. '$57.30')
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * round input number to nearest half integer
 * @param {number} num (e.g. 3.7)
 * @returns {number} (e.g. 3.5)
 */
export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
