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
import React, { useCallback, useLayoutEffect, useState } from "react"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import { useNavigation } from "@react-navigation/native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { debounce } from "lodash"
import { searchMovies } from "../api/moviedb"
import MovieResult from "../Components/MovieResult"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const SearchScreen = () => {
  let navigation = useNavigation()

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSearch = (value) => {
    if (value && value.length > 3) {
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false)
        console.log(data.results[0])
        setResults(data.results)
      })
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={handleTextDebounce}
            autoCorrect={false}
            placeholder="Search for a movie"
            placeholderTextColor={themeStyles.grey}
            style={styles.input}
          />
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
                return <MovieResult item={item} key={idx} index={idx} />
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
})
