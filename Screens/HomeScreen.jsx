import { StatusBar } from "expo-status-bar"
import {
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from "react-native"
import { useEffect, useLayoutEffect, useState } from "react"
import { themeStyles } from "../themeStyles"

import axios from "axios"

import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline"

import { API_KEY, AUTHORIZATION } from "@env"
import TrendingMovies from "../Components/TrendingMovies"
import MovieList from "../Components/MovieList"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ios = Platform.OS == "ios"

const HomeScreen = ({ navigation }) => {
  // const [text, setText] = useState()
  // const [popular, setPopular] = useState()

  const [trending, setTrending] = useState([1, 2, 3])
  const [upcoming, setUpcoming] = useState([1, 2, 3])
  const [topRated, setTopRated] = useState([1, 2, 3])

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text style={styles.title}>
            <Text style={{ color: themeStyles.yellow }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.push("SearchScreen")}>
            <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies in carousel */}
        <TrendingMovies data={trending} navigation={navigation} />
        {/* Upcoming movies in list */}
        <MovieList title="Upcoming" data={upcoming} />
        {/* Top Rated movies in list */}
        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,

    marginVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
})
