import React, { useState, useEffect } from "react"
import {
  ImageBackground,
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
import { getData } from "../asyncStorage"
import { ToDoInput, ToDoList } from "../components"
import { toDoState } from "../recoil/atoms"

export const Main = () => {
  const [dateDisplay, setDateDisplay] = useState<string>("")
  const setToDos = useSetRecoilState(toDoState)
  const [loaded, setLoaded] = useState<boolean>(false)

  const getToDos = async () => {
    try {
      const data = await getData()
      if (!data) {
        setToDos([])
      } else {
        setToDos(data)
      }
      setLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const date = new Date()
    setDateDisplay(
      date.toLocaleString("en-AU", {
        day: "2-digit",
        month: "long",
      })
    )
  }, [])

  useEffect(() => {
    getToDos()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.appContainer}>
        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.headerText}>{dateDisplay}</Text>
          {loaded && (
            <View style={styles.toDoContainer}>
              <ToDoList />
            </View>
          )}
          <ToDoInput />
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  headerText: {
    fontSize: 35,
    fontWeight: "600",
    paddingTop: 40,
    color: "white",
  },
  toDoContainer: {
    flex: 1,
    backgroundColor: "rgba(15, 15, 15, 0.925)",
    padding: 5,
    marginVertical: 10,
  },
})
