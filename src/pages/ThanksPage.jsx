import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThanksPage = () => {
    const navigate= useNavigate()
    return (
        <div>
            <Result
                status="success"
                title="Successfully Purchased Product"
                subTitle="You can go shopping continue and choose your best product."
                extra={[
                    <Button key="buy" onClickCapture={() => {
                        navigate("/")
                    }}>Buy Again</Button>,
                ]}
            />
        </div>
    );
}

export default ThanksPage;
