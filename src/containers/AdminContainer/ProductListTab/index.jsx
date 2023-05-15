import { DollarCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../action';
import deleteProduct from '../../../services/deleteProduct';
import updateProduct from '../../../services/updateProduct';
const { Item } = Form

const ProductListTab = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProduct({
            pathName: 'admin'
        }))
    }, [])

    const res = useSelector(state => state.fetchProduct.products.map((item) => {
        return {
            ...item,
            key: item._id
        }
    }
    ))
    const brands = [{
        text: "Nike",
        value: "Nike",
        key: 'nike'
    }, {
        text: "Adidas",
        value: "Adidas",
        key: 'adidas'
    }
    ]

    const categories =
        [
            {
                key: 'man',
                value: 'man',
                text: 'Man'
            },
            {
                key: 'woman',
                value: 'woman',
                text: 'Woman'
            },
            {
                key: 'kid',
                value: 'kid',
                text: 'Kid'
            },
        ]
    const Refetch = (callback) => {
        return setTimeout(() => {
            dispatch(callback);
        }, 1000)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editItem, setEditItem] = useState("")
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]} handleClose
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const confirm = (index) => {
        deleteProduct(index._id)

        Refetch(fetchProduct())

    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
            width: 380
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            filters: [
                ...brands
            ],
            onFilter: (value, record) => record.brand.indexOf(value) === 0
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (_, { category }) =>
            (
                <>
                    {
                        category.length > 0
                            ? category.map((tag) =>
                                <Tag color={tag === "man"
                                    ? 'red' : tag === "woman"
                                        ? 'cyan'
                                        : 'green'}>
                                    {tag}
                                </Tag>
                            )
                            : <Tag color='#108ee9'>Default</Tag>
                    }
                </>
            ),
            filters: [
                ...categories
            ],
            onFilter: (value, record) => record.category.includes(value)


        },
        {
            title: 'Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
        {
            width: 200,
            render: (_, index) => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                    <Button type='default' onClick={() => {
                        setIsModalOpen(true)
                        setEditItem(index)
                    }}>Edit</Button>
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => { confirm(index) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger'>Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];
    const onChange = (pagination, filters, sorter, extra) => {

    };
    const handleClose = () => {
        setIsModalOpen(false);

    }
    const handleSubmit = (id, values) => {
        updateProduct(id, values)
        handleClose()

        Refetch(fetchProduct())

    };
    return (
        <>
            <Table columns={columns} dataSource={res} onChange={onChange} pagination={{
                pageSize: 8,
                simple: true,
            }} />
            {EditForm(editItem, isModalOpen, handleSubmit, handleClose)}
        </>
    );
}
const EditForm = (item, open, handleSubmit, handleClose) => {
    const { _id, name, brand, category, price } = item
    if (item) {
        return (
            <Modal
                open={open}
                destroyOnClose
                closable={false}
                footer={null}
                title={<>Edit: <Tag color='geekblue' style={{ marginLeft: 5 }}>{name}</Tag></>}>
                <Form
                    onFinish={(value) => handleSubmit(_id, value)}
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    <Item label="Brand">{brand}</Item>
                    <Item label="Category">
                        <Space direction='horizontal'>
                            {category.map((tag) =>
                                <Tag color={tag === "man"
                                    ? 'red' : tag === "woman"
                                        ? 'cyan'
                                        : 'magnenta'}>
                                    {tag}
                                </Tag>)}
                        </Space>

                    </Item>
                    <Item label="Price"
                        name="price">
                        <Input prefix={<DollarCircleOutlined />} defaultValue={price} />
                    </Item>
                    <Item label="Description"
                        name="description" >
                        <Input.TextArea
                            rows={4}
                            autoSize={
                                {
                                    minRows: 4,
                                    maxRows: 4
                                }
                            }
                            defaultValue={item.description} />
                    </Item>
                    <Item
                        wrapperCol={{
                            offset: 14,
                            span: 16,
                        }}>
                        <Button type='default' style={{ margin: '0px 5px' }} onClick={handleClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit" style={{ margin: '0px 5px' }}>Submit</Button>
                    </Item>
                </Form>
            </Modal>
        )
    }
    else return (<></>)
}
export default ProductListTab;