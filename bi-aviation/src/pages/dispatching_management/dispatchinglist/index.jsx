import React, { useState } from 'react';
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/Table';
import './index.css';

const { Option } = Select;

const ScheduleList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /* ====== 跳转行为 ====== */
  const handleAdd = () => {
    navigate('/schedule/add');
  };

  const handleDetail = record => {
    navigate(`/schedule/detail/${record.id}`);
  };

  const handleEdit = record => {
    navigate(`/schedule/edit/${record.id}`);
  };

  const handleDelete = record => {
    console.log('delete', record);
    // 后期接接口
  };

  /* ====== 表格列 ====== */
  const columns = [
    {
      title: 'Schedule Name',
      dataIndex: 'schedule_name',
    },
    {
      title: 'Schedule Details',
      dataIndex: 'schedule_details',
    },
    {
      title: 'Origin - Destination',
      dataIndex: 'route',
    },
    {
      title: 'Schedule Time',
      dataIndex: 'schedule_time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => {
        const colorMap = {
          DRAFT: 'green',
          CONFIRMED: 'blue',
          CANCELLED: 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <a onClick={() => handleDetail(record)}>Details</a>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a style={{ color: 'red' }} onClick={() => handleDelete(record)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  /* ====== 模拟数据 ====== */
  const data = [
    {
      id: 1,
      schedule_name: '001',
      schedule_details: 'Schedule',
      route: 'ZBAA - NZ',
      schedule_time: 'NZ',
      status: 'DRAFT',
    },
    {
      id: 2,
      schedule_name: '002',
      schedule_details: 'Schedule',
      route: 'ZBAA - NZ',
      schedule_time: 'NZ',
      status: 'CONFIRMED',
    },
    {
      id: 3,
      schedule_name: '003',
      schedule_details: 'Schedule',
      route: 'ZBAA - NZ',
      schedule_time: 'NZ',
      status: 'CANCELLED',
    },
  ];

  const [dataSource, setDataSource] = useState(data);

  /* ====== 搜索 ====== */
  const handleSearch = values => {
    const { name, origin, destination, status } = values;

    const filtered = data.filter(item => {
      return (
        (!name || item.schedule_name.includes(name)) &&
        (!origin || item.route.includes(origin)) &&
        (!destination || item.route.includes(destination)) &&
        (!status || item.status === status)
      );
    });

    setDataSource(filtered);
  };

  /* ====== 重置 ====== */
  const handleReset = () => {
    form.resetFields();
    setDataSource(data);
  };

  return (
    <div className="schedule-page">
      {/* ===== 查询区域 ===== */}
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        className="search-form"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="origin" label="Origin">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="destination" label="Destination">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="DRAFT">Draft</Option>
            <Option value="CONFIRMED">Confirmed</Option>
            <Option value="CANCELLED">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item className="form-actions">
          <Space>
            <Button type="primary" htmlType="submit">
            Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* ===== Add 按钮 ===== */}
      <div className="add-bar">
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>

      {/* ===== 表格 ===== */}
      <CommonTable
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default ScheduleList;

