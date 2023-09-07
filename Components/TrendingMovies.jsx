import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"
import Carousel from "react-native-snap-carousel"
import MovieCard from "./MovieCard"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const TrendingMovies = ({ data, navigation }) => {
  return (
    <View style={styles.carousel}>
      <Text style={styles.text}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard navigation={navigation} item={item} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  )
}

export default TrendingMovies

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 25,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
})
