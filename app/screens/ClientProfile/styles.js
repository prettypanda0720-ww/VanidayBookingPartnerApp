import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

const SIZE = 40;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 600,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  profileItem: {
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabbar: {
    backgroundColor: 'white',
    height: 40,
  },
  tab: {
    width: Utils.getWidthDevice(),
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1,
  },
  
  sectionStyle: {
    color: 'rgba(0,0,0,0.65)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
