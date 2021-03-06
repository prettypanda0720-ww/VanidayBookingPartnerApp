import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    // shadowOffset: {height: 5},
    // shadowColor: BaseColor.blackColor,
    // shadowOpacity: 1.0,
    // elevation: 1,
    marginBottom: 20,
  },
  nameContent: {
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomColor: BaseColor.whiteColor,
    backgroundColor: BaseColor.SecondColor,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validContent: {
    flexDirection: 'row',
    // paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: BaseColor.fieldColor,
    // justifyContent: 'space-between',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  mainContent: {
    backgroundColor: BaseColor.fieldColor,
    // paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'column',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  totalContent: {
    backgroundColor: BaseColor.MainColor /*BaseColor.lightPrimaryColor*/,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'column',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  serviceItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});
