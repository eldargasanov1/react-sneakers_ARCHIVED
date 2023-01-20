import React from 'react';
import { Card } from '../../Card';
import style from '../Home/Home.module.scss';
import { CardLoader } from '../../CardLoader';
import { Empty } from '../../Empty';
import { SearchInput } from '../../SearchInput';
import { useSelector } from 'react-redux';

export const Favorites = () => {
	const { cartItems, favoriteItems, isItemsLoading } = useSelector(
		state => state.allItems
	);
	const search = useSelector(state => state.search);

	return (
		<div className={style.home}>
			<div className={style['title-wrapper']}>
				<div className={style.title}>Избранное</div>
				<SearchInput />
			</div>
			{favoriteItems.length ? (
				<div className={style['card-list']}>
					{isItemsLoading
						? [...Array(10)].map((item, i) => <CardLoader key={i} />)
						: favoriteItems
								.filter(item =>
									item.title.toLowerCase().includes(search.toLowerCase())
								)
								.map(item => (
									<Card
										key={item.id}
										isInCart={cartItems.find(
											obj => Number(obj.parentId) === Number(item.parentId)
										)}
										isInFavorites={favoriteItems.find(
											obj => Number(obj.parentId) === Number(item.parentId)
										)}
										parentId={item.parentId}
										{...item}
									/>
								))}
				</div>
			) : (
				<div className={style['empty-wrapper']}>
					<Empty
						imgUrl='img/favorite-emoji.png'
						title='Закладок нет :('
						subtitle='Вы ничего не добавляли в закладки'
					/>
				</div>
			)}
		</div>
	);
};
