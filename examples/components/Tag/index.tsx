import React from 'react';
import { Platform, Text, View, StyleProp, ViewStyle, StyleSheet } from 'react-native';


// 股票tag

interface Itag{
    sty: number;
    styT: number;
    style?: StyleProp<ViewStyle>;
}

function Tag({ sty, styT, style }: Itag){
    return (
        <View style={[
            { 
                height: 9,
                backgroundColor: '#CF111F',
                paddingHorizontal: 2,
                ...Platform.select({ ios: { paddingBottom: 0.5, paddingRight: 1 } }),
                marginRight: 5,
                borderRadius: 2, 
                flexShrink: 0, 
                minWidth: 14,
                justifyContent: 'center', 
                alignItems: 'center'
            },
            sty === 2 && { backgroundColor: 'purple' },
            sty === 3 && { backgroundColor: 'blue' },
            style
        ]}>
            <Text style={{ fontSize: 7,lineHeight: 9, color: '#fff' }}>HK</Text>
        </View>
    )
}

export default Tag;
