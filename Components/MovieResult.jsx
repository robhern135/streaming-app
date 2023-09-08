import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
} from "react-native"
import React from "react"
import { themeStyles } from "../themeStyles"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const imagePath = "https://image.tmdb.org/t/p/w500"

const MovieResult = ({ item, index }) => {
  let navigation = useNavigation()
  if (item) {
    const { title, poster_path } = item
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.push("MovieScreen", { item })}
      >
        <View style={styles.button}>
          <Image
            source={{
              uri: poster_path
                ? `${imagePath}${poster_path}`
                : Image.resolveAssetSource(require("../assets/poster.png")).uri,
            }}
            style={styles.poster}
          />
          <Text style={styles.title}>
            {title && title.length > 17 ? `${title.slice(0, 17)}...` : title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    null
  }
}

export default MovieResult

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  poster: {
    borderRadius: 10,
    width: windowWidth * 0.43,
    height: windowHeight * 0.3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeStyles.grey,
  },
})
