import React, { useState } from 'react';
import { DeleteOutlined, SettingOutlined, MailOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Space, Popconfirm, Modal, Form, Input, Switch, Button, Divider, Tag, Select } from 'antd';
import updateUser from '../services/updateUser';
import { API_CHAT_ROOM, API_USER } from '../linkTo';
const { Meta } = Card;
const { Item } = Form;
const AccountItem = ({ url, user, hasEmail, handleDeleteUser, isDisable }) => {
    const [form] = Form.useForm();
    const [openChat, setOpenChat] = useState(false)
    const [chatUser, setChatUser] = useState()
    const [bagde, setBagde] = useState(false)
    const handleCheckMail = () => {
        setOpenChat(!openChat)
        setBagde(false)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        updateUser(url, user._id, values)
        setIsModalOpen(false);
    };

    const getBagde = () => openChat ? setBagde(false) : setBagde(true)
    //TODO: fetch newest message
    return (
        <>
            <Card
                style={{
                    width: "85%",
                    marginTop: 16,
                }}
                extra={
                    <Space>
                        {
                            !user.isActive ? <Tag color="error">
                                BANNED
                            </Tag> : <></>
                        }
                        <Popconfirm
                            placement="bottom"
                            title="Do you want to delete this account?"
                            onConfirm={() => {
                                handleDeleteUser.handleDeleteUser(API_USER, user._id);
                            }}
                            okText="Accept"
                            cancelText="Cancel"
                        >
                            <Button title="Delete" type='link'>
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                        <Button title="Edit" type='link' onClick={showModal}>
                            <SettingOutlined />
                        </Button>
                        {
                            hasEmail ?
                                <Badge dot={bagde}>
                                    <Button disabled={isDisable} title="Email" type='link' onClick={() => handleCheckMail(user)}>
                                        <MailOutlined />
                                    </Button>
                                </Badge> : ""
                        }
                    </Space>
                }
            >
                <Meta
                    // avatar={user.avatar ? <Avatar src={user.avatar} size={76} /> : <Avatar size={76} icon={<UserOutlined />} />}
                    avatar={<Avatar size={76} icon={<UserOutlined />} />}
                    title={user.username}
                    description={user.phone ? user.phone : ''}
                />
            </Card>
            <Modal title="Edit account" open={isModalOpen} footer={false} closable={false} destroyOnClose={true}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}

                    initialValues={{
                        remember: true,
                    }}
                    onFinish={value => onFinish(value)}
                    autoComplete="off">
                    <Item
                        name="role"
                        label="Privilege"
                        initialValue={user.role}>
                        <Select
                            options={[
                            {
                                value: 'admin',
                                label: 'Admin',
                            },
                            {
                                value: 'customer',
                                label: 'Customer',
                            },
                        ]} />
                    </Item>
                    <Item label="Active" name="isActive" valuePropName='checked' initialValue={user.isActive}>
                        <Switch />
                    </Item>
                    <Item label={<Button onClick={handleCancel} type='default'>Cancel</Button>} colon={false}>
                        <Button htmlType='submit' type='primary'>Update</Button>
                    </Item>
                </Form>
            </Modal>
        </>
    );
}
AccountItem.defaultProps = {
    hasEmail: false
}
export default AccountItem;
