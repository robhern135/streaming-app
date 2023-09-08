import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native"
import React, { useEffect } from "react"

import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"
import MovieListItem from "./MovieListItem"

const MovieList = ({ title, data, hideSeeAll }) => {
  let navigation = useNavigation()

  // const onPress = (item) => {
  //   navigation.push("MovieScreen", { item })
  // }

  const onSeeAll = () => {
    navigation.push("MovieListScreen", { data, title })
  }

  if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {!hideSeeAll && (
            <TouchableOpacity onPress={onSeeAll}>
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
            return <MovieListItem item={item} key={idx} />
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
})
