import React, { useEffect } from 'react';
import CustomerList from './CustomerList';
import AdminList from './AdminList';
import { fetchUser } from '../../../action'
import './style.scss'
import { AUTH_ROLE } from '../../../consts/status'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const onChange = (key) => {
};
const AccountTab = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUser())
    }, []);
    const isMAdmin = useSelector((state) => state.User.userInfor).role === AUTH_ROLE.MASTER_ADMIN
    return (
        <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            animated={
                {
                    tabPane: true
                }
            }
            tabPosition='top'
            centered={true}
            items={[
                {
                    label: `Customer accounts`,
                    key: '1',
                    children: <CustomerList />,
                },
                {
                    label: `Admin accounts`,
                    key: '2',
                    children: <AdminList />,
                    disabled: !isMAdmin
                },
            ]}
        />
    );
}

export default AccountTab;
