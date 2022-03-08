import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Easing, View, ViewStyle, Text, StyleProp, StyleSheet, Dimensions, RefreshControl, RefreshControlProps, Image, Platform } from 'react-native';
// @ts-ignore
import { SmartRefreshControl, AnyHeader} from 'react-native-smartrefreshlayout';
import RefreshView from './customRefreshView';

const { width: viewportWidth } = Dimensions.get('window');


interface IProps extends RefreshControlProps {
    style?: StyleProp<ViewStyle>;
    title?: string,
    refreshing: boolean,
    onRefresh?: () => void,
    refreshView ?: React.ReactNode
    refreshImg?: NodeRequire;
}


const Refreshfn: React.FC<IProps> = ( { style, title, refreshing, onRefresh, refreshView, refreshImg, ...rest }) => {
    const _refreshc = useRef(null);
    const [status, setStatus] = useState(0);
    
    useEffect(() => {
        if(refreshing === false){
            _refreshc.current?.finishRefresh();
        }
    }, [refreshing]);
    

    return (
        <SmartRefreshControl 
            style={[{ flex:1, zIndex: -1 }, style ]}
            onRefresh={onRefresh}
            onPullDownToRefresh={() => { setStatus(0) }}
            onReleaseToRefresh={() => { setStatus(1) }}
            onHeaderReleased={() => { setStatus(2) }}
            headerHeight={65}
            renderHeader={
                <AnyHeader style={{
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                   {refreshView || <RefreshView
                        refreshStatus={status}
                        offset={0}
                        refreshImg={refreshImg}
                    />}
                </AnyHeader>
            }
            {...rest} 
            ref={_refreshc}
        />
    );
} 

export default Refreshfn;




const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        zIndex: -1,
        width: viewportWidth
    },
    refresh: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 30,
        height: 25
    },
    text: {
        fontSize: 12, 
        marginVertical: 10,
    }

});
