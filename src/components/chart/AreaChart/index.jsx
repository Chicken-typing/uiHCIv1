import React from 'react';
import { Area } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import Waiting from '../../../pages/Waiting'


const AreaChart = () => {
    const data = useSelector(state => state.fetchStatic.dataStatistic.dailyOrders)
    const config = {
        data,
        xField: '_id',
        yField: 'sales',
        xAxis: {
            range: [0, 1],
        },
    };

    return data ? <Area {...config} /> : <Waiting />
};
export default AreaChart
