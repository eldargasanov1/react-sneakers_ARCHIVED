import {
	SET_IS_ITEMS_LOADING,
	SET_CART_ITEMS,
	SET_FAVORITE_ITEMS,
	SET_ITEMS,
	SET_ORDERS_ITEMS,
	SET_IS_CART_OPEN,
	SET_IS_ORDERED,
	SET_SEARCH,
	SET_TOTAL_PRICE,
} from '../actions/actionTypes';

function makeActionCreator(type, ...argNames) {
	return function (...args) {
		let action = { type };
		argNames.forEach((arg, index) => {
			action[argNames[index]] = args[index];
		});
		return action;
	};
}

export const setItems = makeActionCreator(SET_ITEMS, 'items');
export const setCartItems = makeActionCreator(SET_CART_ITEMS, 'cartItems');
export const setFavoriteItems = makeActionCreator(
	SET_FAVORITE_ITEMS,
	'favoriteItems'
);
export const setOrdersItems = makeActionCreator(
	SET_ORDERS_ITEMS,
	'ordersItems'
);
export const setIsItemsLoading = makeActionCreator(
	SET_IS_ITEMS_LOADING,
	'isItemsLoading'
);

export const setIsCartOpen = makeActionCreator(SET_IS_CART_OPEN, 'isCartOpen');
export const setIsOrdered = makeActionCreator(SET_IS_ORDERED, 'isOrdered');
export const setSearch = makeActionCreator(SET_SEARCH, 'search');
export const setTotalPrice = makeActionCreator(SET_TOTAL_PRICE, 'cartItems');
