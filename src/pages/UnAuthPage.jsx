import React from 'react';
import { Result, Button, Card } from "antd"
import { useNavigate } from 'react-router-dom';


const UnAuthPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Card>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
                />
            </Card>
        </div>
    );
}

export default UnAuthPage;
