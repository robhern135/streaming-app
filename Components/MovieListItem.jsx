import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const imagePath = "https://image.tmdb.org/t/p/w185"

const MovieListItem = ({ item }) => {
  let navigation = useNavigation()
  const { title, poster_path } = item

  const onPress = () => {
    navigation.push("MovieScreen", { item: item })
  }

  if (item) {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Image
          source={{
            uri: poster_path
              ? `${imagePath}${poster_path}`
              : Image.resolveAssetSource(require("../assets/poster.png")).uri,
          }}
          style={styles.poster}
        />
        <Text style={styles.movieName}>
          {title && title.length > 14 ? `${title.slice(0, 14)}...` : title}
        </Text>
      </TouchableOpacity>
    )
  } else {
    null
  }
}

export default MovieListItem

const styles = StyleSheet.create({
  movieName: { color: "white", marginTop: 10 },
  poster: {
    width: windowWidth * 0.33,
    height: windowHeight * 0.22,
    borderRadius: 15,
  },
})
