// LocalStorage Helper Utilities

const KEYS = {
  USERS: "eshop_registered_users",
  LOGGED_IN_USER: "eshop_logged_in_user",
  CART: "eshop_cart_items",
  RATINGS: "eshop_product_ratings"
};

// Safe JSON parser
const safeParse = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from LocalStorage:`, err);
    return fallback;
  }
};

// Registered Users
export const getRegisteredUsers = () => safeParse(KEYS.USERS, []);

export const registerUser = (user) => {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = getRegisteredUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

// Logged In Session User
export const getStoredLoggedInUser = () => safeParse(KEYS.LOGGED_IN_USER, null);

export const setStoredLoggedInUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.LOGGED_IN_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.LOGGED_IN_USER);
  }
};

// Cart Management
export const getStoredCart = () => safeParse(KEYS.CART, []);

export const setStoredCart = (cartItems) => {
  localStorage.setItem(KEYS.CART, JSON.stringify(cartItems));
};

// Ratings Management
// Structure of RATINGS in LocalStorage: { [productId]: [ { userId: 'email', rating: 5 }, ... ] }
export const getStoredRatings = () => safeParse(KEYS.RATINGS, {});

export const addProductRating = (productId, userEmail, ratingValue) => {
  const ratingsMap = getStoredRatings();
  if (!ratingsMap[productId]) {
    ratingsMap[productId] = [];
  }
  
  // Check if user already rated this product
  const existingIdx = ratingsMap[productId].findIndex(r => r.userEmail === userEmail);
  if (existingIdx >= 0) {
    ratingsMap[productId][existingIdx].rating = ratingValue;
  } else {
    ratingsMap[productId].push({ userEmail, rating: ratingValue });
  }

  localStorage.setItem(KEYS.RATINGS, JSON.stringify(ratingsMap));
  return ratingsMap[productId];
};

// Calculate merged rating statistics for a product combining default rating with LocalStorage user ratings
export const getCalculatedProductRating = (product) => {
  const ratingsMap = getStoredRatings();
  const userRatings = ratingsMap[product.id] || [];

  if (userRatings.length === 0) {
    return {
      average: product.rating,
      count: product.ratingCount
    };
  }

  // Combine initial default ratings sum with user ratings
  const initialTotalSum = product.rating * product.ratingCount;
  const userRatingsSum = userRatings.reduce((sum, item) => sum + item.rating, 0);
  const totalCount = product.ratingCount + userRatings.length;
  const average = Number(((initialTotalSum + userRatingsSum) / totalCount).toFixed(1));

  return {
    average,
    count: totalCount,
    userRatingsCount: userRatings.length
  };
};
