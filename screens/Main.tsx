import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { useSetRecoilState } from "recoil"
import { getData, getId } from "../asyncStorage"
import { ToDoHeader, ToDoInput, ToDoList } from "../components"
import { idTracker, toDoState } from "../recoil/atoms"

export const Main = () => {
  const setToDos = useSetRecoilState(toDoState)
  const setId = useSetRecoilState(idTracker)
  const [loaded, setLoaded] = useState<boolean>(false)

  const getToDos = async () => {
    try {
      const data = await getData()
      if (!data) {
        setToDos([])
      } else {
        setToDos(data)
      }

      const id = await getId()
      if (!id) {
        setId(0)
      } else {
        setId(id)
      }

      setLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToDos()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.appContainer}>
        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ToDoHeader />
          <View style={styles.toDoContainer}>
            {loaded ? (
              <ToDoList />
            ) : (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            )}
          </View>
          <ToDoInput />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    padding: 5,
    marginHorizontal: 15,
    marginTop: 30,
  },
  toDoContainer: {
    flex: 1,
    backgroundColor: "rgba(15, 15, 15, 0.925)",
    padding: 5,
    marginVertical: 10,
  },
  loadingText: {
    color: "white",
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
