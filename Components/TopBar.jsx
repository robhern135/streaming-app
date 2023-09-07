import {
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { themeStyles } from "../themeStyles"
import { useNavigation } from "@react-navigation/native"

const ios = Platform.OS == "ios"

const TopBar = () => {
  let navigation = useNavigation()
  return (
    <View style={styles.topBar}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    zIndxex: 50,
    position: "absolute",
    zIndex: 50,
    top: 0,
  },
  safeArea: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    left: 0,
    right: 0,
    top: ios ? 0 : 20,
  },
  backButton: {
    marginLeft: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeStyles.yellow,
    padding: 5,
  },
})
