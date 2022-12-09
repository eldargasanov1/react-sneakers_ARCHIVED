import React, { useContext } from 'react';
import style from './CartItem.module.scss';
import { FiX } from 'react-icons/fi';
import { AppContext } from '../../App';

export const CartItem = ({ id, imageUrl, title, price }) => {
	const { removeFromCart } = useContext(AppContext);

	return (
		<div className={style.item}>
			<img src={imageUrl} alt='cartItem' className={style['item__image']} />
			<div className={style['item__info']}>
				<div className={style['item__title']}>{title}</div>
				<div className={style['item__price']}>{price} руб.</div>
			</div>
			<button className={style.removeBtn} onClick={() => removeFromCart(id)}>
				<FiX />
			</button>
		</div>
	);
};
