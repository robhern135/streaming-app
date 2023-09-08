import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import React, { useEffect } from "react"

import { ParallaxImage } from "react-native-snap-carousel"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const imagePath = "https://image.tmdb.org/t/p/w500"

const MovieCard = ({ item, navigation }) => {
  const { poster_path } = item

  const onPress = () => {
    navigation.navigate("MovieScreen", { item })
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{
          uri: poster_path
            ? `${imagePath}${poster_path}`
            : Image.resolveAssetSource(require("../assets/poster.png")).uri,
        }}
        style={styles.poster}
      />
    </TouchableWithoutFeedback>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  poster: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
    borderRadius: 30,
  },
})
