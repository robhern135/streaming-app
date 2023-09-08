import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { TouchableOpacity } from "react-native"

import { themeStyles } from "../themeStyles"
import { useNavigation } from "@react-navigation/native"
import CastItem from "./CastItem"

const Cast = ({ cast }) => {
  let characterName = "Character Name here"

  const onPress = (person) => {
    navigation.navigate("PersonScreen", { person })
  }

  let navigation = useNavigation()

  if (cast) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Top Cast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          {cast?.map((person, idx) => {
            return <CastItem person={person} key={idx} index={idx} />
          })}
        </ScrollView>
      </View>
    )
  } else {
    return null
  }
}

export default Cast

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 25,
    color: "white",
    marginBottom: 20,
  },
})
