import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

const SIZE = 40;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 600,
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
  floatingBtn: {
    position: 'absolute',
    bottom : 20,
    right: 20,
    // flex: 1,
    // margin: 20,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    // backgroundColor: '#F035E0',
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  image: {
    width: 40,
    height: 40,
  },
});
