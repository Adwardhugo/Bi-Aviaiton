import React,{ useState,useEffect}from 'react'
import { Form, Input, Select, Button, Space, Tag } from 'antd';
import CommonTable from '../../../components/Table';
import { fetchAircraftMaintenanceList } from '../../../apis/aircraft';
import './index.css';
const { Option } = Select;

/* ================= 详情字段组件 ================= */
const DescriptionItem = ({ label, value }) => (
  <div style={{ marginBottom: 12 }}>
    <span style={{ color: '#8c8c8c', marginRight: 8 }}>{label}:</span>
    <span style={{ fontWeight: 500 }}>{value ?? '-'}</span>
  </div>
);

/* ================= 页面组件 ================= */
const AircraftMaintenance = () => {
    const [form] = Form.useForm();
  
  /* ================= 状态管理state ================= */
    const [maintenceDataSource, setMaintenceDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const[currentAircraft,setCurrentAircraft]=useState(null);
    const statusColorMap = {
    PLANNED: 'orange',
    IN_PROGRESS: 'blue',
    COMPLETED: 'green',
  };
  
  // 表格列配置
  const columns = [
    {
      title: 'Registration',
      dataIndex: 'registrationNo',
    },
    {
      title: 'Maintenance Type',
      dataIndex: 'maintenanceType',
    },
    {
      title: 'Maintenance Reason',
      dataIndex: 'maintenanceReason',
    },
    {
      title: 'Maintenance Time',
      dataIndex: 'plannedStartTime',
    },
    {
      title: 'Status',
      dataIndex: 'planStatus',
      render: status => (
        <Tag color={statusColorMap[status] || 'default'}>
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
  

  // /* 模拟数据 */
  // const data = [
  //   {
  //     id: 1,
  //     registration_no: 'B-1001',
  //     maintenance_type: 'C-check',
  //     maintenance_reason: 'Schedule heavy maintenance',
  //     maintenance_time: '2018-03-15',
  //     status: 'MAINTENANCE',
  //   },
  //   {
  //     id: 2,
  //     registration_no: 'B-1002',
  //     maintenance_type: 'C-check',
  //     maintenance_reason: 'Under maintenance',
  //     maintenance_time: '2018-03-15',
  //     status: 'MAINTENANCE',
  //   },
  // ];

  //查询
  
/* ================= 后端拉取数据 ================= */
  const fetchList = async (params = {}, page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const res = await fetchAircraftMaintenanceList({
        page,
        size: pageSize,
        ...params,
      });
      console.log('res =', res);
      setMaintenceDataSource(res.data.rows);
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
    fetchList();
    
  }, [pagination.current, pagination.pageSize]);


    /* ================= 搜索 ================= */
  const handleSearch = values => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchList(values);
  };
    /* ================= 重置 ================= */
  const handleReset = () => {
    form.resetFields();
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchList();
  };
  /* ================= 分页变化 ================= */
  const handleTableChange = (pagination) => {
    const {current, pageSize} = pagination;
    setPagination(prev => ({
      ...prev,
      current,
      pageSize,
    }));

    fetchList(form.getFieldsValue(), current, pageSize);
  };
  /* ================= Result ================= */
  const handleResult = (record) => {
    setCurrentAircraft(record);
    setDrawerOpen(true);
  }
/* ================= Result ================= */
  const handleAdd = () => {
  setCurrentAircraft(null);
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
        <Form.Item name="registrationNo" label="Registration">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="maintenanceType" label="Type">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item name="planStatus" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="PLANNED">Planned</Option>
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
        dataSource={maintenceDataSource}
        loading={loading}
        rowKey="planId"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AircraftMaintenance;