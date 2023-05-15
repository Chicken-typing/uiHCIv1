import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import { Button, Dropdown, Menu, Space } from "antd";
import { Select } from "antd";
const { Option } = Select;

function Filter({ filterHighLow, filterLowHigh, filterNike, filterAdidas, all }) {

  const [type, setType] = useState('All')
  useEffect(() => {
    switch (type) {
      case 'All': {
        all()
        break
      }
      case 'Price: High-Low': {
        filterHighLow()
        break
      }
      case 'Price: Low-High': {
        filterLowHigh()
        break
      }
      case 'Nike': {
        filterNike()
        break
      }
      case 'Adidas': {
        filterAdidas()
        break
      }
    }
  }, [type]);

  const items =
    [
      {
        label: "All",
        key: 'All',

      },
      {
        label:"Price: High-Low",
        key: 'Price: High-Low',
      },
      {
        label: "Price: Low-High",
        key: 'Price: Low-High',
      },
      {
        label: "Nike",
        key: 'Nike',
      },
      {
        label: "Adidas",
        key: 'Adidas',
      },
    ]

  return (
    <div className="mt-[40px] ">
      <Dropdown menu={{ items, onClick: e => setType(e.key), defaultSelectedKeys: [type] }} trigger={['click']}  >
        <Button type='text' onClick={(e) => e.preventDefault()}>
          <Space style={{ color: 'black', fontSize: '20px' }} >
            {type}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}

export default Filter;
