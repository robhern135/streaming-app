import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Touchable,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import VoteBar from "./VoteBar"

import axios from "axios"

import { API_KEY, AUTHORIZATION } from "@env"

const windowWidth = Dimensions.get("window").width

const PopularCard = ({ data, navigation }) => {
  const { title, id, poster_path, vote_average, vote_count } = data
  const posterPath = "https://image.tmdb.org/t/p/w500"

  const [filmData, setFilmData] = useState()
  const [images, setImages] = useState()

  return (
    <TouchableOpacity onPress={() => console.log(title)} style={styles.card}>
      <Image
        source={{ uri: `${posterPath}${poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>
        {title} - {id}
      </Text>
      <VoteBar vote_average={vote_average} vote_count={vote_count} />
    </TouchableOpacity>
  )
}

export default PopularCard

const styles = StyleSheet.create({
  card: {
    gap: 10,
    width: (windowWidth / 8) * 5,
    paddingBottom: 20,
  },
  image: {
    aspectRatio: 1 / 1.5,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
})
