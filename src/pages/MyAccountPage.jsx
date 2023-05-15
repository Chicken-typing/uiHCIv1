import { DoubleLeftOutlined } from '@ant-design/icons';
import { Layout, Tabs, Form, Input, Button, DatePicker, Collapse, Descriptions, Card, Empty, Typography, Space } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../action'
import _ from 'lodash'
import getUserOrders from '../services/getUserOrders';
import updateUserInfor from '../services/updateUserInfor';
const { Item } = Form
const { Panel } = Collapse;
const { Meta } = Card;
const { Item: DesItem } = Descriptions
const OrderItem = (item, callback) => {
    return (
        <Card
            key={item._id + item.size}
            hoverable
            cover={<img alt={item.name} style={{ width: 300, height: 350 }} src={_.get(item, 'images[0].thumbUrl')} />}
            style={{ minWidth: 310 }}
            onClick={() => callback(`/products/${item._id}`)}
        >
            <Meta title={<Typography.Text ellipsis>{item.name}</Typography.Text>} description={<Space style={{ flexWrap: 'wrap', display: 'flex' }}>
                <Typography.Text>{`Price: ${item.price}`}</Typography.Text>
                <Typography.Text>{`Quantity: ${item.quantity} `}</Typography.Text>
            </Space>} />
        </Card>
    )
}
const DescriptionInfor = (order, callback) => (
    <Descriptions
        column={2}
        contentStyle={{
            minWidth: '50%',
            marginRight: 10

        }}
        labelStyle={{
            fontWeight: 'bold'
        }}
    >
        <DesItem label='Name'><Typography.Text ellipsis>{order.shippingAddress.fullName}</Typography.Text></DesItem>
        <DesItem label='Phone'><Typography.Text ellipsis>{order.shippingAddress?.phone}</Typography.Text></DesItem>
        <DesItem label='Address'><Typography.Text ellipsis>{order.shippingAddress.address}</Typography.Text></DesItem>
        <DesItem label='Payment'><Typography.Text ellipsis>{order.paymentResult.status}</Typography.Text></DesItem>
        <DesItem label='Products' contentStyle={{
            display: 'flex',
            overflow: 'auto',
        }}>
            {
                order.orderItems.map(item => OrderItem(item, callback))
            }
        </DesItem>
    </Descriptions>
)

const MyAccountPage = () => {
    const user = useSelector(state => state.User.userInfor)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const getOrders = (orders) => setOrders(orders)
    useEffect(() => {
        getUserOrders(user, getOrders)
    }, [])
    const [editable, setEditable] = useState(true)
    const handleChangeInfor = (value) => {
        setEditable(!editable)
        updateUserInfor(user, value)
    }
    const onClickEdit = () => {
        setEditable(!editable)
    }
    const handeClickItem = (url) => {
        navigate(url)
    }
    const inforTab = () => (
        < >
            <Button onClick={onClickEdit} type='primary' style={{ marginLeft:'10%'}}>Edit</Button>
            <Form
                disabled={editable}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={value => handleChangeInfor(value)}
            >
                <Item>
                    
                </Item>
                <Item label="User name" name='username' initialValue={user.username}>
                    <Input />
                </Item>
                <Item label="Email" name='email' initialValue={user.email}>
                    <Input />
                </Item>

                <Item label="Password" name='' >

                    <Input disabled />
                </Item>
                <Item label="Address" name='address' initialValue={user?.address}>
                    <Input />
                </Item>
                <Item label="Phone" name='phone' initialValue={user?.phone}>
                    <Input />
                </Item>
                <Item label="Birthday" name='birthday' initialValue={moment(user?.birthday)}>
                    <DatePicker
                        format={'L'}
                        style={{
                            width: '100%',
                        }} />
                </Item>
                <Item style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button htmlType='submit' >Save</Button>
                </Item>
            </Form>
        </>
    )
    const orderHistoryTab = (callback) => {
        return _.isEmpty(orders)
            ? (<Empty />)
            : <Collapse accordion >
                {
                    orders.map(order => (
                        <Panel header={moment(order.updatedAt).format('L')} key={order._id}>
                            {DescriptionInfor(order, callback)}
                        </Panel>
                    ))
                }
            </Collapse >
    }

    const items = [
        {
            key: 'infor',
            label: 'User information',
            children: inforTab(user)
        },
        {
            key: 'orders',
            label: 'History orders',
            children: orderHistoryTab(handeClickItem)
        }
    ]
    return (
        <Layout>
            <Layout.Header>
                <Link to={user.role === 'customer' ? '/' : '/admin'} style={{ fontSize: 24, color: 'white' }}><DoubleLeftOutlined /></Link>
            </Layout.Header>
            <Layout.Content >
                <Tabs
                    items={items}
                    tabPosition='top'
                    centered
                    tabBarStyle={{
                        margin: "10px 20px"
                    }}
                    style={{
                        background: 'white',
                        padding:'0px 10px'
                    }} />
            </Layout.Content>
        </Layout>
    );
}

export default MyAccountPage;
