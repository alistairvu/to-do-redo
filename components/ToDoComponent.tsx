import React from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { useSetRecoilState } from "recoil"
import { toDoState } from "../recoil/atoms"
import { Ionicons } from "@expo/vector-icons"
import { storeData } from "../asyncStorage"

export const ToDoComponent = ({ id, content, done }: ToDo) => {
  const setDone = useSetRecoilState(toDoState)

  const handleCheck = () => {
    setDone((prev) => {
      const newData = prev.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done }
        }
        return item
      })
      storeData(newData)
      return newData
    })
  }

  return (
    <TouchableOpacity onPress={handleCheck} style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {done && <Ionicons name="checkmark-sharp" size={24} color="white" />}
      </View>
      <View style={{ flex: 7 }}>
        <Text numberOfLines={1} style={styles.text}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#7D7C7D",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
})
