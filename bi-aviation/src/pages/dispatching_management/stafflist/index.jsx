import React, { useState } from 'react';
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/Table';
import './index.css';

const { Option } = Select;

/* ================= 页面组件 ================= */
const StaffList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /* ===== 跳转 ===== */
  const handleDetail = record => {
    navigate(`/staff/detail/${record.id}`);
  };

  /* ===== 表格列 ===== */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Staff ID',
      dataIndex: 'staff_id',
    },
    {
      title: 'Contact',
      dataIndex: 'staff_contact',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => {
        const colorMap = {
          WORKING: 'blue',
          ON_STANDBY: 'green',
          ON_LEAVE: 'orange',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <a onClick={() => handleDetail(record)}>Details</a>
      ),
    },
  ];

  /* ===== 模拟数据 ===== */
  const data = [
    {
      id: 1,
      name: 'Mike',
      department: 'Cabin Crew',
      role: '001',
      staff_id: '111111',
      staff_contact: '02233451233',
      status: 'WORKING',
    },
    {
      id: 2,
      name: 'Edward',
      department: 'Maintenance',
      role: '001',
      staff_id: '222222',
      staff_contact: '02233451233',
      status: 'ON_STANDBY',
    },
    {
      id: 3,
      name: 'Nancy',
      department: 'Ground Operations',
      role: '001',
      staff_id: '333333',
      staff_contact: '02233451233',
      status: 'ON_LEAVE',
    },
    {
      id: 4,
      name: 'Rose',
      department: 'Administration',
      role: '001',
      staff_id: '444444',
      staff_contact: '02233451233',
      status: 'WORKING',
    },
  ];

  const [dataSource, setDataSource] = useState(data);

  /* ===== 搜索 ===== */
  const handleSearch = values => {
    const { name, depart, role, status } = values;

    const filtered = data.filter(item => {
      return (
        (!name || item.name.includes(name)) &&
        (!depart || item.department === depart) &&
        (!role || item.role.includes(role)) &&
        (!status || item.status === status)
      );
    });

    setDataSource(filtered);
  };

  /* ===== 重置 ===== */
  const handleReset = () => {
    form.resetFields();
    setDataSource(data);
  };

  return (
    <div className="staff-page">
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

        <Form.Item name="depart" label="Depart">
          <Select placeholder="Select" allowClear style={{ width: 180 }}>
            <Option value="Cabin Crew">Cabin Crew</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Ground Operations">Ground Operations</Option>
            <Option value="Administration">Administration</Option>
          </Select>
        </Form.Item>

        <Form.Item name="role" label="Role">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="001">001</Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="WORKING">WORKING</Option>
            <Option value="ON_STANDBY">ON_STANDBY</Option>
            <Option value="ON_LEAVE">ON_LEAVE</Option>
          </Select>
        </Form.Item>

        <Form.Item className="form-actions">
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

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

export default StaffList;

