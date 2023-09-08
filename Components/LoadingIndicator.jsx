import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React from "react"

import { themeStyles } from "../themeStyles"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={themeStyles.yellow} />
    </View>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeStyles.black,
  },
})
