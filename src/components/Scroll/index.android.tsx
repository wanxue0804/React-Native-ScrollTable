import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollViewProps, ViewStyle, StyleProp, ScrollView } from 'react-native';
import RefreshControl from './refresh';





interface IProps extends Omit<ScrollViewProps, 'onScrollBeginDrag' | 'onMomentumScrollEnd'> {
    style?: StyleProp<ViewStyle>;
    refreshing: boolean,
    onRefresh?: () => void,
}

export default class Refreshfn extends React.Component<IProps>{
    
    _scrollview: any;


    render(){
        const { style, refreshing, onRefresh, ...rest } = this.props;
        return (
            <ScrollView
                ref={c => this._scrollview = c}
                style={style}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                {...rest}
            />
        )
    }
}

