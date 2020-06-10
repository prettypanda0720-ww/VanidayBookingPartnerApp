import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  sideMenuContentItem: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  sideMenuStyle: {
    height: '100%',
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  staffsTitle: {
    fontSize: 22,
    color: 'white',
    marginTop: 30,
  },
  staffWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  staffName: {
    color: '#fff',
    fontSize: 15,
  },
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  saleWrapper: {
    position: 'absolute',
    bottom: 69,
    right: 20,
    width: '55%',
    zIndex: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 99,
  },
  image: {
    width: 40,
    height: 40,
  },
  actionBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  emptyDate: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BaseColor.grayColor,
    backgroundColor: BaseColor.fieldColor,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  knobStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 125,
    height: 17,
    paddingHorizontal: 5,
    backgroundColor: BaseColor.titleColor,
    borderRadius: 5,
  }
});
