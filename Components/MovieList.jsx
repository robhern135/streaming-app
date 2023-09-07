import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native"
import React from "react"

import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const MovieList = ({ title, data, hideSeeAll }) => {
  let navigation = useNavigation()

  const onPress = (item) => {
    navigation.push("MovieScreen", { item })
  }

  if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {!hideSeeAll && (
            <TouchableOpacity>
              <Text style={styles.buttonText}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Movie Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
        >
          {data?.map((item, idx) => {
            let movieName = "Antman and the Wasp: Quantum"

            return (
              <TouchableOpacity onPress={() => onPress(item)} key={idx}>
                <Image
                  source={{ uri: "https://via.placeholder.com/500/800" }}
                  style={styles.poster}
                />
                <Text style={styles.movieName}>
                  {movieName.length > 14
                    ? `${movieName.slice(0, 14)}...`
                    : movieName}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  } else {
    return null
  }
}

export default MovieList

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    gap: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 25,
  },
  buttonText: {
    fontSize: 18,
    color: themeStyles.yellow,
  },
  movieName: { color: "white", marginTop: 10 },
  poster: {
    width: windowWidth * 0.33,
    height: windowHeight * 0.22,
    borderRadius: 15,
  },
})
