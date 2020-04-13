import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from '@utils';

export default StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center",
    marginTop: 20,
  },
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%"
  },
  logo: {
    marginTop: 20,
    width: '90%',
    height: Utils.scaleWithPixel(30),
  },
});
