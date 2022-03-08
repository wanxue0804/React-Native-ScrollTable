import React, { useEffect, useState, useCallback, isValidElement} from 'react';
import { Text, View, ViewStyle, TextStyle, StyleSheet, StyleProp, TouchableWithoutFeedback } from 'react-native';


interface IProps {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    text: string | React.ReactNode;
    onChange?: (status) => void;  // 切换顺序
    value ?: string;  // 当前值 '', 'desc', 'asc'
    sortEmpty ?: boolean;  // 是否可以切换为空值
}


const Sort: React.FC<IProps> = ({ sortEmpty, textStyle, value, style, text, onChange }) => {
    const [status, setStatus] = useState('');
    const SortArr = sortEmpty ? ['', 'desc', 'asc'] :  ['desc', 'asc'];  // 0 默认 1 倒序 2 正序

    // 初始化默认值
    useEffect(() => {
        setStatus(value);
    }, [value]);

    
    const handleChange =  () => {
        const index = SortArr.findIndex((item) => item === status);
        const val = SortArr[(index + 1) % SortArr.length];
        setStatus(val);
        onChange && onChange(val);
    };

    
    return (
        <TouchableWithoutFeedback onPress={handleChange}>
            <View style={[styles.option, style]}>
                { isValidElement(text) ? text : <Text style={[styles.text, textStyle]}>{text}</Text> }
                <View style={{ marginLeft: 5 }}>
                    <View style={[styles.arrow, status === 'asc' && styles.arrowAct]} />
                    <View style={[styles.arrow, styles.arrwoDown, status === 'desc' && styles.arrwoDownAct]} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


export default Sort;



const styles = StyleSheet.create({
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minHeight: 30,
    },
    text: {
        fontSize: 12,
        color: '#778691',
        marginRight: 5  
    },
    arrow: {
        width: 6,
        height: 5,
        borderWidth: 3,
        borderTopColor: 'transparent',
        borderBottomColor: '#BFC6CA',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrwoDown: {
        borderTopColor: '#BFC6CA',
        borderBottomColor: 'transparent',
        marginTop: 1,
    },
    arrowAct: {
        borderBottomColor: '#778691'
    },
    arrwoDownAct: {
        borderTopColor: '#778691',
    }
});
