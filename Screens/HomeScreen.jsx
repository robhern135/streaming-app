import { StatusBar } from "expo-status-bar"
import {
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
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

import LoadingIndicator from "../Components/LoadingIndicator"
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const ios = Platform.OS == "ios"

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState()
  const [upcoming, setUpcoming] = useState()
  const [topRated, setTopRated] = useState()

  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    console.log("got trending movies")
    if (data && data.results) {
      setTrending(data.results)
      setLoading(false)
    }
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    console.log("got upcoming movies")
    if (data && data.results) {
      setUpcoming(data.results)
      setLoading(false)
    }
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    console.log("got top rated movies")
    if (data && data.results) {
      setTopRated(data.results)
      setLoading(false)
    }
  }

  const openMenu = () => {
    navigation.navigate("InfoScreen")
  }
  if (loading) {
    return <LoadingIndicator />
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar style="light" />
          <View style={styles.header}>
            <TouchableOpacity onPress={openMenu}>
              <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
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
          {trending && (
            <TrendingMovies data={trending} navigation={navigation} />
          )}
          {/* Upcoming movies in list */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Top Rated movies in list */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      </View>
    )
  }
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
