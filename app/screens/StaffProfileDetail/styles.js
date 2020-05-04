import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  containField: {
    margin: 20,
    marginTop: 90,
    flexDirection: 'row',
    height: 100,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 10,
  },
  contentLeftItem: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  tagFollow: {width: 150, margin: 10},
  tabbar: {
    backgroundColor: 'white',
    height: 40,
  },
  tab: {
    width: Utils.getWidthDevice() / 2,
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.grayColor,
    marginBottom: 10,
  },
  tabLabel: {
    flex: 1,
    width: Utils.getWidthDevice() / 2,
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
});
