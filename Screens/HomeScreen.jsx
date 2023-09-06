import { StatusBar } from "expo-status-bar"
import {
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native"
import { useEffect, useLayoutEffect, useState } from "react"

import axios from "axios"
import ResultRow from "../Components/ResultRow"

import { API_KEY, AUTHORIZATION } from "@env"
import PopularCard from "../Components/PopularCard"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState()
  const [popular, setPopular] = useState()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const searchByTitle = () => {
    navigation.navigate("Results", { text: text })
  }

  const getPopular = () => {
    const popularOptions = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization: AUTHORIZATION,
      },
    }
    axios(popularOptions).then((res) => {
      setPopular(res.data.results)
    })
  }

  useEffect(() => {
    getPopular()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "100%", height: "100%" }}>
        {popular && (
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>Currently in Cinemas!</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  { gap: 20, flexDirection: "row" },
                  styles.popularScroll,
                ]}
              >
                {popular?.map((p, idx) => {
                  const { title } = p
                  if (idx <= 10) {
                    return (
                      <PopularCard
                        navigation={navigation}
                        data={p}
                        key={p.id}
                      />
                    )
                  }
                })}
              </View>
            </ScrollView>
          </View>
        )}

        <View style={styles.searchContainer}>
          <Text style={[styles.popularText, { marginBottom: 5 }]}>
            Staying in instead?
          </Text>
          <Text
            style={{
              textAlign: "left",
              marginBottom: 10,
              width: "100%",
              paddingLeft: 20,
            }}
          >
            Find something to watch by searching below
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => setText(input)}
            value={text}
            placeholder={"Search for something to stream..."}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={searchByTitle}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: windowHeight,
  },
  popularScroll: {
    paddingHorizontal: 20,
  },

  popularText: {
    textAlign: "left",
    width: "100%",
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 23,
    marginTop: 30,
    marginBottom: 20,
  },
  resultsList: { width: "100%" },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  searchBtn: {
    marginHorizontal: 20,
    backgroundColor: "#1d1d1d",
    borderRadius: 10,
    paddingVertical: 15,
    width: windowWidth - 40,
    marginBottom: 10,
  },
  searchText: { color: "white", textAlign: "center" },
})
