import React, { ReactNode } from 'react';
import {
  ViewStyle,
  Insets,
  PointPropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollViewProps
} from 'react-native';



export type AlignItems = 'flex-start' | 'flex-end' | 'center';

export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

export type OrderType = "" | "asc" | "desc";

export interface Icolumns {
  dataIndex: string;
  title?: string | ReactNode;
  flex?: number; // 第一列为相对盒子的flex数值 其他列为右侧宽度的百分比
  style?: ViewStyle; // 单元格样式
  sorter?: OrderType; // 排序
  sortEmpty?: boolean; // 是否允许默认排序
  sortHeaderAlign?: AlignItems;  // 只能控制sort样式 可通过style修改样式
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

export interface StyleType {
  theaderStyle?: ViewStyle;
  tbodyStyle?: ViewStyle;
}

export default interface Iprops extends ScrollViewProps {
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
  refreshing?: boolean; // 下拉刷新的refreshing状态
  disabledHorizontalScroll?: boolean; // 是否允许左右滚动
  styles?: StyleType;
}
