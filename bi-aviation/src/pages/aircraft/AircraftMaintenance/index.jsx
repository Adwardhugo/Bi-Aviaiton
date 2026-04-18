import React,{ useState,useEffect}from 'react'
import { Form, Input, Select, Button, Space, Tag,Drawer,DatePicker } from 'antd';
import CommonTable from '../../../components/Table';
import { fetchAircraftMaintenanceList } from '../../../apis/aircraft';
import { createMaintenancePlan } from '../../../apis/maintenance_plan';
import { fetchTaskByPlanId } from '../../../apis/taskDetails';
import './index.css';
const { Option } = Select;


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

    const statusColorMap = {
    PLANNED: 'orange',
    IN_PROGRESS: 'blue',
    COMPLETED: 'green',
  };
    const[planForm]=Form.useForm();
    const[planDrawerOpen,setPlanDrawerOpen]=useState(false);
    const[taskVisible,setTaskVisible]=useState(false);
    const[taskData,setTaskData]=useState([]);
    const[currentPlanId,setCurrentPlanId]=useState(null);
  
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
        </Space>
      ),
    },
  ];
  //Task详情列配置
  const taskColumns = [
  { title: 'Task ID', dataIndex: 'taskId' },
  { title: 'Plan ID', dataIndex: 'planId' },
  { title: 'Aircraft ID', dataIndex: 'aircraftId' },
  { title: 'Task Name', dataIndex: 'taskName' },
  { title: 'Task Type', dataIndex: 'taskType' },
  { title: 'Actual Start', dataIndex: 'actualStartTime' },
  { title: 'Actual End', dataIndex: 'actualEndTime' },
  {
    title: 'Status',
    dataIndex: 'taskStatus',
    render: status => {
      const colorMap = {
        PLANNED: 'orange',
        IN_PROGRESS: 'blue',
        COMPLETED: 'green',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    },
  },
  { title: 'Engineer ID', dataIndex: 'engineerId' },
  { title: 'Remark', dataIndex: 'remark' },
  { title: 'Created At', dataIndex: 'createdAt' },
  { title: 'Updated At', dataIndex: 'updatedAt' },
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
    fetchList(form.getFieldsValue());
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

  /* ================= Task ================= */
  const handleTask = async (record) => {
    const planId = record.planId;
    setCurrentPlanId(record.planId);
    const res = await fetchTaskByPlanId({planId});
    setTaskData(res.data);
    setTaskVisible(true);
  }
/* ================= Add================= */
  const handleAdd = () => {
  planForm.resetFields();
  setPlanDrawerOpen(true);
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
      {/* ================= Add plan Drawer ================= */}
      <Drawer
      title="Create Maintenance Plan"
      width={600}
      open={planDrawerOpen}
      onClose={() => setPlanDrawerOpen(false)}
      destroyOnClose
      >
      <Form
        form={planForm}
        layout="vertical"
        onFinish={async (values) => {
          const payload = {
            ...values,
            plannedStartTime: values.plannedStartTime
              ? values.plannedStartTime.format('YYYY-MM-DDTHH:mm:ss')
              : null,
            plannedEndTime: values.plannedEndTime
              ? values.plannedEndTime.format('YYYY-MM-DDTHH:mm:ss')
              : null,
            createdBy: 'admin', // 可以后续从登录用户获取
          };

          await createMaintenancePlan(payload);

          setPlanDrawerOpen(false);
          planForm.resetFields();
          fetchList();
        }}
      >

        {/* Aircraft ID */}
        <Form.Item
          label="Aircraft ID"
          name="aircraftId"
          rules={[{ required: true, message: 'Please input aircraft id' }]}
        >
          <Input placeholder="Enter aircraft id" />
        </Form.Item>

        {/* Maintenance Type */}
        <Form.Item
          label="Maintenance Type"
          name="maintenanceType"
          rules={[{ required: true, message: 'Please select maintenance type' }]}
        >
          <Select placeholder="Select maintenance type">
            <Option value="A_CHECK">A-Check</Option>
            <Option value="B_CHECK">B-Check</Option>
            <Option value="C_CHECK">C-Check</Option>
            <Option value="D_CHECK">D-Check</Option>
          </Select>
        </Form.Item>

        {/* Maintenance Reason */}
        <Form.Item
          label="Maintenance Reason"
          name="maintenanceReason"
          rules={[{ required: true, message: 'Please input maintenance reason' }]}
        >
          <Input.TextArea rows={3} placeholder="Enter maintenance reason" />
        </Form.Item>

        {/* Planned Start Time */}
        <Form.Item
          label="Planned Start Time"
          name="plannedStartTime"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* Planned End Time */}
        <Form.Item
          label="Planned End Time"
          name="plannedEndTime"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* Plan Status */}
        <Form.Item
          label="Plan Status"
          name="planStatus"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Option value="PLANNED">Planned</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="COMPLETED">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => setPlanDrawerOpen(false)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>

      </Form>
      </Drawer>
      {/* ================= Task Drawer ================= */}
      <Drawer
        title={`Task Detail - Plan ${currentPlanId}`}
        width={1000}
        open={taskVisible}
        onClose={() => setTaskVisible(false)}
      >
        <CommonTable
          rowKey="taskId"
          columns={taskColumns}
          dataSource={taskData}
          scroll={{ x: 1400 }}
        />
      </Drawer>


    </div>
  );
};

export default AircraftMaintenance;