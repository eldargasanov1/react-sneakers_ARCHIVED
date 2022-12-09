import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { AppContext } from '../../App';
import style from './Header.module.scss';

export const Header = () => {
	const { setIsCartOpen, totalPrice } = useContext(AppContext);

	return (
		<div className={style.header}>
			<Link to='/'>
				<div className={style.logo}>
					<img src='/img/logo.png' alt='' />
					<div className='logo__info'>
						<div className={style['logo__title']}>REACT SNEAKERS</div>
						<div className={style['logo__subtitle']}>
							Магазин лучших кроссовок
						</div>
					</div>
				</div>
			</Link>

			<div className={style.menu}>
				<div className={style.cart} onClick={() => setIsCartOpen(true)}>
					<div className='cart__image'>
						<FiShoppingCart />
					</div>
					<div className={style['cart__price']}>{totalPrice} руб.</div>
				</div>

				<Link to='/favorites'>
					<div className='favorite'>
						<FiHeart />
					</div>
				</Link>

				<Link to='/orders'>
					<div className='user'>
						<FiUser />
					</div>
				</Link>
			</div>
		</div>
	);
};
