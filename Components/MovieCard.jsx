import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import React from "react"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const MovieCard = ({ item, navigation }) => {
  const onPress = () => {
    navigation.navigate("MovieScreen", { item: item })
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{ uri: "https://via.placeholder.com/500/800" }}
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
