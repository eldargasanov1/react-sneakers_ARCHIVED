import React from 'react';
import { Card } from '../../../Card';
import style from './Order.module.scss';
import { CardLoader } from '../../../CardLoader';
import { useSelector } from 'react-redux';

export const Order = ({ title, orderedCartItems }) => {
	const isItemsLoading = useSelector(state => state.allItems.isItemsLoading);

	return (
		<div className={style.orders}>
			<div className={style.title}>{title}</div>
			<div className={style['card-list']}>
				{isItemsLoading
					? [...Array(3)].map((item, i) => <CardLoader key={i} />)
					: orderedCartItems.map(item => (
							<Card key={item.id} inOrders={true} {...item} />
					  ))}
			</div>
		</div>
	);
};
