import { CartItem, Product } from '@/types/cart';

/**
 * Formats price string to number for calculations
 */
export const parsePrice = (price: string): number => {
  return parseFloat(price.replace('R$ ', '').replace(',', '.'));
};

/**
 * Formats number to Brazilian currency string
 */
export const formatPrice = (value: number): string => {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

/**
 * Calculates subtotal for a cart item
 */
export const calculateSubtotal = (item: CartItem): number => {
  return parsePrice(item.price) * item.quantity;
};

/**
 * Calculates total for all items in cart
 */
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + calculateSubtotal(item), 0);
};

/**
 * Validates CNPJ format
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  // Remove non-numeric characters
  const numbers = cnpj.replace(/\D/g, '');
  
  // Check if has 14 digits
  if (numbers.length !== 14) return false;
  
  // Check for repeated digits
  if (/^(\d)\1{13}$/.test(numbers)) return false;
  
  // Validate check digits
  let sum = 0;
  let remainder;
  
  // First check digit
  for (let i = 1; i <= 12; i++) {
    sum += parseInt(numbers.charAt(i - 1)) * ((i < 5) ? (6 - i) : (14 - i));
  }
  remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(numbers.charAt(12)) !== firstDigit) return false;
  
  // Second check digit
  sum = 0;
  for (let i = 1; i <= 13; i++) {
    sum += parseInt(numbers.charAt(i - 1)) * ((i < 6) ? (7 - i) : (15 - i));
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(numbers.charAt(13)) === secondDigit;
};

/**
 * Generates a unique order number
 */
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BF${timestamp.slice(-6)}${random}`;
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates Brazilian phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length >= 10 && numbers.length <= 11;
};

/**
 * Creates cart item from product
 */
export const createCartItem = (product: Product, quantity: number = 1): CartItem => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
    unit: product.unit
  };
};

/**
 * Checks if cart has items
 */
export const hasCartItems = (items: CartItem[]): boolean => {
  return items.length > 0;
};

/**
 * Gets total quantity of all items
 */
export const getTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Finds cart item by product ID
 */
export const findCartItem = (items: CartItem[], productId: number): CartItem | undefined => {
  return items.find(item => item.id === productId);
};

/**
 * Checks if product is in cart
 */
export const isProductInCart = (items: CartItem[], productId: number): boolean => {
  return findCartItem(items, productId) !== undefined;
};

/**
 * Gets quantity of specific product in cart
 */
export const getProductCartQuantity = (items: CartItem[], productId: number): number => {
  const item = findCartItem(items, productId);
  return item ? item.quantity : 0;
};