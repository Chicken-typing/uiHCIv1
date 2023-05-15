import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../action';
import { OpenInNewOutlined } from '@mui/icons-material';


const Account = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const items = [
        {
            key: '1',
            label: (
                <Button style={{ color: 'black' }} onClick={()=>navigate(`/${props.user._id}/account`)} type='link'>My account</Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button style={{ color: 'red' }} type='link' onClick={handleLogout}>Log out</Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button type='primary' onClick={() => navigate('/')}>Go to store <OpenInNewOutlined /></Button>
            ),

        }
    ]

    return (
        <Dropdown menu={{ items }}>
            <span
                style={{
                    ...props.style
                }}>

                {
                    props.image ? <Avatar
                        shape='cirle'
                        src={props.image}
                        style={{
                            width: 56
                        }}
                    /> : <Avatar size={56} icon={<UserOutlined />} />
                }
            </span>
        </Dropdown>
    );
}

export default Account;
