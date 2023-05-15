import { message, Radio,Modal } from 'antd';
import React, { useState } from 'react';
const SizeSelection = ({ open, item, addItem,handleClose }) => {
    const { Group, Button } = Radio
    const[sizeSelect,SetsizeSelect]=useState(null)
    const sizes = item.size
    const handleSelect = (e) => SetsizeSelect(e.target.value)
    const onOk = () => {
        if (sizeSelect) {
            handleClose()
            const itemSelect = {
                ...item,
                size:sizeSelect
            }
            addItem(itemSelect)
        } else {
            message.warning('Please select the size of shoe!s');
        }
    }
    const onCancel = () => {
        handleClose()
    }
    const option = []
    sizes.map(size => option.push({
        label: size,
        value:size*1
    }))
    return (
        <Modal open={open} onOk={onOk} onCancel={onCancel} title="Select size" bodyStyle={{ display:'flex',justifyContent:'center'}} destroyOnClose>
            < Group onChange={handleSelect}
                options={option}
                optionType="button"
                buttonStyle="solid"
                size='large'/>
        </Modal>
    )
}
export default SizeSelection