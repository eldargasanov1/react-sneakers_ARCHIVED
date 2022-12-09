import React, { useContext } from 'react';
import style from './Orders.module.scss';
import { AppContext } from '../../../App';
import { OrderLoader } from './OrderLoader';
import { Order } from './Order';
import { Empty } from '../../Empty';
import { SearchInput } from '../../SearchInput';

export const Orders = () => {
	const { orderItems, isItemsLoading, search } = useContext(AppContext);
	return (
		<div className={style.orders}>
			<div className={style['title-wrapper']}>
				<div className={style.title}>Заказы</div>
				<SearchInput />
			</div>
			{orderItems.length ? (
				<div className={style['order-list']}>
					{isItemsLoading
						? [...Array(1)].map((item, i) => <OrderLoader key={i} />)
						: orderItems
								.filter(item =>
									item.title.toLowerCase().includes(search.toLowerCase())
								)
								.map(item => <Order key={item.id} {...item} />)}
				</div>
			) : (
				<div className={style['empty-wrapper']}>
					<Empty
						imgUrl='img/orders-emoji.png'
						title='У вас нет заказов'
						subtitle='Вы ничего не заказывали'
					/>
				</div>
			)}
		</div>
	);
};
