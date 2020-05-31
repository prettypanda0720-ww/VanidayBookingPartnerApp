import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.agenda.list';

export default function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return  StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    // dayNum: {
    //   fontSize: 28,
    //   fontWeight: '200',
    //   fontFamily: appStyle.textDayFontFamily,
    //   color: appStyle.agendaDayNumColor
    // },
    dayText: {
      fontSize: 14,
      fontWeight: appStyle.textDayFontWeight,
      fontFamily: appStyle.textDayFontFamily,
      color: appStyle.agendaDayTextColor,
      backgroundColor: 'rgba(0,0,0,0)',
      marginTop: -5
    },
    // day: {
    //   width: 63,
    //   alignItems: 'center',
    //   justifyContent: 'flex-start',
    //   marginTop: 32
    // },
    today: {
      color: appStyle.agendaTodayColor
    },
    day: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BaseColor.MainPrimaryColor,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: BaseColor.grayColor,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
    },
    dayNum: {
      fontSize: 28,
      fontWeight: '200',
      fontFamily: 'System',
      color: BaseColor.whiteColor,
    },
    dayText: {
      fontSize: 14,
      fontWeight: '300',
      fontFamily: 'System',
      color: BaseColor.whiteColor,
      backgroundColor: 'rgba(0,0,0,0)',
      marginTop: -5
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
