/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlexAlignType,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Tag from './components/Tag';
import ScrollTable, { HeaderAlign, Iorder } from './scrollTable';



const response = {
  "pg": {
    "idx": 1,
    "ps": 20,
    "dc": 524,
    "pt": 27
  },
  "lst": [
    {
      "marketCode": 1,
      "symbol": "09923",
      "name": "移卡",
      "price": 19.48,
      "loanPercent": 95,
      "chg": -5.21,
      "chgVal": -1.07,
      "volume": 1524560,
      "turnover": 29441654400,
      "uid": "1:11:09923",
      "sty_t": 1,
      "hsl": 0.34,
      "sylj": 11.31,
      "sjl": 2.79
    },
    {
      "marketCode": 1,
      "symbol": "09996",
      "name": "沛嘉医疗-B",
      "price": 10.94,
      "loanPercent": 90,
      "chg": -5.53,
      "chgVal": -0.64,
      "volume": 394438,
      "turnover": 4323855980,
      "uid": "1:11:09996",
      "sty_t": 1,
      "hsl": 0.06,
      "sylj": -2.08,
      "sjl": 2.46
    },
    {
      "marketCode": 1,
      "symbol": "09991",
      "name": "宝尊电商-SW",
      "price": 23,
      "loanPercent": 90,
      "chg": -12.71,
      "chgVal": -3.35,
      "volume": 61400,
      "turnover": 1454655000,
      "uid": "1:11:09991",
      "sty_t": 1,
      "hsl": 0.02,
      "sylj": 8.53,
      "sjl": 0.93
    },
    {
      "marketCode": 1,
      "symbol": "09990",
      "name": "祖龙娱乐",
      "price": 7.29,
      "loanPercent": 90,
      "chg": -4.2,
      "chgVal": -0.32,
      "volume": 367000,
      "turnover": 2655160000,
      "uid": "1:11:09990",
      "sty_t": 1,
      "hsl": 0.05,
      "sylj": -4.32,
      "sjl": 1.68
    },
    {
      "marketCode": 1,
      "symbol": "09983",
      "name": "建业新生活",
      "price": 4.56,
      "loanPercent": 90,
      "chg": -4.6,
      "chgVal": -0.22,
      "volume": 843000,
      "turnover": 3860460000,
      "uid": "1:11:09983",
      "sty_t": 1,
      "hsl": 0.07,
      "sylj": 10.1,
      "sjl": 2.11
    },
    {
      "marketCode": 1,
      "symbol": "09909",
      "name": "宝龙商业",
      "price": 11.4,
      "loanPercent": 90,
      "chg": -6.71,
      "chgVal": -0.82,
      "volume": 3073500,
      "turnover": 35481380000,
      "uid": "1:11:09909",
      "sty_t": 1,
      "hsl": 0.48,
      "sylj": 19.54,
      "sjl": 3.41
    },
    {
      "marketCode": 1,
      "symbol": "09668",
      "name": "渤海银行",
      "price": 1.04,
      "loanPercent": 90,
      "chg": 2.97,
      "chgVal": 0.03,
      "volume": 50002568,
      "turnover": 51932033760,
      "uid": "1:11:09668",
      "sty_t": 1,
      "hsl": 0.81,
      "sylj": 1.86,
      "sjl": 0.17
    },
    {
      "marketCode": 1,
      "symbol": "06998",
      "name": "嘉和生物-B",
      "price": 4.73,
      "loanPercent": 90,
      "chg": -9.04,
      "chgVal": -0.47,
      "volume": 1804500,
      "turnover": 8779978500,
      "uid": "1:11:06998",
      "sty_t": 1,
      "hsl": 0.36,
      "sylj": -0.32,
      "sjl": 0.72
    },
    {
      "marketCode": 1,
      "symbol": "06996",
      "name": "德琪医药-B",
      "price": 5.77,
      "loanPercent": 90,
      "chg": -3.03,
      "chgVal": -0.18,
      "volume": 1038500,
      "turnover": 5949595000,
      "uid": "1:11:06996",
      "sty_t": 1,
      "hsl": 0.16,
      "sylj": -0.42,
      "sjl": 1.27
    },
    {
      "marketCode": 1,
      "symbol": "06186",
      "name": "中国飞鹤",
      "price": 8.17,
      "loanPercent": 90,
      "chg": -3.08,
      "chgVal": -0.26,
      "volume": 43543584,
      "turnover": 360596316870,
      "uid": "1:11:06186",
      "sty_t": 1,
      "hsl": 0.49,
      "sylj": 9.84,
      "sjl": 4.11
    },
    {
      "marketCode": 1,
      "symbol": "03913",
      "name": "合景悠活",
      "price": 2.95,
      "loanPercent": 90,
      "chg": -3.28,
      "chgVal": -0.1,
      "volume": 3774576,
      "turnover": 11246894780,
      "uid": "1:11:03913",
      "sty_t": 1,
      "hsl": 0.19,
      "sylj": 13.07,
      "sjl": 2.01
    },
    {
      "marketCode": 1,
      "symbol": "03692",
      "name": "翰森制药",
      "price": 15.62,
      "loanPercent": 90,
      "chg": -1.64,
      "chgVal": -0.26,
      "volume": 2175982,
      "turnover": 33996515400,
      "uid": "1:11:03692",
      "sty_t": 1,
      "hsl": 0.04,
      "sylj": 29.88,
      "sjl": 5.17
    },
    {
      "marketCode": 1,
      "symbol": "03662",
      "name": "奥园健康",
      "price": 2.04,
      "loanPercent": 90,
      "chg": -3.77,
      "chgVal": -0.08,
      "volume": 1643000,
      "turnover": 3347630000,
      "uid": "1:11:03662",
      "sty_t": 1,
      "hsl": 0.23,
      "sylj": 4.98,
      "sjl": 1.43
    },
    {
      "marketCode": 1,
      "symbol": "02798",
      "name": "久泰邦达能源",
      "price": 1.7,
      "loanPercent": 90,
      "chg": -1.73,
      "chgVal": -0.03,
      "volume": 300000,
      "turnover": 514350000,
      "uid": "1:11:02798",
      "sty_t": 1,
      "hsl": 0.02,
      "sylj": 6.63,
      "sjl": 1.79
    },
    {
      "marketCode": 1,
      "symbol": "02772",
      "name": "中梁控股",
      "price": 2.56,
      "loanPercent": 90,
      "chg": 1.99,
      "chgVal": 0.05,
      "volume": 3754000,
      "turnover": 9460380500,
      "uid": "1:11:02772",
      "sty_t": 1,
      "hsl": 0.1,
      "sylj": 2.05,
      "sjl": 0.84
    },
    {
      "marketCode": 1,
      "symbol": "02599",
      "name": "祥生控股集团",
      "price": 0.82,
      "loanPercent": 90,
      "chg": -5.75,
      "chgVal": -0.05,
      "volume": 5857000,
      "turnover": 4878020000,
      "uid": "1:11:02599",
      "sty_t": 1,
      "hsl": 0.19,
      "sylj": 0.65,
      "sjl": 0.3
    },
    {
      "marketCode": 1,
      "symbol": "02500",
      "name": "启明医疗-B",
      "price": 19.34,
      "loanPercent": 90,
      "chg": -5.89,
      "chgVal": -1.21,
      "volume": 1386018,
      "turnover": 26965274540,
      "uid": "1:11:02500",
      "sty_t": 1,
      "hsl": 0.31,
      "sylj": -36.18,
      "sjl": 2.14
    },
    {
      "marketCode": 1,
      "symbol": "01995",
      "name": "永升生活服务",
      "price": 13.66,
      "loanPercent": 90,
      "chg": -0.15,
      "chgVal": -0.02,
      "volume": 5641324,
      "turnover": 77515761972,
      "uid": "1:11:01995",
      "sty_t": 1,
      "hsl": 0.32,
      "sylj": 47.4,
      "sjl": 7.89
    },
    {
      "marketCode": 1,
      "symbol": "01992",
      "name": "复星旅游文化",
      "price": 11.86,
      "loanPercent": 90,
      "chg": -3.73,
      "chgVal": -0.46,
      "volume": 570800,
      "turnover": 6799068000,
      "uid": "1:11:01992",
      "sty_t": 1,
      "hsl": 0.05,
      "sylj": -4.8,
      "sjl": 2.86
    },
    {
      "marketCode": 1,
      "symbol": "01952",
      "name": "云顶新耀-B",
      "price": 20.45,
      "loanPercent": 90,
      "chg": -11.28,
      "chgVal": -2.6,
      "volume": 719254,
      "turnover": 14812460300,
      "uid": "1:11:01952",
      "sty_t": 1,
      "hsl": 0.24,
      "sylj": -0.26,
      "sjl": 0.88
    }
  ],
  "data": null
};




