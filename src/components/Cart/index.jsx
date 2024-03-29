import React from 'react';
import { CartItem } from '../CartItem';
import { OrderButton } from '../OrderButton';
import style from './Cart.module.scss';
import { FiX } from 'react-icons/fi';
import { Empty } from '../Empty';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/actions/actionCreators';

export const Cart = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector(state => state.allItems.cartItems);
	const isCartOpen = useSelector(state => state.isCartOpen);
	const isOrdered = useSelector(state => state.isOrdered);
	const totalPrice = useSelector(state => state.totalPrice);

	return (
		<div className={`${style.wrapper} ${isCartOpen ? style.active : ''}`}>
			<div className={style.cart}>
				<div className={style['title-wrapper']}>
					<div className={style.title}>Корзина</div>
					<button onClick={() => dispatch(setIsCartOpen(false))}>
						<FiX />
					</button>
				</div>
				{cartItems.length ? (
					<>
						<div className={style.list}>
							{cartItems.map(item => (
								<CartItem key={item.id} {...item} />
							))}
						</div>
						<div className={style.info}>
							<div className='info-final'>
								<div className='info-final__title'>Итого:</div>
								<span></span>
								<div className={style['info-final__price']}>
									{totalPrice.toFixed(2)} руб.
								</div>
							</div>
							<div className='info-tax'>
								<div className='info-tax__title'>Налог 5%:</div>
								<span></span>
								<div className={style['info-tax__price']}>
									{(totalPrice * 0.05).toFixed(2)} руб.
								</div>
							</div>
						</div>
						<OrderButton />
					</>
				) : (
					<div className={style['empty-wrapper']}>
						<Empty
							imgUrl={isOrdered ? 'img/cart/02.png' : 'img/cart/01.png'}
							title={isOrdered ? 'Заказ оформлен!' : 'Корзина пустая'}
							subtitle={
								isOrdered
									? `Ваш заказ скоро будет передан курьерской доставке!`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
