export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
