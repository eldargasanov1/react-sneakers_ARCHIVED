import React, { useContext } from 'react';
import { AppContext } from '../../App';
import style from './SearchInput.module.scss';

export const SearchInput = () => {
	const { search, setSearch } = useContext(AppContext);

	return (
		<input
			type='text'
			className={style.search}
			placeholder={'Введите запрос...'}
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
};
