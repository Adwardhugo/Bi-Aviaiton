import React,{ useState ,useEffect}from 'react'
import {formatDateTime} from '../../../utils/date';
import { Form, Input, Select, Button, Space, Tag, Drawer, Row, Col,Divider} from 'antd';
import CommonTable from '../../../components/Table';
import { useNavigate } from 'react-router-dom';
import { fetchAircraftList } from '../../../apis/aircraft';
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
const AircraftList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

/* ================= 状态管理state ================= */
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const[currentAircraft,setCurrentAircraft]=useState(null);


  
  const columns = [
  {
    title: 'Registration',
    dataIndex: 'registrationNo'
  },
  {
    title: 'Aircraft Type',
    dataIndex: 'aircraftType',
  },
    {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
  },
    {
    title: 'Serial number',
    dataIndex: 'serialNumber',
  },
  {
    title: 'Status', 
    dataIndex: 'aircraftStatus',
    render: status => (
      <Tag color={status === 'ACTIVE' ? 'green' : 'orange'}>
        {status}
      </Tag>
    ),
  },
    {
    title: 'Delivery date',
    dataIndex: 'deliveryDate',
  },
    {
    title: 'Service date',
    dataIndex: 'inServiceDate',
  },
    {
    title: 'Operator code',
    dataIndex: 'operatorCode',
  },
    {
    title: 'Base airport',
    dataIndex: 'baseAirport',
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (_, record) => (
      <a onClick={() =>
      {
        setCurrentAircraft(record);
        setDrawerOpen(true);
      }}>
          Details
      </a>
    ),
  },
]; 

//   const data = [
//   {
//     id: 1,
//     registration_no: 'B-3001',
//     aircraft_type: 'A321',
//     manufacturer: 'Airbus',
//     serial_number: 'A321-200-001',
//     aircraft_status: 'MAINTENANCE',
//     delivery_date: '2020-01-15',
//     in_service_date: '2020-02-01',
//     operator_code: 'OP123',
//     base_airport: 'JFK',
//
//   },
//   {
//     id: 2,
//     registration_no: 'B-3002',
//     aircraft_type: 'A321',
//     manufacturer: 'Airbus',
//     serial_number: 'A321-200-002',
//     aircraft_status: 'ACTIVE',
//     delivery_date: '2020-01-16',
//     in_service_date: '2020-02-02',
//     operator_code: 'OP124',
//     base_airport: 'LAX',
//   },
// ];
 

  // /* 详情 */
  // const handleDetail = record => {
  //   navigate(`/aircraft/list/detail/${record.id}`);
  // };


  /* ================= 后端拉取数据 ================= */
  const fetchList = async (params = {}, page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const res = await fetchAircraftList({
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

  return (
    <div className="aircraft-list-page">
      {/* ================= 查询区域 ================= */}
      <Form
        form={form}
        onFinish={handleSearch}
        className="search-form"
      >
        <Form.Item  name="registrationNo" label="Registration">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="serialNumber" label="Serial Number">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="operatorCode" label="Operator Code">
          <Input placeholder="Enter keyword" allowClear />
        </Form.Item>

        <Form.Item  name="aircraftStatus" label="Status">
          <Select placeholder="Select" allowClear style={{ width: 160 }}>
            <Option value="ACTIVE">Active</Option>
            <Option value="MAINTENANCE">Maintenance</Option>
            <Option value="GROUNDED">Grounded</Option>
          </Select>
        </Form.Item>

        <Form.Item className="form-actions">
        <Space>
          <Button type="primary" htmlType="submit">Search</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </Form.Item>
      </Form>

      {/* ================= 表格区域 ================= */}
      <CommonTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="aircraftId"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      {/* ================= Drawer 详情 ================= */}
      <Drawer
        title="Aircraft Details"
        width={720}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {currentAircraft && (
          <>
            {/* ================= Basic Info ================= */}
            <Divider orientation="left">Basic Information</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <DescriptionItem label="Registration" value={currentAircraft.registrationNo} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Aircraft Type" value={currentAircraft.aircraftType} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Manufacturer" value={currentAircraft.manufacturer} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Serial Number" value={currentAircraft.serialNumber} />
              </Col>
            </Row>

            {/* ================= Status / Operation ================= */}
            <Divider orientation="left">Operation Status</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <DescriptionItem label="Status" value={currentAircraft.aircraftStatus} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Operator Code" value={currentAircraft.operatorCode} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Base Airport" value={currentAircraft.baseAirport} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Seat Capacity" value={currentAircraft.seatCapacity} />
              </Col>
            </Row>

            {/* ================= Dates ================= */}
            <Divider orientation="left">Service Dates</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <DescriptionItem label="Delivery Date" value={currentAircraft.deliveryDate} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="In Service Date" value={currentAircraft.inServiceDate} />
              </Col>
            </Row>

            {/* ================= Technical ================= */}
            <Divider orientation="left">Technical Parameters</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <DescriptionItem
                  label="Max Takeoff Weight"
                  value={
                    currentAircraft.maxTakeoffWeight
                      ? `${currentAircraft.maxTakeoffWeight} t`
                      : '-'
                  }
                />
              </Col>
            </Row>

            {/* ================= System Info ================= */}
            <Divider orientation="left">System Info</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <DescriptionItem label="Created At" value={formatDateTime(currentAircraft.createdAt)} />
              </Col>
              <Col span={12}>
                <DescriptionItem label="Updated At" value={formatDateTime(currentAircraft.updatedAt)} />
              </Col>
            </Row>
          </>
        )}
      </Drawer>

    </div>
  );
};

export default AircraftList

