import { StyleSheet, Text, View } from "react-native"
import React from "react"

const ResultRow = ({ data }) => {
  const { title, year, type } = data

  const limitString = (str, num) => {
    const { length: len } = str
    if (num < len) {
      return str.slice(0, num) + "..."
    } else {
      return str
    }
  }
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingVertical: 10,
        borderBottomColor: "white",
        borderBottomWidth: 1,
      }}
    >
      <View style={{ paddingLeft: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {limitString(title, 35)}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {year && <Text>{year}, </Text>}
          {type && <Text>{type}</Text>}
        </View>
      </View>
    </View>
  )
}

export default ResultRow

const styles = StyleSheet.create({})
