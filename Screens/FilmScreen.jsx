import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useLayoutEffect } from "react"

const FilmScreen = ({ route, navigation }) => {
  const { data, images } = route.params

  const { title, year, type, genres, directors, streamingInfo, tmdbId } = data
  const streaming = streamingInfo.gb

  useLayoutEffect(() => {
    let theTitle = undefined
    if (title && year) {
      theTitle = `${title} (${year})`
    } else if (title) {
      theTitle = `${title}`
    }

    navigation.setOptions({ title: data ? theTitle : "Loading..." })
  }, [navigation])

  const posterPath = "https://image.tmdb.org/t/p/w500/"

  return (
    <View>
      <ScrollView>
        {/* <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          source={{
            uri: images.backdrops
              ? `${posterPath}${images.backdrops[0].file_path}`
              : null,
          }}
        ></ImageBackground> */}
        <View style={styles.header}>
          <View style={[styles.inner, { flexDirection: "row" }]}>
            <Image
              source={{
                uri: images.backdrops
                  ? `${posterPath}${images.backdrops[0].file_path}`
                  : null,
              }}
              style={{ aspectRatio: 1 / 1.706 }}
            />
            <View>
              <Text>{title}</Text>
              <View style={styles.directors}>
                {directors?.map((d) => (
                  <Text key={d}>{d}</Text>
                ))}
              </View>
              <View style={styles.info}>
                <Text>{year}</Text>
                <Text>{type}</Text>
              </View>
              <View style={styles.genres}>
                {genres?.map((genre) => {
                  const { id, name } = genre
                  return <Text key={id}>{name}</Text>
                })}
              </View>
              <Text>tmdbId: {tmdbId ? tmdbId : ""}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FilmScreen

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    minHeight: 80,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
  },
})
