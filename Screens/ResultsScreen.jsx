import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import ResultRow from "../Components/ResultRow"
import axios from "axios"
import { API_KEY, AUTHORIZATION } from "@env"

const ResultsScreen = ({ navigation, route }) => {
  const { text } = route.params
  const [films, setFilms] = useState()

  const options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/search/title",
    params: {
      title: text,
      country: "gb",
      show_type: "all",
      output_language: "en",
    },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  }

  const searchByTitle = async () => {
    try {
      await axios(options).then((res) => {
        console.log(res.data)
        setFilms(res.data.result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    searchByTitle()
  }, [])

  if (!films) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    )
  }

  return (
    <ScrollView style={styles.resultsList}>
      {films &&
        films?.map((f) => (
          <ResultRow navigation={navigation} key={f.tmdbId} data={f} />
        ))}
      <View style={{ height: 100 }}></View>
    </ScrollView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({})
