import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%"
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: 1,
    paddingVertical: 20
  },
  headerStyle: {
    borderBottomColor: BaseColor.secondBlackColor,
    borderBottomWidth: 1,
  },
  saleItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'column',
    marginLeft: 5, 
    marginRight: 15,
    marginTop: -3,
  }
});
