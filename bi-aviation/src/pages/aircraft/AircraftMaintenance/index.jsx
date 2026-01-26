import React,{ useState }from 'react'
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import CommonTable from '../../../components/Table';
import { useNavigate } from 'react-router-dom';
import './index.css';
const { Option } = Select;

/* ================= 页面组件 ================= */
const AircraftMaintenance = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 跳转逻辑
  const handleAdd = () => {
    navigate('/maintenance/add');
  };
  const handleTask = record => {
    navigate(`/maintenance/task/${record.id}`);
  };
  const handleResult = record => {
    navigate(`/maintenance/detail/${record.id}`);
  };

  // 表格列配置
  const columns = [
    {
      title: 'Registration',
      dataIndex: 'registration_no',
    },
    {
      title: 'Maintenance Type',
      dataIndex: 'maintenance_type',
    },
    {
      title: 'Maintenance Reason',
      dataIndex: 'maintenance_reason',
    },
    {
      title: 'Maintenance Time',
      dataIndex: 'maintenance_time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status === 'MAINTENANCE' ? 'orange' : 'green'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <a onClick={() => handleTask(record)}>Task</a>
          <a onClick={() => handleResult(record)}>Result</a>
        </Space>
      ),
    },
  ];


  /* 模拟数据 */
  const data = [
    {
      id: 1,
      registration_no: 'B-1001',
      maintenance_type: 'C-check',
      maintenance_reason: 'Schedule heavy maintenance',
      maintenance_time: '2018-03-15',
      status: 'MAINTENANCE',
    },
    {
      id: 2,
      registration_no: 'B-1002',
      maintenance_type: 'C-check',
      maintenance_reason: 'Under maintenance',
      maintenance_time: '2018-03-15',
      status: 'MAINTENANCE',
    },
  ];
  const [dataSource, setDataSource] = useState(data);

  //查询
  const handleSearch = values => {
    const {registration,type,status} = values;
    const filteredData = data.filter(item => {
      return (
        (!registration || item.registration_no.includes(registration)) &&
        (!type || item.maintenance_type === type) &&
        (!status || item.status === status)
      );
    });
    setDataSource(filteredData);
  }

    /* 重置 */
  const handleReset = () => {
    form.resetFields();
    setDataSource(data);
  };
  return (
    <div className="maintenance-page">
      {/* ================= 查询区域 ================= */}
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        className="search-form"
      >
        <Form.Item name="registration" label="Registration">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="type" label="Type">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="MAINTENANCE">Maintenance</Option>
            <Option value="COMPLETED">Completed</Option>
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

      {/* ================= Add 按钮区域 ================= */}
      <Button className = 'add-bar' type="primary" onClick={handleAdd}>Add</Button>

      {/* ================= 表格区域 ================= */}
        
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

export default AircraftMaintenance;