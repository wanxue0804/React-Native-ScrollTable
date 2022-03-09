import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

function Index ({navigation}) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('NormalScrollTable')}>
        <View style={styles.btnContainer}>
          <Text>Normal ScrollTable</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('CustomRefreshScrollTable')}>
        <View style={styles.btnContainer}>
          <Text>Custom Refresh ScrollTable</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ToggleOperateScrollTable')}>
        <View style={styles.btnContainer}>
          <Text>Toggle Operate Btn ScrollTable</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#313131',
    justifyContent: 'center',
    alignItems: 'center'
  }
})