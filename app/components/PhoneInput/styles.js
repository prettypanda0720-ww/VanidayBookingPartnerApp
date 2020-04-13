import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  itemStyle: {
    marginBottom: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  iconStyle: {
    color: '#000',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  countryStyle: {
    flex: 1,
    backgroundColor: BaseColor.fieldColor,
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 10,
  },
  closeButtonStyle: {
    flex: 0.6,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'white',
  }
});
