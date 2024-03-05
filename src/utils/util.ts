import { StoreItem, CartItem } from '../types';

/**
 * calc total price of items in cart
 * @param {CartItem[]} cart - array of `CartItem` objects w/ prices
 * @returns {number} sum of price property of all `CartItem` objects
 */
export function calcCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

/**
 * calculate quantity of items in cart
 * @param {CartItem[]} cart - array of `CartItem` objects w/ quantities
 * @returns {number} sum of qty property of all `CartItem` objects
 */
export function calcQtyInCart(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * add, remove, change quantity of item in cart
 * @param {CartItem} item - `CartItem` object with unique id and quantity
 * @param {CartItem[]} cart - array of `CartItem` objects
 * @returns {CartItem[]} shallow copy of cart with `item` changed
 */
export function changeCartItem(item: CartItem, cart: CartItem[]): CartItem[] {
  const itemIndex: number = findItemIndex(item.id, cart);
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
 * @returns {number} number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

interface Item {
  id: number | string;
}
/**
 * find item by its given id in given array
 * @param {number | string} id - a unique id
 * @param {Item[]} array - array of `Item` objects w/ unique ids
 * @returns {Item | undefined} first `Item` object with matching id | `undefined` if not found
 */
function findItem(id: number | string, array: Item[]): Item | undefined {
  return array.find((item: Item) => item.id === id);
}

/**
 * find item index by its given id in given array
 * @param {number | string} id - a unique id
 * @param {Item[]} array - array of `Item` objects w/ unique ids
 * @returns {number} index of first `Item` object with matching id | -1 if `Item` not found
 */
function findItemIndex(id: number | string, array: Item[]): number {
  return array.findIndex((item) => item.id === id);
}

interface Item {
  id: number | string;
  quantity: number;
}
/**
 * find item quantity by its given id in given array
 * @param {number | string} id  - a unique id
 * @param {Item[]} array - array of `Item` objects w/ unique ids and quantities
 * @returns {number} `quantity` value of first `Item` object w/ matching id | 0 if `Item` not found
 */
export function findItemQty(id: number | string, array: Item[]): number {
  const found = findItem(id, array);
  return found ? found.quantity : 0;
}

/**
 * format input number to USD
 * @param {number} price - (e.g. 57.3)
 * @returns {string | undefined} number (e.g. '$57.30')
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * round input number to nearest half integer
 * @param {number} num - (e.g. 3.7)
 * @returns {number} number (e.g. 3.5)
 */
export function roundHalf(num: number): number {
  return Math.round(num * 2) / 2;
}

/**
 * sort given array by keyword
 * @param {StoreItem[]} array - array of `Item` objs
 * @param {string} keyword - e.g. 'title'
 * @returns {StoreItem[]} sorted shallow copy of given array
 */
export function sortBy(array: StoreItem[], keyword: string): StoreItem[] {
  // if keyword is 'rating': sort by item.rating.rate value
  // else: sort by item[keyword] value
  const compareFn =
    keyword === 'rating'
      ? (a: StoreItem, b: StoreItem) =>
          a[keyword].rate > b[keyword].rate
            ? -1
            : a[keyword].rate < b[keyword].rate
              ? 1
              : 0
      : (a: StoreItem, b: StoreItem) =>
          a[keyword as keyof StoreItem] < b[keyword as keyof StoreItem]
            ? -1
            : a[keyword as keyof StoreItem] > b[keyword as keyof StoreItem]
              ? 1
              : 0;

  return array.toSorted(compareFn);
}
