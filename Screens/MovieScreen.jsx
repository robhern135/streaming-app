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

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const MovieScreen = ({ route }) => {
  let navigation = useNavigation()
  const { item } = route.params

  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6])
  const [similar, setSimilar] = useState([1, 2, 3, 4, 5, 6])

  useEffect(() => {}, [item])

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

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
            source={{ uri: "https://via.placeholder.com/500x700" }}
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={styles.linearGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
        {/* movie details */}
        <View style={styles.movieDetails}>
          <Text style={styles.titleText}>This is the Name of the Movie</Text>
          <Text style={styles.detailsText}>Released • 2020 • 170 min</Text>
        </View>
        <View style={styles.genres}>
          <Text style={styles.genreText}>Horror • Action • Thriller</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
            deserunt perspiciatis enim nihil consectetur officiis, natus
            maiores! Minima nisi nulla ducimus voluptate. Voluptates, eius eum!
          </Text>
        </View>
        <Cast cast={cast} />

        <MovieList title="Similar Movies" data={similar} hideSeeAll />
      </ScrollView>
    </>
  )
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
  genres: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  genreText: {
    color: themeStyles.grey,
    textAlign: "center",
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
