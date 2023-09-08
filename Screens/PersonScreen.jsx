import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import MovieList from "../Components/MovieList"
import LoadingIndicator from "../Components/LoadingIndicator"
import { fetchPersonDetails, fetchPersonMovies } from "../api/moviedb"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const ios = Platform.OS == "ios"

const PersonScreen = ({ route }) => {
  const { person } = route.params
  const { id } = person
  let navigation = useNavigation()
  const [personDetails, setPersonDetails] = useState()
  const [personMovies, setPersonMovies] = useState()
  const [loading, setLoading] = useState(true)

  const imagePath = "https://image.tmdb.org/t/p/w500"
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  useEffect(() => {
    getPersonDetails(id)
    getPersonMovies(id)
    setLoading(false)
  }, [])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    setPersonDetails(data)
    console.log(data)
  }
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    setPersonMovies(data.cast)
  }

  if (loading) {
    return <LoadingIndicator />
  } else {
    if (personDetails) {
      const {
        biography,
        birthday,
        name,
        profile_path,
        known_for_department,
        deathday,
        place_of_birth,
        popularity,
      } = personDetails
      return (
        <>
          <TopBar />
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20, gap: 40 }}
          >
            {/* person details */}
            <View style={styles.details}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: profile_path
                      ? `${imagePath}${profile_path}`
                      : require("../assets/poster.png"),
                  }}
                  style={styles.headshot}
                />
              </View>
              <View style={styles.name}>
                <Text style={styles.titleText}>{name}</Text>
                <Text style={styles.infoText}>
                  {place_of_birth ? place_of_birth : ""}
                </Text>
              </View>
              <View style={styles.stats}>
                <View style={styles.statsItem}>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Birth
                  </Text>
                  <Text style={styles.label}>{birthday}</Text>
                </View>
                {deathday && (
                  <View style={styles.statsItem}>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Death
                    </Text>
                    <Text style={styles.label}>{deathday}</Text>
                  </View>
                )}
                <View style={styles.statsItem}>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Known for
                  </Text>
                  <Text style={styles.label}>{known_for_department}</Text>
                </View>
                <View style={[styles.statsItem, { borderRightWidth: 0 }]}>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Popularity
                  </Text>
                  <Text style={styles.label}>{popularity}</Text>
                </View>
              </View>
            </View>
            <View style={styles.biography}>
              <Text style={styles.bioTitle}>Biography</Text>
              <Text style={styles.bioText}>{biography}</Text>
            </View>
            <MovieList data={personMovies} hideSeeAll title={"Features In"} />
          </ScrollView>
        </>
      )
    } else {
      return <LoadingIndicator />
    }
  }
}

export default PersonScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
  },
  details: {
    paddingTop: 80,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: themeStyles.grey,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
  },
  headshot: {
    width: windowWidth * 0.72,
    aspectRatio: 1 / 1,
    borderRadius: windowWidth * 0.72,
  },
  name: { paddingTop: 20 },
  titleText: {
    paddingHorizontal: 20,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    color: themeStyles.grey,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 16,
  },
  stats: {
    marginHorizontal: 20,
    marginVertical: 30,
    flexDirection: "row",
    backgroundColor: themeStyles.darkgrey,
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  statsItem: {
    // borderRightWidth: 2,
    // borderRightColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    alignItems: "center",
  },
  biography: {
    paddingHorizontal: 20,
  },
  bioTitle: { marginBottom: 10, fontSize: 20, color: "white" },
  bioText: {
    color: themeStyles.grey,
    fontSize: 16,
  },
})
