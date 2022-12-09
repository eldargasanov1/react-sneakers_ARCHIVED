import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import { Home } from './components/screens/Home';
import { Cart } from './components/Cart';
import { Favorites } from './components/screens/Favorites';
import { Orders } from './components/screens/Orders';

export const AppContext = React.createContext({});

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState([]);
	const [orderItems, setOrderItems] = useState([]);
	const [isItemsLoading, setIsItemsLoading] = useState(true);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isOrdered, setIsOrdered] = useState(false);
	const [search, setSearch] = useState('');

	const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

	isCartOpen
		? document.body.classList.add('lock')
		: document.body.classList.remove('lock');

	useEffect(() => {
		(async () => {
			try {
				setIsItemsLoading(true);

				const [itemsRes, cartRes, favoritesRes, ordersRes] = await Promise.all([
					axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/items'),
					axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/cart'),
					axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/favorites'),
					axios.get('https://6390e6380bf398c73a9630d4.mockapi.io/orders'),
				]);

				setCartItems(cartRes.data);
				setFavoriteItems(favoritesRes.data);
				setOrderItems(ordersRes.data);
				setItems(itemsRes.data);

				setIsItemsLoading(false);
			} catch (err) {
				console.error('Ошибка получения данных');
			}
		})();
	}, []);

	const addToCart = async obj => {
		const itemInCart = cartItems.find(
			item =>
				Number(item.parentId) === (Number(obj.parentId) || Number(obj.parentId))
		);

		try {
			if (!itemInCart) {
				const { data } = await axios.post(
					'https://6390e6380bf398c73a9630d4.mockapi.io/cart',
					obj
				);
				setCartItems(prev => [...prev, data]);
			} else {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${itemInCart.id}`
				);
				setCartItems(prev =>
					prev.filter(item => item.parentId !== obj.parentId)
				);
			}
		} catch (err) {
			console.error('Корзина: ошибка добавления/удаления');
		}
	};

	const addToFavorites = async obj => {
		const itemInFavorites = favoriteItems.find(
			item => Number(item.parentId) === Number(obj.parentId)
		);

		try {
			if (!itemInFavorites) {
				const { data } = await axios.post(
					'https://6390e6380bf398c73a9630d4.mockapi.io/favorites',
					obj
				);
				setFavoriteItems(prev => [...prev, data]);
			} else {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/favorites/${itemInFavorites.id}`
				);
				setFavoriteItems(prev =>
					prev.filter(item => item.parentId !== obj.parentId)
				);
			}
		} catch (err) {
			console.error('Избранное: ошибка добавления/удаления');
		}
	};

	const addToOrders = async () => {
		try {
			const { data } = await axios.post(
				'https://6390e6380bf398c73a9630d4.mockapi.io/orders',
				{
					title: `Заказ от ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
					orderedCartItems: cartItems,
				}
			);
			setOrderItems(prev => [...prev, data]);
			for await (let item of cartItems) {
				axios.delete(
					`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${item.id}`
				);
			}
			setIsOrdered(true);
			setCartItems([]);
			setTimeout(() => {
				setIsOrdered(false);
			}, 1500);
		} catch (err) {
			console.error('Не удалось заказать');
		}
	};

	const removeFromCart = id => {
		try {
			axios.delete(`https://6390e6380bf398c73a9630d4.mockapi.io/cart/${id}`);
			setCartItems(prev => prev.filter(item => item.id !== id));
		} catch (err) {
			console.error('Не удалось удалить товар из корзины');
		}
	};

	const contextValue = {
		items,
		cartItems,
		favoriteItems,
		orderItems,
		isItemsLoading,
		addToCart,
		addToFavorites,
		removeFromCart,
		setIsCartOpen,
		isCartOpen,
		totalPrice,
		addToOrders,
		isOrdered,
		search,
		setSearch,
	};
	return (
		<div className='App'>
			<AppContext.Provider value={contextValue}>
				<Header />
				<Cart />
				<Routes>
					<Route path='' exact element={<Home />}></Route>
					<Route path='favorites' exact element={<Favorites />}></Route>
					<Route path='orders' exact element={<Orders />}></Route>
				</Routes>
			</AppContext.Provider>
		</div>
	);
}

export default App;
