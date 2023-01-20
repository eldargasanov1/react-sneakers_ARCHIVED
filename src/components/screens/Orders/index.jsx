import React from 'react';
import style from './Orders.module.scss';
import { OrderLoader } from './OrderLoader';
import { Order } from './Order';
import { Empty } from '../../Empty';
import { SearchInput } from '../../SearchInput';
import { useSelector } from 'react-redux';

export const Orders = () => {
	const { ordersItems, isItemsLoading } = useSelector(state => state.allItems);
	const search = useSelector(state => state.search);

	return (
		<div className={style.orders}>
			<div className={style['title-wrapper']}>
				<div className={style.title}>Заказы</div>
				<SearchInput />
			</div>
			{ordersItems.length ? (
				<div className={style['order-list']}>
					{isItemsLoading
						? [...Array(1)].map((item, i) => <OrderLoader key={i} />)
						: ordersItems
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
