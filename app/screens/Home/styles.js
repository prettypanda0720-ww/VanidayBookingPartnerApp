import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#aec6cf',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sideMenuContentItem: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14,
  },
  button: {
    // position: 'absolute',
    // top: 20,
    // padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headerStyle: {
    backgroundColor: '#F5F5F5',
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
  calendarTitle: {
    fontSize: 22,
    color: 'white',
  },
  staffsTitle: {
    fontSize: 22,
    color: 'white',
    marginTop: 30,
  },
  calendarWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
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
  appointmentWrapper: {
    position: 'absolute',
    bottom: 69,
    right: 20,
    zIndex: 100,
  },
  blocktimeWrapper: {
    position: 'absolute',
    bottom: 99,
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
    borderTopColor: BaseColor.blackColor,
    borderTopWidth: 1,
  },
  serviceItemWrapper: {
    borderColor: 'green',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: 'white',
    borderLeftWidth: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  }
  
});
