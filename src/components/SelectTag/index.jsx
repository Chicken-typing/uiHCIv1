import { Select } from 'antd';
import React from 'react';
import './style.scss'
const SelectTag = (props) => {
    return (
        <Select
            mode="multiple"
            style={{
                width: '100%',
            }}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            options={props.option}
        >
        </Select>
    )
}

export default SelectTag;
