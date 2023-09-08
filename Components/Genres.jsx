import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeStyles } from "../themeStyles"

const Genres = ({ genres }) => {
  let length = genres.length
  return (
    <View style={styles.genres}>
      {genres.map((genre, idx) => {
        const { name, id } = genre
        return (
          <Text key={id} style={styles.genreText}>
            {idx >= length - 1 ? name : ` ${name} • `}
          </Text>
        )
      })}
    </View>
  )
}

export default Genres

const styles = StyleSheet.create({
  genres: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  genreText: {
    color: themeStyles.grey,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
})
