import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useLayoutEffect } from "react"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import { useNavigation } from "@react-navigation/native"
import { XMarkIcon } from "react-native-heroicons/outline"

const SearchScreen = () => {
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Search for a movie"
            placeholderTextColor={themeStyles.grey}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.buttonText}>
              <XMarkIcon size="25" color="white" style={{ marginLeft: 20 }} />
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
  },
  searchContainer: {
    paddingTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
    flex: 1,
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
  },
})
