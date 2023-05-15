import { Card, Descriptions, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
const { Item } = Descriptions
const SettingTab = () => {
    const user = useSelector(state => state.User.userInfor)
    return (
        <div>
            <Card hoverable title='Basic information' headStyle={{ fontWeight: 'bolder', fontSize: '2em' }}>
                <Descriptions
                    column={1}
                    labelStyle={{
                        minWidth: "12%",
                        fontWeight: 'bolder',
                        marginRight: 10

                    }}
                    contentStyle={{
                        width: '70%'
                    }}
                >
                    <Item label="User name"><Typography.Text>{user.username}</Typography.Text></Item>
                    <Item label='Role'><Typography.Text>{user.role}</Typography.Text></Item>
                    <Item label='Token'><Typography.Text ellipsis style={{ margin: 0 }} copyable>{user.token}</Typography.Text></Item>
                </Descriptions>
            </Card>
        </div>
    );
}

export default SettingTab;
