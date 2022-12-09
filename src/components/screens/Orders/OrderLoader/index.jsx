import React from 'react';
import ContentLoader from 'react-content-loader';
import { CardLoader } from '../../../CardLoader';
import style from './OrderLoader.module.scss';

export const OrderLoader = props => (
	<div className={style.orderLoader}>
		<ContentLoader
			speed={1}
			width={400}
			height={30}
			viewBox='0 0 400 30'
			backgroundColor='#ffffff'
			foregroundColor='#dedede'
			{...props}
		>
			<rect x='0' y='0' rx='0' ry='0' width='400' height='30' />
		</ContentLoader>
		<div className={style['card-list']}>
			{[...Array(3)].map((item, i) => (
				<CardLoader key={i} />
			))}
		</div>
	</div>
);
