import { combineReducers } from 'redux';
import {
	SET_IS_CART_OPEN,
	SET_IS_ORDERED,
	SET_SEARCH,
	SET_TOTAL_PRICE,
} from '../actions/actionTypes';
import { allItems } from './itemReducers';

export const isCartOpen = (state = false, action) => {
	switch (action.type) {
		case SET_IS_CART_OPEN:
			return action.isCartOpen;

		default:
			return state;
	}
};
export const isOrdered = (state = false, action) => {
	switch (action.type) {
		case SET_IS_ORDERED:
			return action.isOrdered;

		default:
			return state;
	}
};
export const search = (state = '', action) => {
	switch (action.type) {
		case SET_SEARCH:
			return action.search;

		default:
			return state;
	}
};
export const totalPrice = (state = 0, action) => {
	switch (action.type) {
		case SET_TOTAL_PRICE:
			const totalPrice = action.cartItems.reduce(
				(sum, obj) => sum + obj.price,
				0
			);
			return totalPrice;

		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	allItems,
	isCartOpen,
	isOrdered,
	search,
	totalPrice,
});
