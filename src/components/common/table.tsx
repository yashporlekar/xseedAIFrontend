// import React from 'react';
// import { Table, TableProps } from 'antd';
// import { ColumnsType } from 'antd/lib/table';

// interface CommonTableProps extends TableProps<any> {
//   columns: ColumnsType<any>;
//   data: any[];
  
// }

// const CommonTable: React.FC<CommonTableProps> = ({ columns, data, ...rest }) => {
//   return <Table columns={columns} dataSource={data} bordered {...rest} />;
// };

// export default CommonTable;


import React from 'react';
import { Table } from 'antd';

import { TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface CommonTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
}

const CommonTable = <T extends object>({ columns, data, ...rest }: CommonTableProps<T>) => {
  return <Table<T> columns={columns} dataSource={data} bordered {...rest} />;
};

export default CommonTable;
