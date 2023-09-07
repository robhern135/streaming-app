import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { TouchableOpacity } from "react-native"

import { themeStyles } from "../themeStyles"
import { useNavigation } from "@react-navigation/native"

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
            return (
              <TouchableOpacity
                onPress={() => onPress(person)}
                key={idx}
                style={styles.castButton}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/150x150" }}
                  style={styles.headshot}
                />
                <Text style={[styles.name, { fontWeight: "bold" }]}>
                  Cast name
                </Text>
                <Text style={styles.name}>
                  {characterName.length > 10
                    ? `${characterName.slice(0, 10)}...`
                    : characterName}
                </Text>
              </TouchableOpacity>
            )
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
  castButton: {
    alignItems: "center",
  },
  name: {
    color: themeStyles.grey,
    fontSize: 16,
    marginBottom: 5,
  },
  headshot: {
    height: 100,
    width: 100,
    borderRadius: "50",
    aspectRatio: 1 / 1,
    objectFit: "cover",
    marginBottom: 10,
  },
})
