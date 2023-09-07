import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import MovieList from "../Components/MovieList"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const ios = Platform.OS == "ios"

const PersonScreen = () => {
  let navigation = useNavigation()
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5, 6, 7])

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])
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
              source={{ uri: "https://via.placeholder.com/200x200" }}
              style={styles.headshot}
            />
          </View>
          <View style={styles.name}>
            <Text style={styles.titleText}>Person Name</Text>
            <Text style={styles.infoText}>Person Location</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.statsItem}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>Gender</Text>
              <Text style={styles.label}>Male</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>
                Birthday
              </Text>
              <Text style={styles.label}>11/10</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>
                Known for
              </Text>
              <Text style={styles.label}>Acting</Text>
            </View>
            <View style={[styles.statsItem, { borderRightWidth: 0 }]}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>
                Popularity
              </Text>
              <Text style={styles.label}>8.45</Text>
            </View>
          </View>
        </View>
        <View style={styles.biography}>
          <Text style={styles.bioTitle}>Biography</Text>
          <Text style={styles.bioText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
            error optio voluptas animi sapiente asperiores laboriosam. Corporis
            corrupti necessitatibus quae repellat, dolorum eum voluptate natus
            totam? Placeat inventore vero aspernatur eius deserunt minus
            distinctio molestias?
          </Text>
        </View>
        <MovieList data={personMovies} hideSeeAll title={"Features In"} />
      </ScrollView>
    </>
  )
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: themeStyles.darkgrey,
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 0,
  },
  statsItem: {
    borderRightWidth: 2,
    borderRightColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: { textAlign: "center", fontSize: 16, color: "white" },
  biography: {
    paddingHorizontal: 20,
  },
  bioTitle: { marginBottom: 10, fontSize: 20, color: "white" },
  bioText: {
    color: themeStyles.grey,
    fontSize: 16,
  },
})
