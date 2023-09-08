import {
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useLayoutEffect } from "react"
import { themeStyles } from "../themeStyles"
import TopBar from "../Components/TopBar"
import { useNavigation } from "@react-navigation/native"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const InfoScreen = () => {
  let navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <>
      <TopBar />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>About</Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.info}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              This app was made with love by Rob Hern.
            </Text>
            <Text style={styles.text}>Movie Data courtsey of</Text>
            <Image
              source={require("../assets/tmdb-logo.png")}
              style={{
                width: windowWidth * 0.4,
                height: windowWidth * 0.29,
                objectFit: "contain",
                marginBottom: 10,
              }}
            />
            <Text style={styles.text}>
              Streaming Data courtsey of Streaming Availability API on{" "}
            </Text>
            <Image
              source={require("../assets/rapidapi-logo.png")}
              style={{
                width: windowWidth * 0.6,
                height: windowWidth * 0.129,
                objectFit: "contain",
                marginBottom: 10,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.black,
    paddingHorizontal: 20,
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    maxWidth: windowWidth * 0.8,
    textAlign: "center",
    fontSize: 16,
    color: themeStyles.grey,
  },
  info: { alignItems: "center", paddingTop: 40, gap: 20 },
})
