import React from 'react';
import { Table } from 'antd';

const CommonTable = ({
  columns,
  dataSource,
  rowKey = 'id',
  pagination = true,
  onChange,
  loading = false,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      onChange={onChange}
      loading={loading}
    />
  );
};

export default CommonTable;
