import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { themeStyles } from "../themeStyles"
import StreamRow from "./StreamRow"
import { LinearGradient } from "expo-linear-gradient"

const Streaming = ({ data }) => {
  if (data) {
    return (
      <View style={styles.container}>
        <Text
          style={[styles.title, { marginBottom: data.length > 0 ? 20 : 5 }]}
        >
          Streaming {data.gb && `(${data.gb.length})`}
        </Text>
        {data?.gb ? (
          <>
            <ScrollView
              style={[styles.streamContainer]}
              contentContainerStyle={{
                paddingBottom: data?.gb.length > 3 ? 100 : 0,
              }}
            >
              {data?.gb?.map((stream, idx) => {
                // if (stream.quality == "uhd" || stream.quality == "hd") {
                return <StreamRow data={stream} key={idx} index={idx} />
                // }
              })}
            </ScrollView>
            {data?.gb.length > 3 ? (
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(29,29,29,0.8)",
                  "rgba(29,29,29,1)",
                ]}
                style={styles.linearGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.notStreaming}>
              Not currently streaming, go see it in cinemas or purchase on home
              video!
            </Text>
          </>
        )}
      </View>
    )
  } else {
    null
  }
}

export default Streaming

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 25,
    color: "white",
  },
  notStreaming: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: themeStyles.grey,
  },
  streamContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    maxHeight: 300,
  },
  linearGradient: {
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: 0,
  },
})
