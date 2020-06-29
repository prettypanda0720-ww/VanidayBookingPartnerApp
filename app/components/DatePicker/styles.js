import {StyleSheet} from 'react-native';
import {BaseStyle, BaseColor, FontFamily, Strings} from '@config';

let style = StyleSheet.create({
  dateTouch: {
    width: '100%',
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
  },
  dateText: {
    color: '#333',
  },
  placeholderText: {
    color: BaseColor.grayColor,
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077',
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98',
  },
  btnTextCancel: {
    color: '#666',
  },
  btnCancel: {
    left: 0,
  },
  btnConfirm: {
    right: 0,
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  disabled: {
    backgroundColor: '#eee',
  },
  dateInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    color: BaseColor.titleColor,
    fontFamily: FontFamily.default,
  },
});

export default style;
