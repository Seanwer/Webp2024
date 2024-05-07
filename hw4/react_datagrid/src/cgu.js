import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataTable() {
  const [rows, setRows] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
      .then(response => response.json())
      .then(data => {
        // 假设 showInfo 是一个数组，我们取第一个 showInfo 来显示地点和票价
        const transformedData = data.map(item => ({
          id: item.UID,  // 确保每行有唯一的id
          title: item.title,
          location: item.showInfo[0]?.locationName || '未知地点',  // 使用安全导航操作符以避免运行时错误
          price: item.showInfo[0]?.price || '未知票价'
        }));
        setRows(transformedData);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        // setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'title', headerName: '主题', width: 200 },
    { field: 'location', headerName: '地点', width: 150 },
    { field: 'price', headerName: '票价', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10,15]}
      />
    </div>
  );
}

export default DataTable;
