import React, { useState, useEffect, useRef, isValidElement, ReactNode, } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ViewStyle, Platform, ScrollView, ScrollViewProps, TouchableWithoutFeedback } from 'react-native';
// @ts-ignore
import ScrollViewCustom from './components/Scroll';
// import Link from '@/components/Btn/link';
import Sort from './components/Table/sort';
import Empty, { IProps as EmptyPropsType } from './components/Empty';
import ListFooter from './components/List/footer';


export type HeaderAlign = 'flex-start' | 'flex-end' | 'center';
export type IjustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
export type Iorder = "" | "asc" | "desc";
export interface Icolumns {
  dataIndex: string;
  title?: string | ReactNode;
  flex?: number; // 第一列为相对盒子的flex数值 其他列为右侧宽度的百分比
  style?: ViewStyle; // 单元格样式
  sorter?: Iorder; // 排序
  sortEmpty?: boolean; // 是否允许默认排序
  sortHeaderAlign?: HeaderAlign;  // 只能控制sort样式 可通过style修改样式
  render?: (value?: string | number, item?: any) => string | ReactNode;
}
interface Ipagination {
  pageIndex: number;
  pageTotal: number;
  startIndex: number; // 分页第一页的索引
}
interface Isort {
  order: string;
  field: string;
}

export interface Istyle {
  theaderStyle?: ViewStyle;
  tbodyStyle?: ViewStyle;
}
export interface Iprops extends ScrollViewProps {
  data: any[]; // 数据源
  columns: Icolumns[];
  onRefresh?: () => void; // 下拉刷新
  onChange?: (pagination: Ipagination, order: Isort) => void; // 排序、上拉加载
  pagination?: Ipagination; // 分页配置
  loading?: boolean | undefined; // 请求的loading
  rowEvent?: {
    href?: string;
    params?: {
      [key: string]: string | number;
    };
    onRowPress?: (item: any, index: number) => void;
  };
  rowHeight?: number; // 行高 统一值 默认40
  rowStyle?: (index?: number) => ViewStyle;
  refreshing?: boolean; // 下拉刷新的refreshing状态
  horizontalScroll?: boolean; // 是否允许左右滚动
  styles?: Istyle;
  renderFooter?: () => ReactNode;
  emptyConfig?: EmptyPropsType;
  restScollView?: ScrollViewProps; // 水平的滚动的配置
}

