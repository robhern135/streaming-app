import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import MovieResult from "../Components/MovieResult"

const MovieListScreen = ({ route }) => {
  const { data, title } = route.params
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title} Movies</Text>}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.resultsContainer}>
            {data?.map((item, idx) => {
              return <MovieResult item={item} key={idx} index={idx} />
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default MovieListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
    paddingHorizontal: 20,
    width: "100%",
  },
  titleContainer: {
    paddingBottom: 15,
    width: "100%",
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  resultsContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
})
