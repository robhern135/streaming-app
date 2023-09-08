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

import axios from "axios"

import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/moviedb"
import MovieStats from "../Components/MovieStats"
import Genres from "../Components/Genres"

import { API_KEY } from "@env"
import Streaming from "../Components/Streaming"

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
  const [streaming, setStreaming] = useState()

  useEffect(() => {
    console.log(`itemid: ${id}`)
    setLoading(true)
    if (id) {
      getMovieDetails(id)
      getMovieCredits(id)
      getSimilarMovies(id)
      fetchStreaming(id)
    }
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    setMovie(data)
    setLoading(false)
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

  const fetchStreaming = (id) => {
    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/get",
      params: {
        output_language: "en",
        tmdb_id: `movie/${id}`,
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    }
    try {
      axios(options).then((res) => {
        // console.log(res.data.result.streamingInfo)
        setStreaming(res.data.result.streamingInfo)
      })
    } catch (err) {
      console.log(`error getting streaing: ${err}`)
    }
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
                    : Image.resolveAssetSource(require("../assets/poster.png"))
                        .uri,
                }}
                style={styles.image}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(29,29,29,0.8)",
                  "rgba(29,29,29,1)",
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
            <Streaming data={streaming} />
            <Cast cast={cast} />

            {similar && similar.length > 0 ? (
              <MovieList title="Similar Movies" data={similar} hideSeeAll />
            ) : null}
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
