import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"

import { AUTHORIZATION } from "@env"

const ResultRow = ({ data, navigation }) => {
  const { title, year, type, tmdbId } = data
  const [images, setImages] = useState()

  const limitString = (str, num) => {
    const { length: len } = str
    if (num < len) {
      return str.slice(0, num) + "..."
    } else {
      return str
    }
  }

  const handlePress = () => {
    navigation.navigate("SingleFilm", { data: data, images: images })
  }

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${tmdbId}/images`,
    headers: {
      accept: "application/json",
      Authorization: AUTHORIZATION,
    },
  }

  const getTMDBImages = () => {
    if (tmdbId) {
      try {
        axios(options).then((res) => {
          setImages(res.data)
          console.log(res.data)
        })
      } catch (err) {
        console.log(`err at images: ${err}`)
      }
    } else {
      console.log(`no tmdbId for ${title}`)
    }
  }

  useEffect(() => {
    if (tmdbId) {
      getTMDBImages()
    }
  }, [])

  const posterPath = "https://image.tmdb.org/t/p/w500"

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingVertical: 10,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        flexDirection: "row",
      }}
      onPress={handlePress}
    >
      {images?.posters[0] && (
        <View>
          <Image
            source={{ uri: `${posterPath}${images.posters[0].file_path}` }}
            style={{ aspectRatio: 1 / 1.667, width: 100, marginLeft: 10 }}
          />
        </View>
      )}

      <View style={{ paddingLeft: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {limitString(title, 35)}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {year && <Text>{year}, </Text>}
          {type && <Text>{type}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ResultRow

const styles = StyleSheet.create({
  imageContainer: { width: 100, height: 100 },
})
