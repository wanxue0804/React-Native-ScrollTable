import React, { ReactNode } from 'react';
import { ViewStyle, ScrollViewProps } from 'react-native';
import { IProps as EmptyPropsType } from './components/Table/empty';


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
export default interface Iprops extends ScrollViewProps {
  data: any[]; // 数据源
  columns: Icolumns[];
  rowHeight?: number; // 行高 统一值 默认40
  loading?: boolean | undefined; // 请求的loading
  refreshing?: boolean; // 下拉刷新的refreshing状态
  horizontalScroll?: boolean; // 是否允许左右滚动
  pagination?: Ipagination; // 分页配置
  styles?: Istyle;
  emptyConfig?: EmptyPropsType;
  restScollView?: ScrollViewProps; // 水平的滚动的配置
  rowStyle?: (index?: number) => ViewStyle;
  onChange?: (pagination: Ipagination, order: Isort) => void; // 排序、上拉加载
  onRefresh?: () => void; // 下拉刷新
  onRowPress?: (item: any, index: number) => void; // 行点击事件
  renderFooter?: () => ReactNode;
}
