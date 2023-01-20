import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import { Home } from './components/screens/Home';
import { Cart } from './components/Cart';
import { Favorites } from './components/screens/Favorites';
import { Orders } from './components/screens/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { requestAllItems } from './redux/actions/asyncActions';

function App() {
	const dispatch = useDispatch();

	const isCartOpen = useSelector(state => state.isCartOpen);

	isCartOpen
		? document.body.classList.add('lock')
		: document.body.classList.remove('lock');

	useEffect(() => {
		dispatch(requestAllItems());
	}, [dispatch]);

	return (
		<div className='App'>
			<Header />
			<Cart />
			<Routes>
				<Route path='' exact element={<Home />}></Route>
				<Route path='favorites' exact element={<Favorites />}></Route>
				<Route path='orders' exact element={<Orders />}></Route>
			</Routes>
		</div>
	);
}

export default App;
