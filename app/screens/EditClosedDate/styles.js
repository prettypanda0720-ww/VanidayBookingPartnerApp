import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.titleColor,
    marginTop: 5,
    borderColor: BaseColor.grayColor,
    borderWidth: 1,
  },
  inputGroup: {
    marginTop: 20,
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  contentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCalendar: {
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
  },
  contentActionCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  dateInfo: {
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: BaseColor.fieldColor,
    // height: 75,
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
});
