import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';


interface Iprops {
  pageTotal: number; // 数据总页数
  curPage: number; // 当前页
  loading?: boolean;
  onPress?: Function;
}

function ListFooter (props: Iprops) {
  const { pageTotal, curPage, loading, onPress } = props;

  const handleReached = () => {
    if (loading) return;
    onPress && onPress();
  };

  let content = (
    <TouchableWithoutFeedback onPress={handleReached}>
      <View style={styles.loadWrap}>
        <Text style={[ styles.tipText, { color: 'rgba(49, 49, 49, 0.6)' } ]}>加载更多</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  if (loading) {
    content = (
      <TouchableWithoutFeedback onPress={handleReached}>
        <View style={[ styles.loadWrap ]}>
          <ActivityIndicator style={{ marginRight: 5 }} size="small" color={'rgba(49, 49, 49, 0.6)'} />
          <Text style={[ styles.tipText, { color: 'rgba(49, 49, 49, 0.6)' } ]}>加载中...</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (curPage >= pageTotal) {
    content = (
      <View style={styles.loadWrap}>
        <Text style={[ styles.tipText, { color: 'rgba(49, 49, 49, 0.6)' } ]}>没有更多</Text>
      </View>
    );
  }

  return (pageTotal > 1) ? <View>{content}</View> : null;
}

export default ListFooter;

const styles = StyleSheet.create({
  tipText: {
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center'
  },
  loadWrap: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
