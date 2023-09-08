import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeStyles } from "../themeStyles"

const MovieStats = ({ status, release_date, runtime }) => {
  return (
    <View style={styles.container}>
      {status && <Text style={styles.detailsText}>{status} • </Text>}
      {release_date && (
        <Text style={styles.detailsText}>{release_date?.split("-")[0]} • </Text>
      )}
      {runtime && <Text style={styles.detailsText}>{runtime} min</Text>}
    </View>
  )
}

export default MovieStats

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  detailsText: {
    color: themeStyles.grey,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
})
