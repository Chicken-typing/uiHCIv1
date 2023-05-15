import { Card } from 'antd';
import React from 'react';
const CardWrapper = (props) => {
    return (
        <Card
            title={props.title}
            bordered={props.bordered}
            hoverable={props.hoverable}
            style={{
                ...props.style,
                height: 700
            }}
        >
            {props.children}
        </Card>
    );
}
CardWrapper.defaultProps = {
    title: "",
    bordered: false,
    hoverable: true,

}

export default CardWrapper;