function ScrollTable ({
  data,
  columns,
  pagination,
  loading,
  rowEvent,
  rowHeight,
  horizontalScroll,
  onChange,
  onRefresh: handleRefresh,
  styles: propsStyles,
  renderFooter,
  emptyConfig,
  rowStyle,
  restScollView,
  ...resProps
}: Iprops) {
  const headScrollRef = useRef(null);
  const { onRowPress, ...restRow } = rowEvent;
  const [rightBoxWidth, setRightBoxWidth] = useState(0);
  const [orderParams, setOrderParams] = useState({
    order: '',
    field: ''
  });
  const [isLoadSort, setLoadSort] = useState(false);


  useEffect(() => {
    // 初始化表头排序
    if(isLoadSort === false){
      columns.some((item, i) => {
        if(item.sorter){
           setOrderParams({
             order: item.sorter,
             field: item.dataIndex
           })
           setLoadSort(true);
           return true;
        }
     });
    }  
  }, [isLoadSort, columns]);


  // 获取右侧所占屏幕物理宽度
  const getRightBoxWidth = ({nativeEvent}) => {
    if (!rightBoxWidth) {
      setRightBoxWidth(nativeEvent?.layout?.width);
    }
  };

  // 表格左右滚动
  const handleTbodyScroll = ({nativeEvent}) => {
    headScrollRef?.current?.scrollTo({
      x: nativeEvent.contentOffset.x,
      y: 0,
      animated: false
    })
  };

  // 点击排序
  const handleSort = (key, value) => {
    const orderKey = value ? key : '';
    setOrderParams({
      order: value,
      field: orderKey
    })
    onChange && onChange({...pagination, pageIndex: pagination.startIndex }, {order: value, field: orderKey})
  };

  // 触底翻页
  const onEndReached = () => {
    if (pagination.pageIndex + 1 > pagination.pageTotal) return;
    onChange && onChange({...pagination, pageIndex: pagination.pageIndex + 1}, orderParams);
  };

  // 滚动结束/模拟上拉加载
  const handleScrollEnd = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const isEndReached = (scrollOffset + scrollViewHeight) >= contentHeight - 50; // 是否滑动到底部，由于精度问题 不一定大于内容高度
    const isContentFillPage = contentHeight >= scrollViewHeight; // 内容高度是否大于列表高度
    if (loading || pagination?.pageIndex >= pagination?.pageTotal) return;
    if (isEndReached && isContentFillPage) {
      onEndReached();
    }
  };


  // 下拉刷新
  const onRefresh = () => {
    if (handleRefresh) {
      handleRefresh();
    } else {
      onChange && onChange({...pagination, pageIndex: pagination.startIndex}, orderParams);
    }
  }

  // 渲染第一列的行数据
  const renderFirstColRowItem = ({item, index}) => {
    let firstColContent = null;
    if (columns[0]?.render && typeof columns[0]?.render === 'function') {
      firstColContent = columns[0]?.render(item[columns[0]?.dataIndex], item);
    } else {
      firstColContent = item[columns[0]?.dataIndex];
    }
    let renderResult = isValidElement(firstColContent) ? firstColContent : <Text>{firstColContent}</Text>
    return (
      <TouchableWithoutFeedback key={index} {...restRow} onPress={() => onRowPress && onRowPress(item, index)}>
        <View style={[styles.tableRow, { height: rowHeight }, rowStyle && {...rowStyle(index)}]}>
          <View style={[styles.tableCell, columns[0]?.style, { flex: 1 }]}>{renderResult}</View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  // 渲染右侧滚动的行数据
  const renderRestRowItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => onRowPress && onRowPress(item, index)} {...restRow}>
        <View style={[styles.tableRow, { height: rowHeight }, rowStyle && {...rowStyle(index)}]}>
          {renderTableCellItem(item)}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // 渲染右侧单元格数据
  const renderTableCellItem = (item) => {
    return columns.slice(1).map((cell, index) => {
      let cellContent = null;
      if (item === 'thead') {
        cellContent = cell.title;
        if (cell.sorter !== undefined) {
          cellContent = (
            <Sort
              value={ orderParams.field === cell.dataIndex && orderParams.order  || ''}
              sortEmpty={cell.sortEmpty}
              text={cellContent}
              style={[
                cell.style, 
                {justifyContent: cell.sortHeaderAlign || 'flex-start'},
                {minHeight: 'auto', flexDirection: 'row', alignItems: 'center' }
              ]}
              textStyle={{ fontSize: 14, color: '#222' }}
              onChange={(sort) => handleSort(cell.dataIndex, sort)}
            />
          )
        }
      } else {
        if (cell.render && (typeof cell.render === 'function')) {
          cellContent = cell.render(item[cell.dataIndex], item);
        } else {
          cellContent = item[cell.dataIndex];
        }
      }
      let renderResult = isValidElement(cellContent) ? cellContent : <Text>{cellContent}</Text>


      return (
        <View 
          key={index} 
          style={[
            styles.tableCell,
            {width: rightBoxWidth ? rightBoxWidth * 1 : 90},
            cell.style,
            cell.flex && rightBoxWidth && { width: rightBoxWidth * cell.flex }
          ]}>{renderResult}</View>
      )
    });
  }

  // 渲染表格数据
  const renderTableBody = () => {
    if (!data.length) return null;
    return (
      <View style={[styles.tbody, propsStyles.tbodyStyle]}>
        <View style={[styles.tableFirstCol, columns[0]?.flex && { flex: columns[0].flex }]}>
          {/* <FlatList
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={renderFirstColRowItem}
            scrollEnabled={false}
          /> */}
          {
            /* 
              0.62以上在ScrollView内使用FlatList会直接崩溃 
              0.62仅是个警告
            */
          }
          {data.map((item, index) => renderFirstColRowItem({item, index}))}
        </View>
        <View style={[styles.tableRestCols]}>
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={handleTbodyScroll}
            scrollEnabled={horizontalScroll}
            {...restScollView}
          >
            <View>
              {data.map((item, index) => renderRestRowItem({item, index}))}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

  // 渲染空组建或尾部
  const renderTableFooter = () => {
    if (renderFooter) return renderFooter();
    let footerEle = null;
    if (!data.length && loading === false) {
      footerEle = <Empty {...emptyConfig} />
    } else if (pagination) {
      footerEle = (
        <ListFooter
          pageTotal={pagination.pageTotal}
          curPage={pagination.pageIndex}
          loading={loading}
          onPress={onEndReached}
        />
      );
    }
    return footerEle;
  }


  return (
    <ScrollViewCustom
      stickyHeaderIndices={[0]}
      onScroll={ Platform.OS === 'android' ? handleScrollEnd : null}
      onMomentumScrollEnd={ Platform.OS === 'ios' ? handleScrollEnd : null}
      onRefresh={onRefresh}
      {...resProps}
    >
      {/* thead */}
      {
        !!columns.length &&
          <View style={[styles.thead, propsStyles.theaderStyle]}>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.tableFirstCol, columns[0]?.flex && { flex: columns[0].flex }]}>
                <View style={[styles.tableCell, { width: '100%', height: '100%'}, columns[0]?.style]}>
                  {isValidElement(columns[0]?.title) ? columns[0].title : <Text>{columns[0]?.title}</Text>}
                </View>
              </View>
              <ScrollView
                horizontal
                ref={headScrollRef}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={[styles.tableRestCols]}
                onLayout={getRightBoxWidth}
              >
                {renderTableCellItem('thead')}
              </ScrollView>
            </View>
          </View>
      }

      {/* tbody */}
      {renderTableBody()}

      {renderTableFooter()}
    </ScrollViewCustom>
  );
}

ScrollTable.defaultProps = {
  rowEvent: {},
  pagination: {},
  rowHeight: 40,
  styles: {},
  emptyConfig: {
    text: '暂无数据',
  }
};

export default ScrollTable;

const styles = StyleSheet.create({
  thead: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tbody: {
    flexDirection: 'row',
  },
  tableFirstCol: {
    flex: 0.5,
    // backgroundColor: 'green'
  },
  tableRestCols: {
    flex: 1,
    // backgroundColor: 'yellow'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tableCell: {
    padding: 10,
    justifyContent: 'center',
  }
});
