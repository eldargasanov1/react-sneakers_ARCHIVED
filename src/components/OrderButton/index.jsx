import React, { useContext } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import style from './OrderButton.module.scss';
import { AppContext } from '../../App';

export const OrderButton = () => {
	const { addToOrders } = useContext(AppContext);

	return (
		<button className={style.myButton} onClick={() => addToOrders()}>
			<div className={style.title}>Оформить заказ</div>
			<div className={style.arrow}>
				<FiArrowRight />
			</div>
		</button>
	);
};
