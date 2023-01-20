import axios from 'axios';
import {
	setCartItems,
	setFavoriteItems,
	setIsItemsLoading,
	setIsOrdered,
	setItems,
	setOrdersItems,
	setTotalPrice,
} from './actionCreators';

export const requestAllItems = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(setIsItemsLoading(true));

			const [itemsRes, cartRes, favoritesRes, ordersRes] = await Promise.all([
				axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/items'),
				axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/cart'),
				axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/favorites'),
				axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/orders'),
			]);

			if (cartRes.data.length !== 0) {
				dispatch(setCartItems(cartRes.data));
			}
			if (favoritesRes.data.length !== 0) {
				dispatch(setFavoriteItems(favoritesRes.data));
			}
			if (ordersRes.data.length !== 0) {
				dispatch(setOrdersItems(ordersRes.data));
			}
			if (itemsRes.data.length !== 0) {
				dispatch(setItems(itemsRes.data));
			}

			dispatch(setTotalPrice(getState().allItems.cartItems));
			dispatch(setIsItemsLoading(false));
		} catch (err) {
			console.error('Ошибка получения данных');
		}
	};
};

export const addToCart = obj => {
	return async (dispatch, getState) => {
		const itemInCart = getState().allItems.cartItems.find(
			item => Number(item.parentId) === Number(obj.parentId)
		);

		try {
			if (!itemInCart) {
				const { data } = await axios.post(
					'https://6390e6380bf398c73a9630d4.mockapi.io/cart',
					obj
				);
				dispatch(setCartItems(data));
			} else {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${itemInCart.id}`
				);
				dispatch(setCartItems(obj));
			}
			dispatch(setTotalPrice(getState().allItems.cartItems));
		} catch (err) {
			console.error('Корзина: ошибка добавления/удаления');
		}
	};
};

export const addToFavorites = obj => {
	return async (dispatch, getState) => {
		const itemInFavorites = getState().allItems.favoriteItems.find(
			item => Number(item.parentId) === Number(obj.parentId)
		);

		try {
			if (!itemInFavorites) {
				const { data } = await axios.post(
					'https://6390e6380bf398c73a9630d4.mockapi.io/favorites',
					obj
				);
				dispatch(setFavoriteItems(data));
			} else {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/favorites/${itemInFavorites.id}`
				);
				dispatch(setFavoriteItems(itemInFavorites));
			}
		} catch (err) {
			console.error('Избранное: ошибка добавления/удаления');
		}
	};
};

export const addToOrders = () => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axios.post(
				'https://6390e6380bf398c73a9630d4.mockapi.io/orders',
				{
					title: `Заказ от ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
					orderedCartItems: getState().allItems.cartItems,
				}
			);
			dispatch(setOrdersItems(data));
			for await (let item of getState().allItems.cartItems) {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${item.id}`
				);
			}
			dispatch(setIsOrdered(true));
			dispatch(setCartItems([]));
			dispatch(setTotalPrice(getState().allItems.cartItems));
			setTimeout(() => {
				dispatch(setIsOrdered(false));
			}, 1500);
		} catch (err) {
			console.error('Не удалось заказать');
		}
	};
};

export const removeFromCart = (id, parentId) => {
	return async (dispatch, getState) => {
		try {
			const itemInCart = getState().allItems.cartItems.find(
				item => Number(item.parentId) === Number(parentId)
			);

			axios.delete(`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${id}`);
			dispatch(setCartItems(itemInCart));
			dispatch(setTotalPrice(getState().allItems.cartItems));
		} catch (err) {
			console.error('Не удалось удалить товар из корзины');
		}
	};
};
