import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../Components/Cast"
import TopBar from "../Components/TopBar"
import MovieList from "../Components/MovieList"
import LoadingIndicator from "../Components/LoadingIndicator"
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/moviedb"
import MovieStats from "../Components/MovieStats"
import Genres from "../Components/Genres"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const imagePath = "https://image.tmdb.org/t/p/original"

const MovieScreen = ({ route }) => {
  let navigation = useNavigation()
  const { item } = route.params
  const { id, backdrop_path, title } = item

  const [cast, setCast] = useState()
  const [similar, setSimilar] = useState()
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState()

  useEffect(() => {
    console.log(`itemid: ${id}`)
    setLoading(true)
    getMovieDetails(id)
    getMovieCredits(id)
    getSimilarMovies(id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    setMovie(data)
    setLoading(false)
    // console.log(data)
  }
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    setCast(data.cast)
  }
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    setSimilar(data.results)
    // console.log(data)
  }

  useEffect(() => {
    console.log(id)
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  if (loading) {
    return <LoadingIndicator />
  } else {
    if (movie) {
      const { status, release_date, runtime, genres, overview } = movie
      return (
        <>
          <TopBar />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={styles.container}
          >
            {/* back button and poster */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: backdrop_path
                    ? `${imagePath}${backdrop_path}`
                    : require("../assets/poster.png"),
                }}
                style={styles.image}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={styles.linearGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
            {/* movie details */}
            <View style={styles.movieDetails}>
              {title && <Text style={styles.titleText}>{title}</Text>}
              <MovieStats
                status={status}
                release_date={release_date}
                runtime={runtime}
              />
            </View>
            <Genres genres={genres} />
            {overview && (
              <View style={styles.description}>
                <Text style={styles.descText}>{overview}</Text>
              </View>
            )}
            <Cast cast={cast} />

            {similar && (
              <MovieList title="Similar Movies" data={similar} hideSeeAll />
            )}
          </ScrollView>
        </>
      )
    } else {
      return <LoadingIndicator />
    }
  }
}

export default MovieScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
  },

  image: {
    width: windowWidth,
    height: windowHeight * 0.55,
  },
  linearGradient: {
    width: windowWidth,
    height: windowHeight * 0.4,
    position: "absolute",
    bottom: 0,
  },
  movieDetails: {
    marginTop: -(windowHeight * 0.09),
  },
  titleText: {
    paddingHorizontal: 20,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsText: {
    color: themeStyles.grey,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  description: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  descText: {
    color: themeStyles.grey,
    fontSize: 16,
  },
})
