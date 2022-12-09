import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './CardLoader.module.scss';

export const CardLoader = props => (
	<div className={style.cardLoader}>
		<ContentLoader
			speed={1}
			width={210}
			height={260}
			viewBox='0 0 210 260'
			backgroundColor='#ffffff'
			foregroundColor='#dedede'
			{...props}
		>
			<rect x='5' y='0' rx='0' ry='0' width='133' height='112' />
			<rect x='0' y='126' rx='0' ry='0' width='150' height='34' />
			<rect x='0' y='174' rx='0' ry='0' width='150' height='34' />
		</ContentLoader>
	</div>
);
