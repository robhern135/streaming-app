import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { themeStyles } from "../themeStyles"
import { useNavigation } from "@react-navigation/native"

const CastItem = ({ person, index }) => {
  const { profile_path, character, name } = person
  const imagePath = "https://image.tmdb.org/t/p/w185"
  let navigation = useNavigation()
  const onPress = (person) => {
    navigation.push("PersonScreen", { person })
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(person)}
      key={index}
      style={styles.castButton}
    >
      <Image
        source={{
          uri: profile_path
            ? `${imagePath}${profile_path}`
            : Image.resolveAssetSource(require("../assets/headshot.png")).uri,
        }}
        style={styles.headshot}
      />
      {name && (
        <Text style={[styles.name, { fontWeight: "bold" }]}>{name}</Text>
      )}

      {character && (
        <Text style={styles.name}>
          {character.length > 10 ? `${character.slice(0, 10)}...` : character}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default CastItem

const styles = StyleSheet.create({
  castButton: {
    alignItems: "center",
    maxWidth: 120,
  },
  name: {
    color: themeStyles.grey,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  headshot: {
    height: 100,
    width: 100,
    borderRadius: 100,
    aspectRatio: 1 / 1,
    objectFit: "cover",
    marginBottom: 10,
  },
})
