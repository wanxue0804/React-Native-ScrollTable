import React, { Component } from 'react'
import {
  Animated,
  Image,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import LottieView from 'lottie-react-native';
import RefreshView from './customRefreshView';

const RefreshStatus = {
  pullToRefresh: 0,
  releaseToRefresh: 1,
  refreshing: 2
}

interface Iprops extends Omit<ScrollViewProps, 'onScrollBeginDrag' | 'onMomentumScrollEnd'> {
    refreshableTitlePull?: string,
    refreshing: boolean,
    refreshViewHeight?: number,
    refreshableTitleRelease?: string,
    onScrollBeginDrag?: (e) => void,
    refreshableTitleRefreshing?: string,
    onRefresh?: (e) => void,
    customRefreshView?: (a, b) => React.ReactNode,
    refreshViewStyle?: ViewStyle
}

interface Istate{
    refreshStatus: number,
    refreshTitle: string,
    arrowAngle: Animated.AnimatedValue,
}


export default class RefreshableScrollView extends Component<Iprops, Istate>{
  
  static defaultProps: any;

  _offsetY: number;
  _isRefreshing: boolean;
  _dragFlag: boolean;
  _scrollview: any;
  animation: any;

  
  constructor(props) {
    super(props)
    this.state = {
      arrowAngle: new Animated.Value(0),
      refreshStatus: RefreshStatus.pullToRefresh,
      refreshTitle: this.props.refreshableTitlePull,
    }
    this._offsetY = 0;
    this._isRefreshing = false;
    this._dragFlag = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshing !== this.props.refreshing) {
      if (nextProps.refreshing) {
        if (this._isRefreshing) {
          return null;
        }
        const height = nextProps.refreshViewHeight;
        this._isRefreshing = true;
        this._scrollview && this._scrollview.scrollTo({ x: 0, y: -height, animated: true });
        this.setState({
          refreshStatus: RefreshStatus.refreshing,
          refreshTitle: nextProps.refreshableTitleRefreshing,
        });
      } else {
        if (!this._isRefreshing) {
          return;
        };
        this._isRefreshing = false;
        this._scrollview && this._scrollview.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({
          refreshStatus: RefreshStatus.pullToRefresh,
          refreshTitle: nextProps.refreshableTitlePull,
        });
      }
    }
  }

  onScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset
    this._offsetY = y
    if (this._dragFlag) {
      if (!this._isRefreshing) {
        const height = this.props.refreshViewHeight
        if (y <= -height) {
          this.setState({
            refreshStatus: RefreshStatus.releaseToRefresh,
            refreshTitle: this.props.refreshableTitleRelease
          })
        } else {
          this.setState({
            refreshStatus: RefreshStatus.pullToRefresh,
            refreshTitle: this.props.refreshableTitlePull
          })
        }
      }
    }
    if (typeof this.props.onScroll === 'function') {
      this.props.onScroll(event)
    }
  }

  onScrollBeginDrag = (event) => {
    this._dragFlag = true
    this._offsetY = event.nativeEvent.contentOffset.y
    if (this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag(event)
    }
  }

  onScrollEndDrag = (event) => {
    this._dragFlag = false
    const { y } = event.nativeEvent.contentOffset
    this._offsetY = y
    const height = this.props.refreshViewHeight
    if (!this._isRefreshing) {
      if (this.state.refreshStatus === RefreshStatus.releaseToRefresh) {
        this._isRefreshing = true
        this.setState({
          refreshStatus: RefreshStatus.refreshing,
          refreshTitle: this.props.refreshableTitleRefreshing
        })
        this._scrollview.scrollTo({ x: 0, y: -height, animated: true });
        this.props.onRefresh && this.props.onRefresh(() => {
          this.onRefreshEnd();
        })
      }
    } else if (y <= 0) {
      this._scrollview.scrollTo({ x: 0, y: -height, animated: true })
    }
    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(event)
    }
  }

  scrollTo = (option) => {
    this._scrollview.scrollTo(option)
  }

  scrollToEnd = (option) => {
    this._scrollview.scrollToEnd(option)
  }

  onRefreshEnd = () => {
    if (this.state.refreshStatus === RefreshStatus.refreshing) {
      this._isRefreshing = false
      this.setState({
        refreshStatus: RefreshStatus.pullToRefresh,
        refreshTitle: this.props.refreshableTitlePull,
      })
      this._scrollview.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  renderRefreshHeader() {
    if (this.props.customRefreshView) {
      return (
        <View style={[styles.header, this.props.refreshViewStyle]}>
          {this.props.customRefreshView(this.state.refreshStatus, this._offsetY)}
        </View>
      )
    }
    return (
      <View style={[styles.header, this.props.refreshViewStyle]}>
        <RefreshView
          refreshStatus={this.state.refreshStatus}
          offset={this._offsetY}
        />
      </View>
    );
  }


  render() {
    const { stickyHeaderIndices, ...rest } = this.props;
    let other: any = {};
    if(Array.isArray(stickyHeaderIndices) && stickyHeaderIndices.length > 0){
        other.stickyHeaderIndices = stickyHeaderIndices.map(item => item+ 1);
    }
    return (
      <ScrollView
        ref={c => this._scrollview = c}
        {...rest}
        {...other}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
        onScrollEndDrag={this.onScrollEndDrag}
        onScrollBeginDrag={this.onScrollBeginDrag}
        scrollToOverflowEnabled={true}
      >
        {this.renderRefreshHeader()}
        {this.props.children}
      </ScrollView>
    )
  }
}

RefreshableScrollView.defaultProps = {
  horizontal: false,
  scrollEnabled: true,
  header: null,
  refreshable: true,
  refreshableTitlePull: '下拉刷新',
  refreshableTitleRefreshing: '刷新中...',
  refreshableTitleRelease: '释放立即刷新',
  customRefreshView: null,
  arrowImageStyle: undefined,
  refreshViewStyle: undefined,
  refreshViewHeight: 85,
  insideOfUltimateListView: false
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: -85,
    left: 0,
    right: 0,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresh: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  img: {
    width: 35,
    height: 35
  },
  text: {
    fontSize: 12, 
    marginVertical: 5,
  }
})

