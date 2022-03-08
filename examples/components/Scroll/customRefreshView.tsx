import React, { Component, useMemo } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LottieView from 'lottie-react-native';

const RefreshTitleArr = [
    '下拉刷新',
    '释放立即刷新',
    '刷新中...'
];


function RefreshView({ refreshStatus, refreshImg, offset }){    

  const refreshEl = useMemo(() => {
    return (
      <View style={styles.status}>
        {
          refreshStatus > 0
          ?
          <LottieView
            style={styles.img}
            source={refreshImg || require('../../static/refresh.json')} 
            autoPlay 
            loop={true}
          />
          :
          <Image style={{ width: 50, height: 50 }} source={require('../../static/refresh.png')} />
        }
        <Text style={styles.text}>{RefreshTitleArr[refreshStatus]}</Text>
      </View>
    );
  }, [ refreshStatus ]);
  return refreshEl;
}


export default RefreshView;


const styles = StyleSheet.create({
    status: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 85
    },
    img: {
      width: 50,
      height: 50
    },
    text: {
      fontSize: 12, 
      color: 'rgba(65, 64, 64, 0.4)', 
      marginBottom: 14
    }
  })
  