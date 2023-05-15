import { Layout, Skeleton, Empty } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AccountItem from '../../../components/AccountItem'
import AppBar from '../../../components/AppBar'
import { API_USER } from '../../../linkTo'
import deleteUser from '../../../services/deleteUser'
const { Header, Content } = Layout
export default function CustomerList(props) {
    const [result, setResult] = useState([])
    const [searching, setSearching] = useState(false)
    const [refresh, isRefresh] = useState(Date.now())
    const mail = {
        data: []
    }
    const dataUser = useSelector(state => state.fetchUser.dataUser.filter(user => user.role === 'customer'))
    useEffect( () => setResult(dataUser), [refresh])
    const handleSearch = (text) => {
        setResult([...dataUser.filter(object => object.username.toLowerCase().includes(text.toLowerCase()))])
        setSearching(true)
    }
    const search = {

        handleSearch: handleSearch
    }
    const handleDeleteUser = (url, id) => {
        deleteUser(url, id)
    }
    const deleteAccount = {
        handleDeleteUser: handleDeleteUser
    }
    const handleRefresh = () => {
        isRefresh(Date.now())
    }
    return (
        <>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <AppBar hasSearch={search} handleRefresh={handleRefresh} />
                </Header>
                <Content
                    style={{
                        overflow: "auto",
                        minHeight: 500,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingBottom: 20
                    }}>
                    {result.length > 0
                        ? result.map((user, index) => <AccountItem user={user} url={API_USER}
                            hasEmail handleDeleteUser={deleteAccount} isDisable={false} key={index} />)
                        : searching ?
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="The user do not exist." />
                            : <Skeleton active avatar />
                    }
                </Content>

            </Layout>

        </>
    )
}
