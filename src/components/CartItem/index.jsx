import React from 'react';
import style from './CartItem.module.scss';
import { FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/asyncActions';

export const CartItem = ({ id, parentId, imageUrl, title, price }) => {
	const dispatch = useDispatch();

	return (
		<div className={style.item}>
			<img src={imageUrl} alt='cartItem' className={style['item__image']} />
			<div className={style['item__info']}>
				<div className={style['item__title']}>{title}</div>
				<div className={style['item__price']}>{price} руб.</div>
			</div>
			<button
				className={style.removeBtn}
				onClick={() => dispatch(removeFromCart(id, parentId))}
			>
				<FiX />
			</button>
		</div>
	);
};
