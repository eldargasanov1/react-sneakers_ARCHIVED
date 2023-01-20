import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import style from './OrderButton.module.scss';
import { useDispatch } from 'react-redux';
import { addToOrders } from '../../redux/actions/asyncActions';

export const OrderButton = () => {
	const dispatch = useDispatch();

	return (
		<button className={style.myButton} onClick={() => dispatch(addToOrders())}>
			<div className={style.title}>Оформить заказ</div>
			<div className={style.arrow}>
				<FiArrowRight />
			</div>
		</button>
	);
};
