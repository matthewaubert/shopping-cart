/**
 * calc total price of items in cart
 * @param {array} cart - array of 'item' objects w/ prices
 * @returns {number} - sum of price property of all 'item' objects
 */
export function calcCartTotal(cart) {
  return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

/**
 * calculate quantity of items in cart
 * @param {array} cart - array of 'item' objects w/ quantities
 * @returns {number} - sum of qty property of all 'item' objects
 */
export function calcQtyInCart(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * add, remove, change quantity of item in cart
 * @param {object} item - object with unique id and quantity
 * @param {array} cart - array of 'item' objects w/ unique ids
 * @returns {array} - shallow copy of cart with item changed
 */
export function changeCartItem(item, cart) {
  const itemIndex = findItemIndex(item.id, cart);
  const newCart = [...cart];

  // if item qty is 0 and item already in cart: remove from cart
  if (item.quantity < 1 && itemIndex >= 0) newCart.splice(itemIndex, 1);
  else {
    // if item already in cart: replace qty with new qty; else: add new item
    itemIndex >= 0
      ? (newCart[itemIndex].quantity = item.quantity)
      : newCart.push(item);
  }

  return newCart;
}

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
 * find item by its given id in given array
 * @param {*} id - a unique id
 * @param {array} array - array of 'item' objects w/ unique ids
 * @returns {object} - 'item' object
 */
function findItem(id, array) {
  return array.find((item) => item.id === id);
}

/**
 * find item index by its given id in given array
 * @param {*} id - a unique id
 * @param {array} array - array of 'item' objects w/ unique ids
 * @returns {number} - index in array
 */
function findItemIndex(id, array) {
  return array.findIndex((item) => item.id === id);
}

/**
 * find item quantity by its given id in given array
 * @param {*} id  - a unique id
 * @param {array} array - array of 'item' objects w/ unique ids
 * @returns {number} - quantity of item in array
 */
export function findItemQty(id, array) {
  const found = findItem(id, array);
  return found ? found.quantity : 0;
}

/**
 * format input number to USD
 * @param {number} price - (e.g. 57.3)
 * @returns {string} - (e.g. '$57.30')
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * round input number to nearest half integer
 * @param {number} num - (e.g. 3.7)
 * @returns {number} - (e.g. 3.5)
 */
export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
