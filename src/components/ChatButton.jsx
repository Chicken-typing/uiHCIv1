import { MailOutlined } from '@ant-design/icons'
import { Button, Divider, Tooltip, notification } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import _ from 'lodash'
import { useSelector } from 'react-redux'
export default function ChatButton({isDisable}) {
    const currentUser = useSelector(state => state.User.userInfor)
    const user = {
        _id: "dkl_admin",
        avatar: "",
        userName: "DKL store"
    }
    const [openChat, setOpenChat] = useState(false)
    const handleChat = () => {
        setOpenChat(!openChat)
    }
    const handleCloseChatbox = () => {
        setOpenChat(!openChat)
    }
    const userData = useSelector((state) => state.User.userInfor);
    const navigate = useNavigate()

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => {
                notification.close(key)
                navigate("/login")
            }}>
                Login now
            </Button>
        );
        notification.open({
            message: 'Please Login before chatting!',
            btn,
            key
        });
    };
    return (
        <>
            <Divider>
                <Tooltip placement='top' arrowPointAtCenter title='Message to us!'>
                    <Button disabled={isDisable}
                        onClick={() => {
                            userData.token
                            ?handleChat()
                            : openNotification()
                        }} type='link'
                        icon={
                            <>
                                <MailOutlined style={{ fontSize: 74 }} />

                            </>}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            height: 100,
                            width: 100
                        }}>
                    </Button>
                </Tooltip>
                {currentUser.token && currentUser.role==="customer"
                    ? <ChatBox user={currentUser} handleCloseChatbox={handleCloseChatbox} open={openChat} />
                    : <></>}
            </Divider>
        </>
    )
}
ChatButton.defaultProps = {
    isDisable:false
}
