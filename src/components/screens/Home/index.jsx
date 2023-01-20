import React from 'react';
import { Card } from '../../Card';
import style from './Home.module.scss';
import { CardLoader } from '../../CardLoader';
import { SearchInput } from '../../SearchInput';
import { useSelector } from 'react-redux';

export const Home = () => {
	const { items, cartItems, favoriteItems, isItemsLoading } = useSelector(
		state => state.allItems
	);
	const search = useSelector(state => state.search);

	return (
		<div className={style.home}>
			<div className={style['title-wrapper']}>
				<div className={style.title}>Все кроссовки</div>
				<SearchInput />
			</div>
			<div className={style['card-list']}>
				{isItemsLoading
					? [...Array(10)].map((item, i) => <CardLoader key={i} />)
					: items
							.filter(item =>
								item.title.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<Card
									key={item.id}
									isInCart={cartItems.find(
										obj => Number(obj.parentId) === Number(item.id)
									)}
									isInFavorites={favoriteItems.find(
										obj => Number(obj.parentId) === Number(item.id)
									)}
									parentId={item.id}
									{...item}
								/>
							))}
			</div>
		</div>
	);
};
