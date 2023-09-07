import {
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import { useNavigation } from "@react-navigation/native"
import { XMarkIcon } from "react-native-heroicons/outline"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const SearchScreen = () => {
  let navigation = useNavigation()

  const [results, setResults] = useState([])

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
        {results && results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {results && (
              <Text style={styles.searchText}>Results ({results.length})</Text>
            )}
            <View style={styles.resultsContainer}>
              {results?.map((item, idx) => {
                let movieName = "Ant Man and the Wasp: Quantum"
                return (
                  <TouchableWithoutFeedback
                    key={idx}
                    onPress={() => navigation.push("MovieScreen", item)}
                  >
                    <View style={styles.button}>
                      <Image
                        source={{ uri: "https://via.placeholder.com/300x400" }}
                        style={styles.poster}
                      />
                      <Text style={styles.title}>
                        {movieName.length > 17
                          ? `${movieName.slice(0, 17)}...`
                          : movieName}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <Image
              source={require("../assets/movieTime.png")}
              style={{ width: windowWidth * 0.9, height: windowWidth * 0.6 }}
            />
          </View>
        )}
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
  searchText: { marginVertical: 10, color: "white", fontWeight: "bold" },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-betwwen",
    flexWrap: "wrap",
    gap: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  poster: {
    borderRadius: 10,
    width: windowWidth * 0.43,
    height: windowHeight * 0.3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeStyles.grey,
  },
})
