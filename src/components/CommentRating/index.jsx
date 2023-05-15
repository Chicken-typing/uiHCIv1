import React, { useState } from "react";
import { Button, Form, Input, Rate, notification } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeartFilled } from '@ant-design/icons'
const { TextArea } = Input;
function CommentRating({callback}) {
  const navigate = useNavigate()
  const token = useSelector(state => state.User.userInfor)
  const [form] = Form.useForm();
  const openNotification = () => {

    const btn = (
      <Button type="primary" size="small" onClick={() => {
        navigate('/login')
        notification.close()
      }}>
        Click here!
      </Button>
    );
    notification.open({
      message: 'Notification Title',
      description:
        'Please Sign In to comment',
      btn,
      duration: 2,
    });
  };
  const handleSubmit = () => {
    if (!token.token) {
      openNotification()
    } else {
      form.submit()
    }
  }
  const onFinish = (values) => {
    callback(values)
    form.resetFields();
  };
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="font-bold tex-2xl mb-4">Comment and Rating Product</div>

      <Form.Item name="rating">
        <Rate character={<HeartFilled />} allowClear />
      </Form.Item>

      <Form.Item name="comment">
        <TextArea autoSize={{
          minRows: 2,
          maxRows: 6,
        }} />
      </Form.Item>

      <Form.Item
      >
        <Button type="primary" onClick={()=>handleSubmit()}>
          Send your comment
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CommentRating;