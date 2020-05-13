import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  //block css
  serviceItemWrapper: {
    borderColor: 'green',
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderLeftWidth: 2,
    flexDirection: 'column',
    borderColor: BaseColor.dividerColor,
    borderBottomWidth: 1,
  },
  serviceIdStyle: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.65)',
    fontWeight: 'bold',
  },
  serviceItemNameStyle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  serviceItemDateStyle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    fontWeight: 'normal',
  },
  total: {
    flexDirection: 'column',
    borderTopColor: BaseColor.grayColor,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});
