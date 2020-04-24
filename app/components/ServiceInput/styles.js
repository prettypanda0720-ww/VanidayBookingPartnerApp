import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnClearSearch: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%"
  },
  btnSearch: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%",
    zIndex: 1000,
  },
  textInput: {
    paddingRight: 40,
    color: BaseColor.blackColor,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  }
});
