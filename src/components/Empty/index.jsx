import React from 'react';
import style from './Empty.module.scss';
import { BackButton } from '../BackButton';

export const Empty = ({ imgUrl, title, subtitle }) => {
	return (
		<div className={style.empty}>
			<img src={imgUrl} alt='emptyImg' className={style.img} />
			<div className={style.title}>{title}</div>
			<p className={style.subtitle}>{subtitle}</p>
			<BackButton />
		</div>
	);
};
