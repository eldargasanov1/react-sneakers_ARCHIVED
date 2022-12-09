import React, { useContext } from 'react';
import { Card } from '../../../Card';
import style from './Order.module.scss';
import { AppContext } from '../../../../App';
import { CardLoader } from '../../../CardLoader';

export const Order = ({ title, orderedCartItems }) => {
	const { isItemsLoading } = useContext(AppContext);
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
