import React from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { RecoilRoot } from "recoil"
import { Main } from "./screens"

const App = () => {
  return (
    <RecoilRoot>
      <ImageBackground
        source={require("./assets/federico-bottos-eYKkriMEG50-unsplash.jpg")}
        style={styles.backgroundImage}
      >
        <Main />
      </ImageBackground>
    </RecoilRoot>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
})

export default App
