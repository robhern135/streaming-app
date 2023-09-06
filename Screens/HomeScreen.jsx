import { StatusBar } from "expo-status-bar"
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useEffect, useState } from "react"

import axios from "axios"
import ResultRow from "../Components/ResultRow"

const HomeScreen = () => {
  const [films, setFilms] = useState()
  const [text, setText] = useState()

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
      "X-RapidAPI-Key": "09e98ec5demsh1f37c6d5d68f08ap1dd33fjsn95b58d6fd013",
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          onChangeText={(input) => setText(input)}
          value={text}
          placeholder={"Search for something to stream..."}
        />
        <Button title="search" onPress={searchByTitle} />
        <ScrollView style={styles.resultsList}>
          {films && films?.map((f) => <ResultRow data={f} />)}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  resultsList: { width: "100%" },
})
