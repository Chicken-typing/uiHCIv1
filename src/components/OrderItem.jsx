import { Modal, List, Avatar, Card, Typography, Popover, Form, Divider, Space, Tag } from 'antd';
import { CheckCircleOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import confirmOrder from '../services/confirmProduct';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../action';
import _ from 'lodash'
const { Item } = List
const OrderItem = props => {
    const { item } = props
    const dispatch = useDispatch()
    const Refetch = (callback) => {
        return setTimeout(() => {
            dispatch(callback);
        }, 1000)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        confirmOrder(item._id)
        Refetch(fetchOrders())
    };
    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const content = (product) => (
        <Card
            bordered={false}
            style={{
                width: 300,
            }}
        >
            <Form>
                <Space split={<Divider orientation='horizontal' style={{ margin: 0 }} />} direction='vertical'>
                    <Form.Item label="Name">{product.name}</Form.Item>
                    <Form.Item label="Seri">{product._id}</Form.Item>
                    <Form.Item label="Price">{product.price}</Form.Item>
                    <Form.Item label="Mount">{product.quantity}</Form.Item>
                </Space>
            </Form>
        </Card>)
    const done = (isDone) => (
        isDone ? (<Tag icon={<CheckCircleOutlined />} color="success" style={{ display: 'flex', alignItems: 'center' }}>
            DONE
        </Tag>) : ""
    )
    const pay = (payment) => (
        <Tag color={payment ? '#01A5FC' : '#FFAB04'} style={{minWidth:63,textAlign:'center'}}>{payment ? 'PAID' : 'UNPAID'}</Tag>
    )
    return (
        <>
            <Item
                onClick={showModal}
                key={item._id}
                style={{
                    margin: 10,
                    width: 300
                }}
            >
                <Card title={<div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography.Paragraph ellipsis>
                        {item._id}
                    </Typography.Paragraph>
                    {done(item.isDelivered)}
                </div>} hoverable>
                    <Item.Meta
                        title={<Typography.Paragraph ellipsis={true}>{item.shippingAddress.fullName}</Typography.Paragraph>}
                        avatar={<Avatar size='large' icon={<UserOutlined />} />}
                        description={<>
                            <Typography.Text keyboard >{item.totalPrice}</Typography.Text>
                            {pay(item.isPaid)}
                        </>}
                    />

                </Card>
            </Item>
            <Modal
                title={"Order:" + item._id}
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>Customer name: {item.shippingAddress.fullName}</div>
                    <div>Address: {item.shippingAddress.address}</div>
                    <div>Phone number: {item.shippingAddress.phone}</div>                </div>
                <div style={{
                    display: 'flex',
                    overflow: 'auto',
                    height: 250,
                    marginTop: 35
                }}>
                    {
                        item.orderItems.map(product => (
                            <Popover placement="left" content={content(product)}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 140,
                                        height: 200,
                                        margin: "0px 5px"
                                    }}
                                    cover={<img alt={product.name} src={product.images[0].thumbUrl} />}
                                >
                                    <Card.Meta title={product.name} />
                                </Card>
                            </Popover>
                        ))
                    }
                </div>
                <div>Price: {<Typography.Text type='danger' >${item.totalPrice}</Typography.Text>}</div>
            </Modal>
        </>
    );
}

export default OrderItem;