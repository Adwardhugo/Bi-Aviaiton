import React, { useState,useEffect} from 'react';
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/Table';
import { fetchStaffList } from '../../../apis/staff';
import './index.css';

const { Option } = Select;

/* ================= 页面组件 ================= */
const StaffList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===== 跳转 ===== */
  const handleDetail = record => {
    navigate(`/dispatch/staff/${record.staffId}`);
  };

  /* ===== 表格列 ===== */
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Department', dataIndex: 'department' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Staff ID', dataIndex: 'staffId' },
    { title: 'Contact', dataIndex: 'contact' },
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
      render: (_, record) => (
        <a onClick={() => navigate(`/staff/detail/${record.staffId}`)}>
          Details
        </a>
      ),
    },
  ];
  /* ===== 模拟数据 ===== */
  // const data = [
  //   {
  //     id: 1,
  //     name: 'Mike',
  //     department: 'Cabin Crew',
  //     role: '001',
  //     staff_id: '111111',
  //     staff_contact: '02233451233',
  //     status: 'WORKING',
  //   },
  //   {
  //     id: 2,
  //     name: 'Edward',
  //     department: 'Maintenance',
  //     role: '001',
  //     staff_id: '222222',
  //     staff_contact: '02233451233',
  //     status: 'ON_STANDBY',
  //   },
  //   {
  //     id: 3,
  //     name: 'Nancy',
  //     department: 'Ground Operations',
  //     role: '001',
  //     staff_id: '333333',
  //     staff_contact: '02233451233',
  //     status: 'ON_LEAVE',
  //   },
  //   {
  //     id: 4,
  //     name: 'Rose',
  //     department: 'Administration',
  //     role: '001',
  //     staff_id: '444444',
  //     staff_contact: '02233451233',
  //     status: 'WORKING',
  //   },
  // ];

  /* ================= 后端拉取数据 ================= */
  const fetchList = async (params = {}, page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const res = await fetchStaffList({
        page,
        size: pageSize,
        ...params,
      });
      console.log('res =', res);
      setDataSource(res.data.rows);
      setPagination(prev => ({
        ...prev,
        total: res.data.total,
      }));
    } finally {
      setLoading(false);
    }
  };
  /* ================= 页面首次加载 ================= */
  useEffect(() => {
    fetchList({}, 1, 10);
  }, []);
  
  /* ===== 搜索 ===== */
  const handleSearch = values => {
    fetchList(values, 1, pagination.pageSize);
  };
 /* ===== 重制 ===== */
  const handleReset = () => {
    form.resetFields();
    fetchList({}, 1, pagination.pageSize);
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

        <Form.Item name="department" label="Depart">
          <Select placeholder="Select" allowClear style={{ width: 180 }}>
            <Option value="Cabin Crew">Cabin Crew</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Ground Operations">Ground Operations</Option>
            <Option value="Administration">Administration</Option>
          </Select>
        </Form.Item>

        <Form.Item name="role" label="Role">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="Admin Officer">Admin Officer</Option>
            <Option value="Ground Staff">Ground Staff</Option>
            <Option value="Engineer">Engineer</Option>
            <Option value="Cabin Crew">Cabin Crew</Option>
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
              Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* ===== 表格 ===== */}
      <CommonTable
        columns={columns}
        dataSource={dataSource}
        rowKey="staffId"
        loading={loading}
        pagination={pagination}
        onChange={(pager) => {
          fetchList(form.getFieldsValue(), pager.current, pager.pageSize);
        }}
      />
    </div>
  );
};

export default StaffList;

