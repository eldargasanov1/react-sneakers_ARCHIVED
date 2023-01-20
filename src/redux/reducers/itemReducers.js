import {
	SET_IS_ITEMS_LOADING,
	SET_CART_ITEMS,
	SET_FAVORITE_ITEMS,
	SET_ITEMS,
	SET_ORDERS_ITEMS,
} from '../actions/actionTypes';

const initialState = {
	items: [],
	cartItems: [],
	favoriteItems: [],
	ordersItems: [],
	isItemsLoading: true,
};

export const allItems = (state = initialState, action) => {
	switch (action.type) {
		case SET_ITEMS:
			return { ...state, items: action.items };

		case SET_CART_ITEMS:
			const isCartItemsArr = Array.isArray(action.cartItems);
			const isInCart = state.cartItems.find(
				item => Number(item.parentId) === Number(action.cartItems.parentId)
			);

			if (!isCartItemsArr && isInCart) {
				return {
					...state,
					cartItems: state.cartItems.filter(
						item => Number(item.parentId) !== Number(action.cartItems.parentId)
					),
				};
			}

			if (isCartItemsArr) {
				if (action.cartItems.length === 0) {
					return {
						...state,
						cartItems: [],
					};
				}

				return {
					...state,
					cartItems: [...state.cartItems, ...action.cartItems],
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, action.cartItems],
				};
			}

		case SET_FAVORITE_ITEMS:
			const isFavoriteItemsArr = Array.isArray(action.favoriteItems);
			const isInFavorites = state.favoriteItems.find(
				item => Number(item.parentId) === Number(action.favoriteItems.parentId)
			);

			if (isFavoriteItemsArr) {
				return {
					...state,
					favoriteItems: [...state.favoriteItems, ...action.favoriteItems],
				};
			} else {
				if (isInFavorites) {
					return {
						...state,
						favoriteItems: state.favoriteItems.filter(
							item =>
								Number(item.parentId) !== Number(action.favoriteItems.parentId)
						),
					};
				}

				return {
					...state,
					favoriteItems: [...state.favoriteItems, action.favoriteItems],
				};
			}

		case SET_ORDERS_ITEMS:
			const isOrderItemsArr = Array.isArray(action.ordersItems);

			if (isOrderItemsArr) {
				return {
					...state,
					ordersItems: [...state.ordersItems, ...action.ordersItems],
				};
			} else {
				return {
					...state,
					ordersItems: [...state.ordersItems, action.ordersItems],
				};
			}

		case SET_IS_ITEMS_LOADING:
			return { ...state, isItemsLoading: action.isItemsLoading };

		default:
			return state;
	}
};
