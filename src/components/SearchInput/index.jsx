import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/actions/actionCreators';
import style from './SearchInput.module.scss';

export const SearchInput = () => {
	const dispatch = useDispatch();

	const search = useSelector(state => state.search);

	return (
		<input
			type='text'
			className={style.search}
			placeholder={'Введите запрос...'}
			value={search}
			onChange={e => dispatch(setSearch(e.target.value))}
		/>
	);
};
