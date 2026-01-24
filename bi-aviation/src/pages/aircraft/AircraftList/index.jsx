import React,{ useState }from 'react'
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import CommonTable from '../../../components/Table';
import { useNavigate } from 'react-router-dom';
import './index.css';
const { Option } = Select;






/* ================= 页面组件 ================= */
const AircraftList = () => {
  const navigate = useNavigate();
  const handleDetail = record => {
    navigate(`/aircraft/detail/${record.id}`);
  };

  const columns = [
  {
    title: 'Registration',
    dataIndex: 'registration_no',
  },
  {
    title: 'Aircraft Type',
    dataIndex: 'aircraft_type',
  },
    {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
  },
    {
    title: 'Serial number',
    dataIndex: 'serial_number',
  },
  {
    title: 'Status', 
    dataIndex: 'aircraft_status',
    render: status => (
      <Tag color={status === 'ACTIVE' ? 'green' : 'yellow'}>
        {status}
      </Tag>
    ),
  },
    {
    title: 'Delivery date',
    dataIndex: 'delivery_date',
  },
    {
    title: 'Service date',
    dataIndex: 'in_service_date',
  },
    {
    title: 'Operator code',
    dataIndex: 'operator_code',
  },
    {
    title: 'Base airport',
    dataIndex: 'base_airport',
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (_, record) => (
      <a onClick={() => handleDetail(record)}>Details</a>
    ),
  },
]; 
  const data = [
  {
    id: 1,
    registration_no: 'B-3001',
    aircraft_type: 'A321',
    manufacturer: 'Airbus',
    serial_number: 'A321-200-001',
    aircraft_status: 'MAINTENANCE',
    delivery_date: '2020-01-15',
    in_service_date: '2020-02-01',
    operator_code: 'OP123',
    base_airport: 'JFK',
    
  },
  {
    id: 2,
    registration_no: 'B-3002',
    aircraft_type: 'A321',
    manufacturer: 'Airbus',
    serial_number: 'A321-200-002',
    aircraft_status: 'ACTIVE',
    delivery_date: '2020-01-16',
    in_service_date: '2020-02-02',
    operator_code: 'OP124',
    base_airport: 'LAX',
  },
];
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(data);


  /* 查询 */
  const handleSearch = values => {
    const { registration, serialNumber, operatorCode, status } = values;

    const filtered = data.filter(item => {
      return (
        (!registration ||
          item.registration_no.includes(registration)) &&
        (!serialNumber ||
          item.serial_number.includes(serialNumber)) &&
        (!operatorCode ||
          item.operator_code.includes(operatorCode)) &&
        (!status || item.aircraft_status === status)
      );
    });

    setDataSource(filtered);
  };

  /* 重置 */
  const handleReset = () => {
    form.resetFields();
    setDataSource(data);
  };
  return (
    <div className="aircraft-list-page">
      {/* ================= 查询区域 ================= */}
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        className="search-form"
      >
        <Form.Item  label="Registration">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="serialNumber" label="Serial Number">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="operatorCode" label="Operator Code">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="status" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="ACTIVE">Active</Option>
            <Option value="MAINTENANCE">Maintenance</Option>
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

export default AircraftList

