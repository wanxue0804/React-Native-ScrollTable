import React from 'react';
import { View, Image, StyleSheet, Text, ViewStyle, ImageStyle, TextStyle, TouchableWithoutFeedback } from 'react-native';

export interface IProps {
    style?: ViewStyle,
    extra?: React.ReactNode;  // 额外内容
    image?: NodeRequire;  // 空图片
    imageStyle?: ImageStyle,  // 图片样式
    text ?: string;  // 文案
    textStyle?: TextStyle,
}


const Empty: React.FC<IProps> = (props) => {
    const {
        extra,
        image = require('../../static/empty.png'),
        text = 'empty',
        style,
        imageStyle,
        textStyle,
        ...restProps
    } = props;


    return (
        <View style={[styleSheet.empty, style]}>
            <Image style={[styleSheet.emptyImg, imageStyle]} source={image} />
            <TouchableWithoutFeedback {...restProps}><Text style={[styleSheet.emptyDesc, textStyle]}>{text}</Text></TouchableWithoutFeedback>
            {extra}
        </View>
    );
};

export default Empty;


const styleSheet = StyleSheet.create({
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingVertical: 40,
    },
    emptyImg: {
        width: 70,
        height: 70,
        marginBottom: 15
    },
    emptyDesc: {
        fontSize: 13,
        color: '#778691',
        textAlign: 'center'
    }
});
