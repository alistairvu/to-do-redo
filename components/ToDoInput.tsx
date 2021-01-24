import React, { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useRecoilState, useSetRecoilState } from "recoil"
import { toDoState, idTracker } from "../recoil/atoms"
import { Ionicons } from "@expo/vector-icons"
import { storeData } from "../asyncStorage"

export const ToDoInput = () => {
  const setToDos = useSetRecoilState(toDoState)
  const [id, setId] = useRecoilState(idTracker)
  const [content, setContent] = useState<string>("")

  const handleAdd = (e: any) => {
    e.preventDefault()
    if (content.trim().length > 0) {
      const newItem: ToDo = {
        id: id,
        content: content.trim(),
        done: false,
      }
      setId((prev) => prev + 1)
      setToDos((prev) => {
        storeData([...prev, newItem])
        return [...prev, newItem]
      })
      setContent("")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Ionicons name="ios-add-sharp" size={24} color="white" />
        </View>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          onSubmitEditing={handleAdd}
          style={styles.input}
          returnKeyType="done"
          placeholder="Add new To Do..."
          placeholderTextColor="#7D7C7D"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginBottom: 20,
    backgroundColor: "rgba(15, 15, 15, 0.925)",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "white",
    fontSize: 20,
    flex: 7,
  },
})
