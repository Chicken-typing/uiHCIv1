import {
    HomeOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    PlusCircleOutlined,
    UserOutlined,
    UnorderedListOutlined,
    SettingOutlined

} from '@ant-design/icons';
import logo from '../../assets/icons/logo-light.png'
import { Layout, Menu, Affix } from 'antd';
import React, { useEffect, useState } from 'react';
import Account from '../../components/Account';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './style.scss'
import { useSelector } from 'react-redux';
const { Header, Content, Sider } = Layout;
const Admin = () => {
    const navigate = useNavigate()
    const location = useLocation().pathname.split('/')
    const user=useSelector(state=>state.User.userInfor)
    const [collapsed, setCollapsed] = useState(false)
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type
        }
    }
    const items = [
        getItem("Dashboard", "dashboard", <HomeOutlined />),
        getItem("Products", "product", <ShoppingOutlined />, [
            getItem("List products", 'product-list', <UnorderedListOutlined />),
            getItem("Add product", 'add-product', <PlusCircleOutlined />)
        ]),
        getItem("Orders", "order", <ShoppingCartOutlined />),
        getItem("Accounts", "accounts", <UserOutlined />),
        getItem("Setting", "setting", <SettingOutlined />),
    ]
    const onChangeItem = e => {
        navigate(e.key)
    }
    const style = {
        maxHeight: window.innerHeight-1,
        overflow:'auto'
    }
    return (
        <Layout Layout style={style}>
            <Affix offsetTop={0.1}>
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    <Account image={logo} style={{ marginRight: "2%" }} user={user} />

                </Header>
            </Affix>
            <Layout className="site-layout"
                style={{
                    background: '#ffffff'
                }}
                hasSider
            >
                <Affix offsetTop={64.1}>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        onBreakpoint={(broken) => broken && setCollapsed(true)}
                        breakpoint='md'
                        theme='light'
                    >
                        <div className="logo" >
                            <img
                                src={logo}
                                alt='logo'
                                style={{
                                    width: 160,

                                }} />
                        </div>
                        <Menu theme="light" mode="inline" selectedKeys={[location[2]]} onClick={onChangeItem} items={items} />
                    </Sider>
                </Affix>
                <Content
                    style={{
                        backgroundColor: "white",
                        padding: 16,
                        justifyContent: "center",
                        overflowY: 'scroll'
                    }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;