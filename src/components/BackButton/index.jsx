import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import style from './BackButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/actions/actionCreators';

export const BackButton = () => {
	const dispatch = useDispatch();

	const isCartOpen = useSelector(state => state.isCartOpen);

	return (
		<Link to='/'>
			<button
				className={style.myButton}
				onClick={isCartOpen ? () => dispatch(setIsCartOpen(false)) : null}
			>
				<div className={style.arrow}>
					<FiArrowLeft />
				</div>
				<div className={style.title}>Вернуться назад</div>
			</button>
		</Link>
	);
};
