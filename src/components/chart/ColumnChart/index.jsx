import React from 'react'
import { Column } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import Waiting from '../../../pages/Waiting'

const ColumnChart = () => {
    const dataRevenue = useSelector(state => state.fetchStatic.dataStatistic.dailyOrders)
    const configStaticRevenue = {
        data: dataRevenue,
        xField: '_id',
        yField: 'orders',
        label: {

            position: 'middle',

            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        date: {
            __staticRouterHydrationData: {
                alias: 'Date',
            },
            orders: {
                alias: 'Order',
            },
        },
    };
    return dataRevenue ? <Column {...configStaticRevenue} /> : <Waiting />
}
export default ColumnChart