import React from 'react';
import { Pie } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import Waiting from '../../../pages/Waiting'
const PieChart = () => {
    const data = useSelector(state => state.fetchStatic.dataStatistic.productCategories)
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return data ? <Pie {...config} /> : <Waiting />;
};
export default PieChart

