import React from 'react';
import { Select, Input, Form, Upload, InputNumber } from 'antd';
import { HeartOutlined, DollarCircleOutlined, FormOutlined, UploadOutlined, DropboxOutlined } from '@ant-design/icons';
import InputImage from '../../../components/InputImage';
import Button from '../../../components/Button';
import './style.scss'
import addProduct from '../../../services/addProduct';
import { fetchProduct } from '../../../action';
import { useDispatch } from 'react-redux';
const { TextArea } = Input
const brands = [{
    key: 'nike',
    label: 'Nike',
    value: 'Nike',
},
{
    key: 'adidas',
    label: 'Adidas',
    value: 'Adidas',
},]
const tags = [{
    key: 'man',
    label: 'Man',
    value: 'man',
},
{
    key: 'woman',
    label: 'Woman',
    value: 'woman',
},
{
    key: 'kid',
    label: 'Kid',
    value: 'kid',
},
]

const AddProductTab = () => {
    const dispatch = useDispatch();
    const Refetch = (callback) => {
        return setTimeout(() => {
            dispatch(callback);
        }, 1000)
    }
    const [form] = Form.useForm();
    const onFinish = (value) => {
        addProduct(value)
        Refetch(fetchProduct())
        form.resetFields()
    };
    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div
            className="AddProductTab">
            <Form
                form={form}
                onFinish={onFinish}
                style={{
                    maxWitdth: 650,
                    border: "1px solid #dadada",
                    borderRadius: 10,
                    padding: "15px 15px 20px 15px"
                }}
                className="InputCart">
                <Form.Item name="name" rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    },
                ]}>
                    <Input placeholder='Name of product' prefix={<HeartOutlined />} />
                </Form.Item>
                <Form.Item name="price" rules={[
                    {
                        required: true,
                        message: 'Please input price',
                    },
                ]}>
                    <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder='5.000'
                        prefix={<DollarCircleOutlined />}
                        style={{
                            width: '100%',
                        }} />
                </Form.Item>
                <Form.Item name="countInStock" rules={[
                    {
                        required: true,
                        message: 'Please input the quantity of product',
                    },
                ]}>
                    <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder='Quantity of product'
                        prefix={<DropboxOutlined />}
                        style={{
                            width: '100%',
                        }} />
                </Form.Item>
                <Form.Item name="category" rules={[
                    {
                        required: true,
                        message: 'Please input type',
                    },
                ]}>
                    <Select options={tags} mode="multiple" onChange={handleChange} placeholder="Type of product" />
                </Form.Item>
                <Form.Item name="brand" rules={[
                    {
                        required: true,
                        message: 'Please input brand',
                    },
                ]}>
                    <Select options={brands} placeholder="Brand of product" />
                </Form.Item>
                <Form.Item name="description" rules={[
                    {
                        required: true,
                        message: 'Please input description',
                    },
                ]}>

                    <TextArea autoSize={{ minRows: 5, maxRows: 5 }} placeholder="Description" />
                </Form.Item>
                <Form.Item
                    name='images'
                    style={{
                        width: 600,
                        padding: "15px 7px 7px 15px",
                        borderRadius: 2,
                        marginBottom: 20
                    }}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}>
                    <Upload listType='picture' customRequest={({ onSuccess }) => {
                        setTimeout(() => {
                            onSuccess("ok");
                        }, 0);
                    }}>
                        <Button icon={<UploadOutlined />} type='link' style={{ display: 'flex', alignItem: 'center' }}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                    }}
                >
                    <Button style={{ width: 100 }} htmlType="submit"><FormOutlined />ADD</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddProductTab;