import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../../../action'
import ListOrders from '../../ListOrders';
const OrderTab = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrders())
    });

    return (
        <div className='OrderTab'>
            <ListOrders />
        </div>
    );
}

export default OrderTab;
