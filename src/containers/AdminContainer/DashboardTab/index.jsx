import React, { useEffect } from 'react'
import ColumnChart from '../../../components/chart/ColumnChart';
import AreaChart from '../../../components/chart/AreaChart';
import { Divider, Space } from 'antd';
import PieChart from '../../../components/chart/PieChart';
import CardWrapper from '../../CardWrapper';
import { useDispatch } from 'react-redux';
import { fetchStatic } from '../../../action'
import { API_ADMIN_STATISTIC } from '../../../linkTo';
const DasboardTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStatic({
      url: API_ADMIN_STATISTIC
    }));
  }, []);
  return (
    <Space className='Dashboard'
      direction='vertical'
      split={<Divider type="horizontal" />}
      size={50}
      style={{
        width: "100%"
      }}
    >
      <CardWrapper title="Daily Revenue">
        <AreaChart />
      </CardWrapper>
      <CardWrapper title="Daily Orders">
        <ColumnChart />
      </CardWrapper>
      <CardWrapper title="Proportion Category">
        <PieChart />
      </CardWrapper>


    </Space>
  )
};
export default DasboardTab
