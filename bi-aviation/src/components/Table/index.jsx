import React from 'react';
import { Table } from 'antd';

const CommonTable = ({
  columns,
  dataSource,
  rowKey = 'id',
  pagination = true,
  loading = false,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      loading={loading}
    />
  );
};

export default CommonTable;
