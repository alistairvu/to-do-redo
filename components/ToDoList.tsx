import React from "react"
import { useRecoilValue } from "recoil"
import { ScrollView } from "react-native"
import { ToDoComponent } from "./ToDoComponent"
import { toDoState } from "../recoil/atoms"

export const ToDoList = () => {
  const toDos = useRecoilValue(toDoState)

  return (
    <ScrollView>
      {toDos.map((item) => (
        <ToDoComponent {...item} key={item.id} />
      ))}
    </ScrollView>
  )
}