const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // 获取颜色
  const getColor = (number: string | number, black?: string) => {
    let color = '#313131';
    if (typeof +number !== 'number') return color;
    if (black === 'black') {
      return +number === 0 ? '#C9C9C9' : color;
    }
    if (+number > 0) {
      color = 'red';
    } else if (+number < 0) {
      color = 'green';
    }
    return color;
  };

  const columns = [
    {
      title: <Text style={[styles.tableHeaderText]}>名称代码</Text>,
      dataIndex: 'name',
      flex: 0.47,
      style: {
        paddingLeft: 0
      },
      render: (text, item) => {
        return (
          <View>
            <Text numberOfLines={1}>{text}</Text>
            <View style={{ marginTop: 2, flexDirection: 'row', alignItems: 'center' }}>
              <Tag sty={item.marketCode} styT={item.sty_t} />
              <Text style={{ fontSize: 12 }}>{item.symbol}</Text>
            </View>
          </View>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>保证金率</Text>,
      dataIndex: 'loanPercent',
      flex: 0.333333,
      sorter: 'asc' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
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
      title: <Text style={[styles.tableHeaderText]}>最新价</Text>,
      dataIndex: 'price',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(item.chgVal)
            }}
          >{text}</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>涨跌幅</Text>,
      dataIndex: 'chg',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
        paddingRight: 0
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text)
            }}
          >{text}%</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>涨跌额</Text>,
      dataIndex: 'chgVal',
      flex: 0.333333,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text)
            }}
          >{item.chgVal}</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>成交量</Text>,
      dataIndex: 'volume',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}股</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>成交额</Text>,
      dataIndex: 'turnover',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{+text/1000}</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>换手率</Text>,
      dataIndex: 'hsl',
      flex: 0.3,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}%</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>市盈率(静)</Text>,
      dataIndex: 'sylj',
      flex: 0.4,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{Number(text) < 0 ? '亏损' : text}</Text>
        )
      }
    },
    {
      title: <Text style={[styles.tableHeaderText]}>市净率</Text>,
      dataIndex: 'sjl',
      flex: 0.33,
      sorter: '' as Iorder,
      sortHeaderAlign: 'flex-end' as HeaderAlign,
      style: {
        alignItems: 'flex-end' as FlexAlignType,
        paddingRight: 0
      },
      render: (text, item) => {
        return (
          <Text
            style={{
              color: getColor(text, 'black')
            }}
          >{text}</Text>
        )
      }
    },
  ];

  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'white',
    
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <ScrollTable
        data={response.lst}// response.lst
        columns={columns}
        loading={false}
        restScollView={{
          bounces: false
        }}
      />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  tableHeaderText: {
    fontSize: 11,
  },
});

export default App;
