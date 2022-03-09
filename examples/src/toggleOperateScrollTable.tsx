import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, FlexAlignType, StyleSheet, Alert } from 'react-native';
import ScrollTable from 'react-native-scrollview-table';
import DataSource from './mockdata';


function ToggleOperateScrollTable () {
  const data = DataSource.lst.slice(0, 10);
  const [loading, setLoading] = useState(undefined);
  const [clickEvent, setClickEvent] = useState({
    rowIndex: -1,
    showBtn: false,
    item: {}
  })

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
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text>{text}</Text>
        )
      }
    },
    {
      title: <Text >涨跌幅</Text>,
      dataIndex: 'chg',
      flex: 0.333333,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={[
              text > 0 && { color: 'red' },
              text < 0 && { color: 'green' },
            ]}
          >{text}%</Text>
        )
      }
    },
    {
      title: <Text>涨跌额</Text>,
      dataIndex: 'chgVal',
      flex: 0.333333,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={[
              text > 0 && { color: 'red' },
              text < 0 && { color: 'green' },
            ]}
          >{item.chgVal}</Text>
        )
      }
    },
  ];


  // 点击行
  const handleItemPress = (item, index) => {
    if (index === clickEvent.rowIndex) {
      setClickEvent({
        ...clickEvent,
        item,
        showBtn: !clickEvent.showBtn
      });
    } else {
      setClickEvent({
        ...clickEvent,
        rowIndex: index,
        showBtn: true,
        item
      });
    }
  }

  const handleBtn = () => {
    Alert.alert(`点击了按钮第${clickEvent.rowIndex + 1}行， 数据为${JSON.stringify(clickEvent.item)}`);
  }
  
  
  return (
    <View style={styles.container}>
      <ScrollTable
        rowHeight={55}
        loading={loading}
        columns={columns}
        scrollEnabled={false}
        refreshControl={null}
        data={data}
        emptyConfig={{
          text: '暂无持仓',
          image: require('../static/emprt_6.png'),
          imageStyle: { width: 107, height: 130 },
          style: { paddingTop: 30 }
        }}
        styles={{
          theaderStyle: { height: 40 },
        }}
        rowStyle={(index) => {
          return (index === clickEvent.rowIndex && clickEvent.showBtn) ? ({
            height: 107,
            paddingBottom: 52
          }) : null
        }}
        onRowPress={handleItemPress}
      />

      {/* 操作按钮 */}
      {
        clickEvent.showBtn &&
          <View style={[ styles.operateContainer, { top: ((clickEvent.rowIndex + 1) * 55 + 40) } ]}>
            <TouchableWithoutFeedback onPress={handleBtn}>
              <View style={styles.listBtn}>
                <Text style={styles.btnText}>买入</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleBtn}>
              <View style={styles.listBtn}>
                <Text style={styles.btnText}>卖出</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleBtn}>
              <View style={[styles.listBtn, { borderRightWidth: 0 }]}>
                <Text style={styles.btnText}>行情</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
      }
    </View>
  );
}

export default ToggleOperateScrollTable;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff'
  },
  operateContainer: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: '100%',
    height: 50,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#313131'
  },
  listBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'green'
  },
  btnText: {
    color: 'red'
  }
});