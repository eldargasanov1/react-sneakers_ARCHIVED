import React, { useContext } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { FiCheck } from 'react-icons/fi';
import style from './Card.module.scss';
import { AppContext } from '../../App';

export const Card = ({
	id,
	parentId,
	imageUrl,
	title,
	price,
	isInCart,
	isInFavorites,
	inOrders,
}) => {
	const { addToCart, addToFavorites } = useContext(AppContext);

	return (
		<div className={style.card}>
			<div className={style.image}>
				{!inOrders && (
					<button
						className={`${style['image__heart']} ${
							isInFavorites ? style.active : ''
						}`}
						onClick={() =>
							addToFavorites({ id, parentId, imageUrl, title, price })
						}
					>
						<FiHeart />
					</button>
				)}
				<img src={imageUrl} alt='card-img' />
			</div>
			<div className={style.title}>{title}</div>
			<div className={style.price}>
				<div className='price__info'>
					<div className={style['price__title']}>Цена:</div>
					<div className={style['price__value']}>{price} руб.</div>
				</div>
				{!inOrders && (
					<button
						className={`${style.plus} ${isInCart ? style.active : ''}`}
						onClick={() => addToCart({ id, parentId, imageUrl, title, price })}
					>
						{isInCart ? <FiCheck /> : <FiPlus />}
					</button>
				)}
			</div>
		</div>
	);
};
