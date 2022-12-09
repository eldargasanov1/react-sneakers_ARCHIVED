import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import style from './BackButton.module.scss';

export const BackButton = () => {
	const { isCartOpen, setIsCartOpen } = useContext(AppContext);

	return (
		<Link to='/'>
			<button
				className={style.myButton}
				onClick={isCartOpen ? () => setIsCartOpen(false) : null}
			>
				<div className={style.arrow}>
					<FiArrowLeft />
				</div>
				<div className={style.title}>Вернуться назад</div>
			</button>
		</Link>
	);
};
