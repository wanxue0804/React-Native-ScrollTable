import React, { useState, useEffect } from 'react';
import { View, Text, FlexAlignType, Alert } from 'react-native';
import ScrollTable, { HeaderAlign, Iorder } from 'react-native-scrollview-table';
import DataSource from './mockdata';

function NormalScrollTable () {
// console.log({Test})

  const [data, setData] = useState({
    lst: [],
    pg: {
      pt: 0
    }
  });
  const [queryParams, setQueryParams] = useState({
    order: '',
    orderName: '',
    pageSize: 20,
    pageIndex: 1
  });
  const [refreshing, setRefreshing] = useState(false);
  const [queryLoading, setQueryLoading] = useState(undefined); // 第一次进入页面不需要展示暂无数据


  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      flex: 0.4
    },
    {
      title: <Text>保证金率</Text>,
      dataIndex: 'loanPercent',
      flex: 0.333333,
      sorter: 'asc' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType
      },
      render: (text, item) => {
        return (
          <Text>{text}%</Text>
        );
      }
    },
    {
      title: <Text>最新价</Text>,
      dataIndex: 'price',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(item.chgVal)
            }}
          >{text}</Text>
        )
      }
    },
    {
      title: <Text >涨跌幅</Text>,
      dataIndex: 'chg',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
        paddingRight: 0
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text)
            }}
          >{text}%</Text>
        )
      }
    },
    {
      title: <Text>涨跌额</Text>,
      dataIndex: 'chgVal',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text)
            }}
          >{item.chgVal}</Text>
        )
      }
    },
    {
      title: <Text>成交量</Text>,
      dataIndex: 'volume',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}股</Text>
        )
      }
    },
    {
      title: <Text>成交额</Text>,
      dataIndex: 'turnover',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{+text/1000}</Text>
        )
      }
    },
    {
      title: <Text>换手率</Text>,
      dataIndex: 'hsl',
      flex: 0.3,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}%</Text>
        )
      }
    },
    {
      title: <Text>市盈率(静)</Text>,
      dataIndex: 'sylj',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{Number(text) < 0 ? '亏损' : text}</Text>
        )
      }
    },
    {
      title: <Text>市净率</Text>,
      dataIndex: 'sjl',
      flex: 0.33,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}</Text>
        )
      }
    }
  ];


  useEffect(() => {
    queryData();
  }, [queryParams]);


  // 模拟请求数据
  const queryData = async () => {
    if (queryParams.pageIndex !== 1) {
      setQueryLoading(true);
    }
    // 模拟数据排序无效
    let timer = null;
    timer && clearTimeout(timer);
    timer = await setTimeout(() => {
      let resultData = {...data};
      const response = {
        pg: {
          ...DataSource.pg,
          idx: queryParams.pageIndex,
          pt: Math.ceil(DataSource.pg.dc / queryParams.pageSize)
        },
        lst: DataSource.lst.slice((queryParams.pageIndex - 1) * queryParams.pageSize, queryParams.pageIndex * queryParams.pageSize)
      }
      if (queryParams.pageIndex === 1) {
        resultData = response;
      } else {
        resultData = {
          ...response,
          lst: resultData.lst.concat(response.lst)
        }
      }
      setData(resultData);
      setRefreshing(false);
      setQueryLoading(false);
    }, 2000);
  };


  // 获取颜色
  const getColor = (number: string | number, black?: string) => {
    let color = '#313131';
    if (typeof +number !== 'number') return color;
    if (black === 'black') {
      return +number === 0 ? '#C9C9C9' : color;
    }
    if (+number > 0) {
      color = 'red';
    } else if (+number < 0) {
      color = 'green';
    }
    return color;
  };


  // 表格操作 翻页或排序
  const handleTableChange = (pagination, order) => {
    setQueryParams({
      ...queryParams,
      pageIndex: pagination.pageIndex,
      order: order.order,
      orderName: order.field
    });
  };

  // 下拉刷新 如果不需要设置刷新状态展示效果 可以不需要此方法 会自动执行 handleTableChange
  const handleRefresh = () => {
    setRefreshing(true);
    setQueryParams({
      ...queryParams,
      pageIndex: 1
    });
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollTable
        data={data.lst}
        rowHeight={50}
        rowStyle={(index) => {
          return index % 2 && { backgroundColor: '#f5f5f5' }
        }}
        columns={columns}
        refreshing={refreshing}
        loading={queryLoading}
        restScollView={{
          bounces: false
        }}
        styles={{
          theaderStyle: {backgroundColor: 'pink', borderBottomWidth: 0},
        }}
        onRefresh={handleRefresh}
        onChange={handleTableChange}
        onRowPress= {(item, index) => {Alert.alert(`点击了第${index}行, 数据${JSON.stringify(item)}`)}}
        pagination={{
          pageIndex: queryParams.pageIndex,
          pageTotal: data.pg.pt,
          startIndex: 1
        }}
      />
    </View>
  );
}

export default NormalScrollTable;
