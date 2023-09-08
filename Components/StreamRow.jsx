import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { themeStyles } from "../themeStyles"

const StreamRow = ({ data }) => {
  const [logo, setLogo] = useState()

  useEffect(() => {
    console.log(data)
    if (data) {
      handleLogo(data.service)
    }
  }, [])

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1)
  }

  const handleLogo = (service) => {
    switch (service) {
      case "prime":
        setLogo(require("../assets/prime.png"))
        break
      case "apple":
        setLogo(require("../assets/apple.png"))
        break
      case "disney":
        setLogo(require("../assets/disney.png"))
        break
      case "netflix":
        setLogo(require("../assets/netflix.png"))
        break
      case "paramount":
        setLogo(require("../assets/paramount.png"))
        break
      case "all4":
        setLogo(require("../assets/all4.png"))
        break
      case "now":
        setLogo(require("../assets/now.png"))
        break
      case "britbox":
        setLogo(require("../assets/britbox.png"))
        break
      case "iplayer":
        setLogo(require("../assets/iplayer.png"))
        break
      default:
        setLogo(require("../assets/poster.png"))
    }
  }

  if (data) {
    const { service, streamingType, quality, link } = data

    let type = streamingType == "subscription" ? "subsc" : streamingType

    return (
      <View style={styles.container}>
        {logo && <Image source={logo} style={styles.logo} />}
        <Text style={[styles.title, { width: 100 }]}>
          {capitalize(service)}
        </Text>
        <Text style={[styles.text, { width: 60 }]}>
          {type ? capitalize(type) : ""}
        </Text>
        <Text style={[styles.text, { width: 40 }]}>
          {quality ? quality.toUpperCase() : "HD"}
        </Text>
        <View style={{ width: 60 }}>
          {link && (
            <TouchableOpacity style={styles.button}>
              <Text style={[styles.title, { color: themeStyles.black }]}>
                View
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  } else {
    return null
  }
}

export default StreamRow

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: themeStyles.grey,
    padding: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: { color: "white", fontSize: 18, fontWeight: "bold" },
  text: { color: "white", fontSize: 18 },
  button: {
    backgroundColor: themeStyles.yellow,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 5,
  },
})
