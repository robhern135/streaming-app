import { StyleSheet, Text, View, Animated } from "react-native"
import React, { useEffect, useRef, useState } from "react"

import * as Animatable from "react-native-animatable"

const VoteBar = ({ vote_count, vote_average }) => {
  const loaderValue = useRef(new Animated.Value(0)).current
  const countInterval = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    countInterval.current = setInterval(() => setCount((old) => old + 5), 1000)
    return () => {
      clearInterval(countInterval) //when user exits, clear this interval.
    }
  }, [])

  return (
    <View style={styles.popularity}>
      <View style={[styles.voteBG]}>
        <Animatable.View
          animation="fadeInLeft"
          style={[
            styles.voteBar,
            {
              width: `${vote_average * 10}%`,
            },
          ]}
        >
          <Text style={styles.percentText}>{vote_average * 10}%</Text>
        </Animatable.View>
      </View>
      <Text style={styles.votecount}>{vote_count}</Text>
    </View>
  )
}

export default VoteBar

const styles = StyleSheet.create({
  popularity: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  votecount: {
    textAlign: "right",
  },
  voteBG: {
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    backgroundColor: "#efefef",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  voteBar: {
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    borderRadius: 20,
  },
  percentText: {
    color: "white",
    paddingLeft: 10,
    paddingVertical: 5,
  },
})
