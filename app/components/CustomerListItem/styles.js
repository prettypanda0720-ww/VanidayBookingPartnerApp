import {BaseColor} from '@config';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contentCenter: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
